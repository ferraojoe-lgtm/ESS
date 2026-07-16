import { Request, Response, NextFunction } from "express";

interface ClientState {
  timestamps: number[];
  consecutiveViolations: number;
  lastViolationTime: number;
  lastRequestTime: number;
}

class FlexibleRateLimiter {
  private store = new Map<string, ClientState>();
  private windowMs: () => number;
  private max: () => number;
  private backoffFactor: () => number;

  constructor(config: {
    getWindowMs: () => number;
    getMax: () => number;
    getBackoffFactor?: () => number;
  }) {
    this.windowMs = config.getWindowMs;
    this.max = config.getMax;
    this.backoffFactor = config.getBackoffFactor || (() => 1);
  }

  public check(key: string): { allowed: boolean; retryAfterSecs: number } {
    const now = Date.now();
    let state = this.store.get(key);

    const currentWindowMs = this.windowMs();
    const currentMax = this.max();
    const currentBackoff = this.backoffFactor();

    if (!state) {
      state = {
        timestamps: [],
        consecutiveViolations: 0,
        lastViolationTime: 0,
        lastRequestTime: now
      };
      this.store.set(key, state);
    }

    // Reset violations if inactive for more than 2 * windowMs
    if (now - state.lastRequestTime > currentWindowMs * 2) {
      state.consecutiveViolations = 0;
    }
    state.lastRequestTime = now;

    // Prune old timestamps
    state.timestamps = state.timestamps.filter(t => now - t < currentWindowMs);

    // Check if currently locked out
    if (state.lastViolationTime > 0) {
      // Cooldown grows exponentially with consecutive violations: currentWindowMs * (backoff ^ (consecutiveViolations - 1))
      const currentLockoutMs = currentWindowMs * Math.pow(currentBackoff, state.consecutiveViolations - 1);
      const timeElapsed = now - state.lastViolationTime;
      if (timeElapsed < currentLockoutMs) {
        const retryAfterSecs = Math.ceil((currentLockoutMs - timeElapsed) / 1000);
        return { allowed: false, retryAfterSecs };
      }
    }

    // Check if exceeding capacity
    if (state.timestamps.length >= currentMax) {
      state.consecutiveViolations += 1;
      state.lastViolationTime = now;
      const currentLockoutMs = currentWindowMs * Math.pow(currentBackoff, state.consecutiveViolations - 1);
      const retryAfterSecs = Math.ceil(currentLockoutMs / 1000);
      return { allowed: false, retryAfterSecs };
    }

    // Allowed! Record timestamp
    state.timestamps.push(now);
    return { allowed: true, retryAfterSecs: 0 };
  }
}

// Instantiate dynamic limiters retrieving config from process.env at run-time
const authIpLimiter = new FlexibleRateLimiter({
  getWindowMs: () => Number(process.env.RATE_LIMIT_AUTH_IP_WINDOW_MS) || 60000,
  getMax: () => Number(process.env.RATE_LIMIT_AUTH_IP_MAX) || 5,
  getBackoffFactor: () => Number(process.env.RATE_LIMIT_AUTH_BACKOFF_FACTOR) || 2
});

const authAccountLimiter = new FlexibleRateLimiter({
  getWindowMs: () => Number(process.env.RATE_LIMIT_AUTH_ACCOUNT_WINDOW_MS) || 60000,
  getMax: () => Number(process.env.RATE_LIMIT_AUTH_ACCOUNT_MAX) || 3,
  getBackoffFactor: () => Number(process.env.RATE_LIMIT_AUTH_BACKOFF_FACTOR) || 2
});

const publicLimiter = new FlexibleRateLimiter({
  getWindowMs: () => Number(process.env.RATE_LIMIT_PUBLIC_WINDOW_MS) || 60000,
  getMax: () => Number(process.env.RATE_LIMIT_PUBLIC_MAX) || 30
});

const userActionLimiter = new FlexibleRateLimiter({
  getWindowMs: () => Number(process.env.RATE_LIMIT_USER_WINDOW_MS) || 60000,
  getMax: () => Number(process.env.RATE_LIMIT_USER_MAX) || 100
});

// Middleware implementations
export const authRateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const ip = (req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown') as string;
  const account = (req.body && (req.body.email || req.body.username || req.body.account)) ? String(req.body.email || req.body.username || req.body.account) : null;

  // 1. Check IP rate limit
  const ipCheck = authIpLimiter.check(`auth_ip:${ip}`);
  if (!ipCheck.allowed) {
    res.setHeader("Retry-After", String(ipCheck.retryAfterSecs));
    res.setHeader("X-RateLimit-Type", "IP");
    return res.status(429).json({
      error: "Too many login/auth requests from this IP address. Please try again later.",
      retryAfter: ipCheck.retryAfterSecs,
      limitType: "IP"
    });
  }

  // 2. Check Account rate limit (if account info is present)
  if (account) {
    const accountCheck = authAccountLimiter.check(`auth_account:${account}`);
    if (!accountCheck.allowed) {
      res.setHeader("Retry-After", String(accountCheck.retryAfterSecs));
      res.setHeader("X-RateLimit-Type", "Account");
      return res.status(429).json({
        error: `Too many login/auth attempts for account: ${account}. Please try again later.`,
        retryAfter: accountCheck.retryAfterSecs,
        limitType: "Account"
      });
    }
  }

  next();
};

export const publicRateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const ip = (req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown') as string;
  const check = publicLimiter.check(`public:${ip}`);

  if (!check.allowed) {
    res.setHeader("Retry-After", String(check.retryAfterSecs));
    return res.status(429).json({
      error: "Too many public requests. Please slow down.",
      retryAfter: check.retryAfterSecs
    });
  }

  next();
};

export const userRateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const ip = (req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown') as string;
  // If there's an authenticated user/session, we can use user id/email as key instead of IP
  const userKey = (req.headers['x-user-id'] || ip) as string;
  const check = userActionLimiter.check(`user:${userKey}`);

  if (!check.allowed) {
    res.setHeader("Retry-After", String(check.retryAfterSecs));
    return res.status(429).json({
      error: "Too many actions performed. Please try again in a moment.",
      retryAfter: check.retryAfterSecs
    });
  }

  next();
};
