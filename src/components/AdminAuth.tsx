import React, { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  User
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ShieldAlert, LogIn, UserPlus, LogOut, KeyRound, CheckCircle2, ArrowLeft } from 'lucide-react';

const envAdminEmails = import.meta.env.VITE_AUTHORIZED_ADMIN_EMAILS;
const AUTHORIZED_ADMIN_EMAILS = envAdminEmails
  ? envAdminEmails.split(',').map((e: string) => e.trim().toLowerCase())
  : [
      'expertstandardsolutionfoa@gmail.com',
      'ferraojoe@gmail.com'
    ];
const DEFAULT_ADMIN_PASSWORD = import.meta.env.VITE_DEFAULT_ADMIN_PASSWORD || '$Qazwsx123';

export default function AdminAuth({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoAuth, setIsDemoAuth] = useState(() => localStorage.getItem('ess_authorized_admin') === 'true');
  const [adminExists, setAdminExists] = useState<boolean | null>(() => {
    const cached = localStorage.getItem('ess_admin_exists');
    return cached ? cached === 'true' : null;
  });
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Password reset states
  const [showResetView, setShowResetView] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [newRecoveryPassword, setNewRecoveryPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const [resetError, setResetError] = useState('');

  useEffect(() => {
    let mounted = true;
    const checkAdmin = async () => {
      try {
        const adminDoc = await getDoc(doc(db, 'metadata', 'admin'));
        if (mounted) {
          const exists = adminDoc.exists() || localStorage.getItem('ess_admin_created') === 'true';
          setAdminExists(exists);
          if (exists) localStorage.setItem('ess_admin_exists', 'true');
        }
      } catch (err) {
        console.error("Error checking admin status:", err);
        if (mounted && adminExists === null) {
          setAdminExists(localStorage.getItem('ess_admin_created') === 'true');
        }
      }
    };
    if (adminExists === null) {
      checkAdmin();
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const currentEmail = currentUser.email?.toLowerCase().trim();
        if (!currentEmail || !AUTHORIZED_ADMIN_EMAILS.map(e => e.toLowerCase().trim()).includes(currentEmail)) {
          if (mounted) setAuthError("Access Denied: This account is not authorized as an administrator.");
          await signOut(auth);
          if (mounted) setUser(null);
          if (mounted) setLoading(false);
          return;
        }

        // Double check if admindoc exists, if not, create it
        try {
          const adminDocRef = doc(db, 'metadata', 'admin');
          const adminDoc = await getDoc(adminDocRef);
          if (!adminDoc.exists()) {
            await setDoc(adminDocRef, { uid: currentUser.uid, email: currentUser.email });
            localStorage.setItem('ess_admin_created', 'true');
            if (mounted) setAdminExists(true);
          }
        } catch (err) {
          console.error("Error setting/checking admin doc:", err);
        }
        if (mounted) setUser(currentUser);
      } else {
        if (!isDemoAuth && mounted) setUser(null);
      }
      if (mounted) setLoading(false);
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [adminExists, isDemoAuth]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    const enteredEmail = email.trim().toLowerCase();
    if (!AUTHORIZED_ADMIN_EMAILS.map(e => e.toLowerCase().trim()).includes(enteredEmail)) {
      setAuthError('Access Denied: This account is not authorized as an administrator.');
      setAuthLoading(false);
      return;
    }

    const storedPwd = localStorage.getItem('ess_admin_pwd_custom') || DEFAULT_ADMIN_PASSWORD;

    try {
      if (adminExists || localStorage.getItem('ess_admin_created') === 'true') {
        // Login attempt
        if (password === storedPwd) {
          localStorage.setItem('ess_authorized_admin', 'true');
          setIsDemoAuth(true);
          setUser({ uid: 'admin-ess-authorized', email: enteredEmail } as any);
          // Also try firebase auth silently
          signInWithEmailAndPassword(auth, enteredEmail, password).catch(() => {});
        } else {
          try {
            await signInWithEmailAndPassword(auth, enteredEmail, password);
          } catch (firebaseErr: any) {
            setAuthError('Invalid password. Please check your credentials or use the Password Reset option.');
          }
        }
      } else {
        // First time Account Creation attempt
        if (password !== storedPwd && password.length < 6) {
          setAuthError('Password must be at least 6 characters.');
          setAuthLoading(false);
          return;
        }
        localStorage.setItem('ess_admin_created', 'true');
        localStorage.setItem('ess_authorized_admin', 'true');
        if (password !== DEFAULT_ADMIN_PASSWORD) {
          localStorage.setItem('ess_admin_pwd_custom', password);
        }
        setAdminExists(true);
        setIsDemoAuth(true);
        setUser({ uid: 'admin-ess-authorized', email: enteredEmail } as any);
        // Try firebase auth creation silently
        createUserWithEmailAndPassword(auth, enteredEmail, password).catch(() => {});
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      setAuthError(err.message || 'Authentication failed');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setAuthError('');
    setAuthLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const googleEmail = res.user.email?.toLowerCase().trim();
      if (!googleEmail || !AUTHORIZED_ADMIN_EMAILS.map(e => e.toLowerCase().trim()).includes(googleEmail)) {
        setAuthError('Access Denied: This Google account is not authorized as an administrator.');
        await signOut(auth);
      }
    } catch (err: any) {
      console.error("Google Auth error:", err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setAuthError(err.message || 'Google authentication failed');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');
    setResetSuccess('');

    const enteredRecoveryEmail = recoveryEmail.trim().toLowerCase();
    if (!AUTHORIZED_ADMIN_EMAILS.map(e => e.toLowerCase().trim()).includes(enteredRecoveryEmail)) {
      setResetError('Security Check Failed: Entered recovery email is not authorized.');
      return;
    }

    try {
      // Send Firebase Auth Reset Email
      sendPasswordResetEmail(auth, enteredRecoveryEmail).catch(() => {});
      
      // Update custom local fallback if new password entered
      if (newRecoveryPassword.trim()) {
        if (newRecoveryPassword.length < 6) {
          setResetError('New password must be at least 6 characters long.');
          return;
        }
        localStorage.setItem('ess_admin_pwd_custom', newRecoveryPassword);
        setResetSuccess('Recovery request processed successfully. Your access password has also been updated securely!');
      } else {
        setResetSuccess(`Password recovery instructions sent to ${enteredRecoveryEmail}. If this account is registered in Firebase, you will receive a reset email shortly.`);
      }
    } catch (err: any) {
      setResetError('Could not process password recovery.');
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('ess_authorized_admin');
    setIsDemoAuth(false);
    setUser(null);
    await signOut(auth).catch(() => {});
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 pt-32 pb-12 animate-pulse">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-800 flex flex-col items-center">
          {/* Logo Badge Skeleton */}
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full mb-6"></div>
          
          {/* Title and Subtitle Skeletons */}
          <div className="h-7 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-3"></div>
          <div className="h-4 w-64 bg-gray-200/80 dark:bg-gray-800/60 rounded mb-8"></div>
          
          {/* Inputs Skeletons */}
          <div className="w-full space-y-4 mb-6">
            <div className="space-y-2">
              <div className="h-3 w-16 bg-gray-200/80 dark:bg-gray-800/50 rounded"></div>
              <div className="h-11 w-full bg-gray-100 dark:bg-gray-800/40 rounded-xl"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3 w-16 bg-gray-200/80 dark:bg-gray-800/50 rounded"></div>
              <div className="h-11 w-full bg-gray-100 dark:bg-gray-800/40 rounded-xl"></div>
            </div>
          </div>
          
          {/* Button Skeleton */}
          <div className="h-12 w-full bg-gray-200 dark:bg-gray-800 rounded-xl mt-2"></div>
        </div>
      </div>
    );
  }

  if (!user && !isDemoAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 pt-32 pb-12">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-800">
          
          {showResetView ? (
            <div>
              <button
                type="button"
                onClick={() => { setShowResetView(false); setResetError(''); setResetSuccess(''); }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white mb-6 transition"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Login
              </button>

              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <KeyRound className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Password Reset</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Verify your authorized recovery email to reset access credentials.
                </p>
              </div>

              {resetError && (
                <div className="mb-5 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-xl text-sm border border-red-100 dark:border-red-900/30">
                  {resetError}
                </div>
              )}

              {resetSuccess ? (
                <div className="text-center py-6">
                  <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-6 leading-relaxed">
                    {resetSuccess}
                  </p>
                  <button
                    type="button"
                    onClick={() => { setShowResetView(false); setResetSuccess(''); }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition cursor-pointer"
                  >
                    Return to Login
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePasswordReset} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                      Authorized Recovery Email
                    </label>
                    <input
                      type="email"
                      required
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                      placeholder="admin@expertstandardsolution.com"
                    />
                    <span className="text-[11px] text-gray-500 mt-1 block">
                      Please enter your registered administrative recovery address.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                      New Password (Optional)
                    </label>
                    <input
                      type="password"
                      value={newRecoveryPassword}
                      onChange={(e) => setNewRecoveryPassword(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
                      placeholder="Enter new password to reset directly"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition mt-2 cursor-pointer shadow-md"
                  >
                    Send Recovery Email & Reset
                  </button>
                </form>
              )}
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {adminExists ? 'Admin Login' : 'Create Admin Account'}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {adminExists 
                    ? 'Enter authorized credentials to access the portal.' 
                    : 'Initialize the primary administrator account.'}
                </p>
              </div>

              {authError && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-xl text-sm border border-red-100 dark:border-red-900/30 leading-relaxed">
                  {authError}
                </div>
              )}

              <form onSubmit={handleAuth} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                    placeholder="admin@expertstandardsolution.com"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                    <button
                      type="button"
                      onClick={() => setShowResetView(true)}
                      className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                    placeholder="••••••••"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer shadow-md"
                >
                  {authLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : adminExists ? (
                    <><LogIn className="w-5 h-5" /> Login to Admin Panel</>
                  ) : (
                    <><UserPlus className="w-5 h-5" /> Initialize Admin Account</>
                  )}
                </button>
              </form>


            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={handleLogout}
          className="bg-gray-900 dark:bg-gray-800 text-white border border-gray-700 hover:bg-red-600 dark:hover:bg-red-600 font-medium py-2.5 px-5 rounded-full shadow-lg transition flex items-center gap-2 text-sm cursor-pointer"
        >
          <LogOut className="w-4 h-4" /> Sign Out Admin
        </button>
      </div>
      {children}
    </>
  );
}
