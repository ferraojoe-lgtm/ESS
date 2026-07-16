import React from "react";
import {
  HashRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { SEO_PAGES_DATA } from "./data/seoPagesData";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  Shield,
  Users,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Search,
  ArrowUp,
  Sparkles,
  Car,
  Wrench,
  AlertCircle,
  MapPin,
  Cloud,
  Sun,
  CloudRain,
  Moon,
  Leaf,
  Settings,
  Globe,
  Phone,
  Video,
  Lock,
  Bug,
  Briefcase,
  Copy,
  Check,
  Mail,
} from "lucide-react";
import Home from "./pages/Home";
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Careers = React.lazy(() => import("./pages/Careers"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = React.lazy(() => import("./pages/TermsConditions"));
const SeoServicePage = React.lazy(() => import("./pages/SeoServicePage"));
const SeoDashboard = React.lazy(() => import("./pages/SeoDashboard"));
const Sitemap = React.lazy(() => import("./pages/Sitemap"));
import { CompanyLogo } from "./components/CompanyLogo";
import CookieBanner from "./components/CookieBanner";
import { cn } from "./lib/utils";
import { LanguageProvider, useLanguage } from "./lib/LanguageContext";

const ThemeContext = React.createContext({
  theme: "light",
  toggleTheme: () => {},
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState("light");

  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function getWeatherIcon(code: number) {
  if (code <= 3) return <Sun className="w-3.5 h-3.5 text-amber-400" />;
  if (code >= 51 && code <= 67)
    return <CloudRain className="w-3.5 h-3.5 text-blue-400" />;
  if (code >= 80 && code <= 82)
    return <CloudRain className="w-3.5 h-3.5 text-blue-400" />;
  return <Cloud className="w-3.5 h-3.5 text-gray-400" />;
}

function TopInfoBar() {
  const [time, setTime] = React.useState(new Date());
  const [weather, setWeather] = React.useState<{
    temp: number;
    code: number;
    city: string;
  } | null>(null);
  const { language, setLanguage, t } = useLanguage();

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);

    async function fetchLocationAndWeather() {
      // Use cached weather data if available and less than 30 minutes old to avoid blocking API fetches
      try {
        const cached = sessionStorage.getItem("ess_cached_weather");
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < 30 * 60 * 1000) {
            setWeather(data);
            return;
          }
        }
      } catch (cacheErr) {
        console.warn("Failed to read weather cache from sessionStorage:", cacheErr);
      }

      try {
        let lat = 17.385;
        let lon = 78.4867;
        let city = "Hyderabad";

        try {
          const geoRes = await fetch("https://get.geojs.io/v1/ip/geo.json");
          if (geoRes.ok) {
            const geoData = await geoRes.json();
            if (geoData.latitude && geoData.longitude) {
              lat = parseFloat(geoData.latitude);
              lon = parseFloat(geoData.longitude);
              city = geoData.city || city;
            }
          }
        } catch (geoErr) {
          console.warn(
            "Geolocation fetch failed, using default location:",
            geoErr,
          );
        }

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`,
        );
        if (weatherRes.ok) {
          const weatherData = await weatherRes.json();
          if (weatherData && weatherData.current) {
            const weatherObj = {
              temp: Math.round(weatherData.current.temperature_2m),
              code: weatherData.current.weather_code,
              city: city,
            };
            setWeather(weatherObj);
            try {
              sessionStorage.setItem(
                "ess_cached_weather",
                JSON.stringify({ data: weatherObj, timestamp: Date.now() })
              );
            } catch (storageErr) {
              console.warn("Failed to save weather cache to sessionStorage:", storageErr);
            }
          }
        } else {
          throw new Error("Weather API request failed");
        }
      } catch (err) {
        console.warn("Weather fetch failed:", err);
        setWeather({
          temp: 28,
          code: 2,
          city: "Hyderabad (Offline)",
        });
      }
    }

    fetchLocationAndWeather();
    return () => clearInterval(timer);
  }, []);

  const dateStr = `${time.getDate().toString().padStart(2, "0")}/${time.toLocaleString("default", { month: "long" })}/${time.getFullYear().toString().slice(-2)}`;
  const timeStr = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-gray-900 border-b border-gray-800 text-gray-300 text-[11px] sm:text-xs py-1.5 px-4 flex justify-between items-center z-50 relative font-medium tracking-wide">
      <div className="flex gap-4 items-center">
        <span>{timeStr}</span>
        <span className="text-gray-600 hidden sm:inline">|</span>
        <span className="hidden sm:inline">{dateStr}</span>
        <span className="sm:hidden">
          {time.getDate().toString().padStart(2, "0")}/{time.getMonth() + 1}/
          {time.getFullYear().toString().slice(-2)}
        </span>
      </div>
      <div className="flex gap-4 items-center">
        {weather ? (
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-gray-400 hidden sm:inline" />
              {weather.city}
            </span>
            <span className="text-gray-600">|</span>
            <span className="flex items-center gap-1.5">
              {getWeatherIcon(weather.code)}
              {weather.temp}°C
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 animate-pulse">
            <div className="h-3 w-16 bg-gray-700 rounded-md"></div>
            <span className="text-gray-700">|</span>
            <div className="w-3.5 h-3.5 bg-gray-700 rounded-full"></div>
            <div className="h-3 w-8 bg-gray-700 rounded-md"></div>
          </div>
        )}
        <span className="text-gray-600 hidden sm:inline">|</span>
        <button
          onClick={() =>
            setLanguage((l) => (l === "EN" ? "TE" : l === "TE" ? "HI" : "EN"))
          }
          className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          title="Toggle Language (English / Telugu / Hindi)"
          aria-label={`Current language: ${language === "EN" ? "English" : language === "TE" ? "Telugu" : "Hindi"}. Click to toggle language.`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{language}</span>
        </button>
      </div>
    </div>
  );
}

function NewsTicker() {
  const items = [
    "Premium Valet Parking & Facility Management Services",
    "Serving Hyderabad & Telangana",
    "Trusted by Residential & Corporate Clients",
  ];

  return (
    <div className="bg-blue-600 dark:bg-blue-700 text-white text-[11px] xs:text-xs sm:text-sm font-medium py-2 px-4 shadow-sm relative overflow-hidden transition-colors duration-300">
      {/* Desktop view: Centered clean banner */}
      <div className="hidden md:flex items-center justify-center gap-8">
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            <span className="flex items-center gap-2 tracking-wide font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-200 animate-pulse"></span>
              {item}
            </span>
            {idx < items.length - 1 && (
              <span className="text-blue-300/50">•</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile/Tablet view: Smooth continuous marquee with faster animation */}
      <div className="md:hidden overflow-hidden whitespace-nowrap relative flex items-center group h-5">
        <div 
          className="animate-marquee group-hover:[animation-play-state:paused] inline-block whitespace-nowrap min-w-full"
          style={{ animationDuration: '22s' }}
        >
          {items.map((item, idx) => (
            <span
              key={idx}
              className="mx-6 inline-flex items-center gap-2 font-semibold tracking-wide"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-200"></span>
              {item}
            </span>
          ))}
        </div>
        <div 
          className="animate-marquee2 group-hover:[animation-play-state:paused] inline-block whitespace-nowrap absolute top-0 min-w-full"
          style={{ animationDuration: '22s' }}
        >
          {items.map((item, idx) => (
            <span
              key={`dup-${idx}`}
              className="mx-6 inline-flex items-center gap-2 font-semibold tracking-wide"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-200"></span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
function ScrollToTopButton() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    let ticking = false;
    let currentlyShown = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 300;
          if (shouldShow !== currentlyShown) {
            currentlyShown = shouldShow;
            setShow(shouldShow);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{ height: "44px", width: "44px" }}
      className="fixed bottom-20 right-6 z-50 p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hidden md:flex items-center justify-center border-2 border-white dark:border-gray-800 group"
      aria-label="Scroll to top"
      title="Take me home"
    >
      <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
}

function SearchModal() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const onClose = React.useCallback(() => {
    setIsOpen(false);
    setQuery("");
  }, []);

  React.useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-search", handleOpen);

    // Keyboard shortcut (Ctrl+K / Cmd+K)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("open-search", handleOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const allItems = [
    {
      title: "Company Profile",
      category: "About Us",
      path: "/#company-profile",
    },
    {
      title: "Our Professionals at work",
      category: "About Us",
      path: "/#professionals",
    },
    { title: "Leadership Team", category: "About Us", path: "/#team" },
    { title: "Our Clients", category: "About Us", path: "/#clients" },
    {
      title: "Service Excellence",
      category: "About Us",
      path: "/#service-excellence",
    },
    { title: "Health & Safety", category: "About Us", path: "/#health-safety" },
    {
      title: "Frequently Asked Questions (FAQ)",
      category: "Support",
      path: "/#faq-section",
    },
    {
      title: "Valet Service",
      category: "Commercial Services",
      path: "/valet-parking-services-hyderabad",
    },
    {
      title: "Office Cleaning",
      category: "Commercial Services",
      path: "/housekeeping-services-hyderabad",
    },
    {
      title: "CCTV Monitoring",
      category: "Commercial Services",
      path: "/cctv-monitoring-services-hyderabad",
    },
    {
      title: "Access Control",
      category: "Commercial Services",
      path: "/access-control-services-hyderabad",
    },
    {
      title: "Hospitality",
      category: "Commercial Services",
      path: "/manpower-supply-services-hyderabad",
    },
    {
      title: "Other Service",
      category: "Commercial Services",
      path: "/deep-cleaning-services-hyderabad",
    },
    {
      title: "Pest Control",
      category: "Commercial Services",
      path: "/pest-control-services-hyderabad",
    },
    {
      title: "Manpower Supply",
      category: "Commercial Services",
      path: "/manpower-supply-services-hyderabad",
    },
    { title: "Careers", category: "Careers", path: "/careers" },
    { title: "Contact Us", category: "Contact", path: "/#quote" },
  ];

  const filtered = allItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSelect = (path: string) => {
    onClose();
    if (path.startsWith("/#")) {
      const id = path.replace("/#", "");
      if (location.pathname !== "/") {
        navigate(path);
      } else {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const headerHeight = document.querySelector("header")?.offsetHeight || 120;
          window.scrollTo({
            top: rect.top + scrollTop - headerHeight,
            behavior: "smooth"
          });
          window.history.pushState(null, "", path);
        } else {
          navigate(path);
        }
      }
    } else {
      navigate(path);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
          {/* Backdrop with fade animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal with fade-in and slide-down animation */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.05 }}
            className="bg-white dark:bg-gray-900 rounded-2xl max-w-xl w-full shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden relative z-10"
          >
            <div className="flex items-center px-4 border-b border-gray-100 dark:border-gray-800">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services, team, careers, safety..."
                className="w-full py-4 text-lg bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 focus:ring-0 focus:border-none focus:outline-none"
              />
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2 text-left">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-gray-500 text-sm">
                  No results found for "{query}"
                </div>
              ) : (
                filtered.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(item.path)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 text-left transition group cursor-pointer"
                  >
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {item.category}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transform group-hover:translate-x-1 transition" />
                  </button>
                ))
              )}
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-950/60 border-t border-gray-100 dark:border-gray-850 text-center text-xs text-gray-400 flex items-center justify-between px-4">
              <span>
                Press{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-mono text-[10px]">
                  ESC
                </kbd>{" "}
                to close
              </span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-500 animate-pulse" />{" "}
                Expert Standard Solutions
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

const shineVariants = {
  initial: { x: "-100%", opacity: 0 },
  hover: {
    x: "250%",
    opacity: [0, 0.45, 0.45, 0],
    transition: {
      duration: 1.2,
      ease: "easeInOut",
      times: [0, 0.2, 0.8, 1],
    },
  },
};

function Navbar({ isScrolled }: { isScrolled?: boolean }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(
    null,
  );
  const [mobileDropdown, setMobileDropdown] = React.useState<string | null>(
    null,
  );
  const location = useLocation();
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  const aboutDropdown = [
    { name: "Company Profile", path: "/#company-profile" },
    { name: "Our Professionals at work", path: "/#professionals" },
    { name: "Leadership Team", path: "/#team" },
    { name: "Our Clients", path: "/#clients" },
    { name: "Service Excellence", path: "/#service-excellence" },
    { name: "Health & Safety", path: "/#health-safety" },
    { name: "Frequently Asked Questions (FAQ)", path: "/#faq-section" },
  ];

  const commercialDropdown = [
    { name: "Corporate Housekeeping", path: "/housekeeping-services-hyderabad" },
    { name: "Valet Parking Services", path: "/valet-parking-services-hyderabad" },
    { name: "Mechanized Deep Cleaning", path: "/deep-cleaning-services-hyderabad" },
    { name: "Facade Cleaning", path: "/facade-cleaning-services-hyderabad" },
    { name: "CCTV Remote Monitoring", path: "/cctv-monitoring-services-hyderabad" },
    { name: "Access Control Systems", path: "/access-control-services-hyderabad" },
    { name: "Professional Pest Control", path: "/pest-control-services-hyderabad" },
    { name: "Facility Manpower Supply", path: "/manpower-supply-services-hyderabad" },
  ];

  const navigate = useNavigate();

  const handleNavClick = (path: string) => {
    setIsOpen(false);
    setActiveDropdown(null);
    if (path.startsWith("/#")) {
      const id = path.replace("/#", "");
      if (location.pathname !== "/") {
        navigate(path);
      } else {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const getActualHeaderHeight = () => {
            const topBar = document.querySelector("header > div:first-child") as HTMLElement;
            const navContainer = document.querySelector("nav > div.max-w-7xl") as HTMLElement;
            if (navContainer) {
              let height = navContainer.offsetHeight;
              if (topBar && !topBar.classList.contains("max-h-0")) {
                height += topBar.offsetHeight;
              }
              return height;
            }
            return document.querySelector("header")?.offsetHeight || 120;
          };
          const headerHeight = getActualHeaderHeight();
          window.scrollTo({
            top: rect.top + scrollTop - headerHeight,
            behavior: "smooth"
          });
          window.history.pushState(null, "", path);
        } else {
          navigate(path);
        }
      }
    }
  };

  const linkStyle = { fontFamily: "Montserrat, sans-serif" };

  return (
    <>
      <nav
        className="relative w-full z-50 bg-transparent transition-colors duration-300"
        style={{
          mixBlendMode:
            !isScrolled && !activeDropdown && !isOpen
              ? theme === "dark"
                ? "screen"
                : "multiply"
              : "normal",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "flex justify-between items-center transition-all duration-300",
              isScrolled ? "py-2" : "py-4",
            )}
          >
            <div className="flex items-center">
              <Link
                to="/"
                className="flex items-center"
                onClick={(e) => {
                  if (location.pathname === "/") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                    scale: { type: "spring", stiffness: 300, damping: 20 },
                    y: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                  }}
                  className="flex flex-col justify-center relative overflow-hidden rounded-xl p-1"
                  style={{
                    willChange: "transform",
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/deed9nqtg/image/upload/v1782989113/ESSfinalone_zdxt3v.png"
                    alt="Expert Standard Solution Logo"
                    referrerPolicy="no-referrer"
                    className={cn(
                      "object-contain transition-all duration-300 max-w-full relative z-10",
                      isScrolled
                        ? "h-[65px] md:h-[75px]"
                        : "h-[90px] md:h-[110px]"
                    )}
                    style={{
                      filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.08))",
                    }}
                  />
                  <motion.div
                    variants={shineVariants}
                    className="absolute inset-0 top-0 h-full w-1/2 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent z-20 pointer-events-none"
                  />
                </motion.div>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-6 text-[17px] leading-[26px] ml-4">
              <Link
                to="/"
                onClick={(e) => {
                  if (location.pathname === "/") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                style={linkStyle}
                className="font-bold text-black dark:text-white hover:text-blue-700 dark:hover:text-blue-400 transition-colors drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
              >
                Home
              </Link>

              {/* About dropdown */}
              <div
                className="relative group py-2"
                onMouseEnter={() => setActiveDropdown("about")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to="/#company-profile"
                  onClick={(e) => {
                    setActiveDropdown(null);
                    if (location.pathname === "/") {
                      e.preventDefault();
                      handleNavClick("/#company-profile");
                    }
                  }}
                  style={linkStyle}
                  className="flex items-center gap-1 font-bold text-black dark:text-white hover:text-blue-700 dark:hover:text-blue-400 transition-colors drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] cursor-pointer"
                  aria-expanded={activeDropdown === "about"}
                  aria-haspopup="true"
                  aria-label="About menu"
                >
                  About{" "}
                  <ChevronDown className="w-4 h-4 mt-0.5 transition-transform group-hover:rotate-180" />
                </Link>
                {activeDropdown === "about" && (
                  <div className="absolute top-full left-0 mt-0 w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 py-2 z-50 text-left">
                    {aboutDropdown.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={(e) => {
                          setActiveDropdown(null);
                          if (item.path.startsWith("/#")) {
                            e.preventDefault();
                            handleNavClick(item.path);
                          }
                        }}
                        className="block px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Services dropdown */}
              <div
                className="relative group py-2"
                onMouseEnter={() => setActiveDropdown("commercial")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to="/#services-overview"
                  onClick={(e) => {
                    setActiveDropdown(null);
                    if (location.pathname === "/") {
                      e.preventDefault();
                      handleNavClick("/#services-overview");
                    }
                  }}
                  style={linkStyle}
                  className="flex items-center gap-1 font-bold text-black dark:text-white hover:text-blue-700 dark:hover:text-blue-400 transition-colors drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] cursor-pointer"
                  aria-expanded={activeDropdown === "commercial"}
                  aria-haspopup="true"
                  aria-label="Services menu"
                >
                  Services{" "}
                  <ChevronDown className="w-4 h-4 mt-0.5 transition-transform group-hover:rotate-180" />
                </Link>
                {activeDropdown === "commercial" && (
                  <div className="absolute top-full left-0 mt-0 w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 py-2 z-50 text-left">
                    {commercialDropdown.map((item) => (
                      <motion.div
                        key={item.name}
                        whileHover={{ scale: 1.03, y: -2 }}
                        transition={{ type: "spring", stiffness: 350, damping: 22 }}
                        className="px-2"
                      >
                        <Link
                          to={item.path}
                          onClick={(e) => {
                            setActiveDropdown(null);
                            if (item.path.startsWith("/#")) {
                              e.preventDefault();
                              handleNavClick(item.path);
                            } else {
                              if (location.pathname === item.path) {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }
                            }
                          }}
                          className="block px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors duration-200"
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>



              {/* Contact */}
              <Link
                to="/#quote"
                onClick={(e) => {
                  if (location.pathname === "/") {
                    e.preventDefault();
                    handleNavClick("/#quote");
                  }
                }}
                style={linkStyle}
                className="font-bold text-black dark:text-white hover:text-blue-700 dark:hover:text-blue-400 transition-colors drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
              >
                Contact
              </Link>

              {/* Replaced search with Call Now */}
              <a
                href="tel:+917386843005"
                style={linkStyle}
                className="flex items-center gap-2 font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md px-5 py-2.5 rounded-full cursor-pointer text-sm tracking-wide ml-2"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>Call Now +91 73868 43005</span>
              </a>

              <button
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("open-search"))
                }
                className="p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors ml-1 cursor-pointer"
                aria-label="Search site"
                title="Search (Ctrl+K)"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors ml-1 cursor-pointer"
                aria-label="Toggle Dark Mode"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white cursor-pointer"
                aria-label={
                  isOpen
                    ? "Close main navigation menu"
                    : "Open main navigation menu"
                }
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-300 shadow-xl max-h-[80vh] overflow-y-auto text-left"
            >
              <div className="px-4 pt-3 pb-6 space-y-2">
                <Link
                  to="/"
                  onClick={() => {
                    setIsOpen(false);
                    if (location.pathname === "/") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="block px-3 py-2.5 rounded-xl font-bold text-[16px] text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Home
                </Link>

                <div>
                  <button
                    onClick={() =>
                      setMobileDropdown(
                        mobileDropdown === "about" ? null : "about",
                      )
                    }
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-[16px] text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 text-left cursor-pointer"
                    aria-expanded={mobileDropdown === "about"}
                    aria-haspopup="true"
                    aria-label="Toggle About section dropdown"
                  >
                    <span>About</span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        mobileDropdown === "about" && "rotate-180",
                      )}
                    />
                  </button>
                  {mobileDropdown === "about" && (
                    <div className="pl-4 pr-2 py-1 space-y-1 border-l-2 border-blue-500 ml-3 mt-1">
                      {aboutDropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={(e) => {
                            if (item.path.startsWith("/#")) {
                              e.preventDefault();
                              handleNavClick(item.path);
                            } else {
                              setIsOpen(false);
                            }
                          }}
                          className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <button
                    onClick={() =>
                      setMobileDropdown(
                        mobileDropdown === "commercial" ? null : "commercial",
                      )
                    }
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-[16px] text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 text-left cursor-pointer"
                    aria-expanded={mobileDropdown === "commercial"}
                    aria-haspopup="true"
                    aria-label="Toggle Services section dropdown"
                  >
                    <span>Services</span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        mobileDropdown === "commercial" && "rotate-180",
                      )}
                    />
                  </button>
                  {mobileDropdown === "commercial" && (
                    <div className="pl-4 pr-2 py-1 space-y-1 border-l-2 border-blue-500 ml-3 mt-1">
                      {commercialDropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={(e) => {
                            if (item.path.startsWith("/#")) {
                              e.preventDefault();
                              handleNavClick(item.path);
                            } else {
                              setIsOpen(false);
                              if (location.pathname === item.path) {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }
                            }
                          }}
                          className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>



                <Link
                  to="/#quote"
                  onClick={(e) => {
                    if (location.pathname === "/") {
                      e.preventDefault();
                      handleNavClick("/#quote");
                    } else {
                      setIsOpen(false);
                    }
                  }}
                  className="block px-3 py-2.5 rounded-xl font-bold text-[16px] text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Contact
                </Link>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    window.dispatchEvent(new CustomEvent("open-search"));
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-[16px] text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 text-left cursor-pointer"
                >
                  <Search className="w-5 h-5 text-gray-500 shrink-0" />
                  <span>Search Website</span>
                </button>

                <button
                  onClick={() => {
                    toggleTheme();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-[16px] text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 text-left cursor-pointer"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="w-5 h-5 text-amber-500 shrink-0" />
                      <span>Switch to Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-5 h-5 text-gray-500 shrink-0" />
                      <span>Switch to Dark Mode</span>
                    </>
                  )}
                </button>

                <div className="pt-3">
                  <a
                    href="tel:+917386843005"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-center shadow-md transition"
                  >
                    <Phone className="w-4 h-4 fill-current" />
                    <span>Call Now +91 73868 43005</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-28 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="mb-4">
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-block"
              >
                <motion.div
                  initial="initial"
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  className="relative overflow-hidden rounded-xl p-1 inline-block"
                  style={{ willChange: "transform" }}
                >
                  <img
                    src="https://res.cloudinary.com/deed9nqtg/image/upload/v1782989113/ESSfinalone_zdxt3v.png"
                    alt="Expert Standard Solution Logo"
                    referrerPolicy="no-referrer"
                    className="h-14 md:h-16 w-auto object-contain relative z-10 transition-all duration-300"
                    style={{
                      filter: "drop-shadow(0 2px 6px rgba(0, 0, 0, 0.12))",
                    }}
                  />
                  <motion.div
                    variants={shineVariants}
                    className="absolute inset-0 top-0 h-full w-1/2 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent z-20 pointer-events-none"
                  />
                </motion.div>
              </Link>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {t("footer", "description")}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {t("footer", "contact")}
            </h3>
            <div className="space-y-3">
              <CompanyAddress />
              <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
                <p className="text-xs text-gray-500 font-mono">
                  <strong>GSTIN:</strong> 36AAIFE4118R1ZZ
                </p>
                <a
                  href="https://maps.app.goo.gl/b6mHqbXBWE9DpEjc9"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-blue-400 hover:text-blue-300 transition inline-flex items-center gap-1 font-medium"
                >
                  View on Google Maps <ChevronRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {t("footer", "services")}
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  to="/access-control-services-hyderabad"
                  onClick={() => {
                    if (location.pathname === "/access-control-services-hyderabad") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Lock className="w-4 h-4 text-blue-400 shrink-0" />
                  Access Control
                </Link>
              </li>
              <li>
                <Link
                  to="/cctv-monitoring-services-hyderabad"
                  onClick={() => {
                    if (location.pathname === "/cctv-monitoring-services-hyderabad") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Video className="w-4 h-4 text-blue-400 shrink-0" />
                  CCTV Monitoring
                </Link>
              </li>
              <li>
                <Link
                  to="/manpower-supply-services-hyderabad"
                  onClick={() => {
                    if (location.pathname === "/manpower-supply-services-hyderabad") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Users className="w-4 h-4 text-blue-400 shrink-0" />
                  Corporate Hospitality
                </Link>
              </li>
              <li>
                <Link
                  to="/manpower-supply-services-hyderabad"
                  onClick={() => {
                    if (location.pathname === "/manpower-supply-services-hyderabad") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4 text-blue-400 shrink-0" />
                  Manpower Supply
                </Link>
              </li>
              <li>
                <Link
                  to="/housekeeping-services-hyderabad"
                  onClick={() => {
                    if (location.pathname === "/housekeeping-services-hyderabad") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
                  Corporate Housekeeping
                </Link>
              </li>
              <li>
                <Link
                  to="/deep-cleaning-services-hyderabad"
                  onClick={() => {
                    if (location.pathname === "/deep-cleaning-services-hyderabad") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Wrench className="w-4 h-4 text-blue-400 shrink-0" />
                  Deep Cleaning
                </Link>
              </li>
              <li>
                <Link
                  to="/pest-control-services-hyderabad"
                  onClick={() => {
                    if (location.pathname === "/pest-control-services-hyderabad") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Bug className="w-4 h-4 text-blue-400 shrink-0" />
                  Pest Control
                </Link>
              </li>
              <li>
                <Link
                  to="/valet-parking-services-hyderabad"
                  onClick={() => {
                    if (location.pathname === "/valet-parking-services-hyderabad") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Car className="w-4 h-4 text-blue-400 shrink-0" />
                  Valet Service
                </Link>
              </li>
            </ul>
            <div className="mt-6 flex flex-col gap-2.5">
              <Link
                to="/careers"
                className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1 transition-colors"
              >
                {t("footer", "joinTeam")} <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to="/admin"
                className="text-gray-400 hover:text-white text-xs inline-flex items-center gap-1.5 transition-colors pt-1 border-t border-gray-800/60"
              >
                <Shield className="w-3.5 h-3.5 text-blue-500" /> Admin Login
              </Link>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
            <span className="inline-flex items-center gap-1.5 text-green-400 font-medium">
              <Leaf className="w-4 h-4" /> {t("footer", "ecoFriendly")}
            </span>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <span>
              &copy; {new Date().getFullYear()} Expert Standard Solution. All
              rights reserved.
            </span>
            <div className="flex items-center gap-6 text-xs text-gray-400 flex-wrap justify-center">
              <Link
                to="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link
                to="/sitemap"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="hover:text-white transition-colors"
              >
                Sitemap
              </Link>
              <span className="text-gray-700">|</span>
              <span className="text-gray-500">
                Designed by{" "}
                <a
                  href="https://wa.me/917995506100"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="hover:text-white transition-colors font-medium"
                >
                  Joe Ferrao
                </a>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

function CompanyAddress() {
  const [copied, setCopied] = React.useState(false);
  const [showCopyBtn, setShowCopyBtn] = React.useState(false);
  const addressText = "Pillar Number 143, Plot No 4-3-119/5, 1st Floor, Near, Attapur, Hyderabad, Telangana 500048\nEmail: info@expertstandardsolution.com\nPhone: +91 73868 43005";

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(addressText);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowCopyBtn(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy address details", err);
    }
  };

  return (
    <div
      onClick={() => setShowCopyBtn((prev) => !prev)}
      onMouseEnter={() => setShowCopyBtn(true)}
      onMouseLeave={() => setShowCopyBtn(false)}
      className="relative group/addr bg-gray-900/40 hover:bg-gray-900/60 p-5 md:py-8 md:px-7 rounded-xl border border-gray-800/40 transition-all duration-300 cursor-pointer select-none md:select-text"
    >
      <div className="space-y-4 md:space-y-6 text-sm text-gray-400">
        <div className="flex items-start gap-3">
          <MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
          <div className="leading-relaxed">
            <p className="font-medium text-gray-300">Expert Standard Solution (ESS)</p>
            <p>Pillar Number 143, Plot No 4-3-119/5, 1st Floor,</p>
            <p>Near, Attapur, Hyderabad,</p>
            <p>Telangana 500048</p>
          </div>
        </div>
        <div className="flex items-center gap-3 pt-3.5 md:pt-5 border-t border-gray-800/40" onClick={(e) => e.stopPropagation()}>
          <Mail className="w-4 h-4 text-blue-400 shrink-0" />
          <a href="mailto:info@expertstandardsolution.com" className="hover:text-white transition-colors">
            info@expertstandardsolution.com
          </a>
        </div>
        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
          <Phone className="w-4 h-4 text-blue-400 shrink-0" />
          <a href="tel:+917386843005" className="hover:text-white transition-colors">
            +91 73868 43005
          </a>
        </div>
        <div className="pt-4 md:pt-6 border-t border-gray-800/40" onClick={(e) => e.stopPropagation()}>
          <div className="w-full h-32 md:h-40 rounded-lg overflow-hidden border border-gray-800 bg-gray-950 relative group/map">
            <iframe
              title="Expert Standard Solution Location Map"
              src="https://maps.google.com/maps?q=Expert%20Standard%20Solution,%20Pillar%20Number%20143,%20Attapur,%20Hyderabad,%20Telangana%20500048&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 grayscale invert opacity-70 contrast-125 brightness-90 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      <button
        onClick={handleCopy}
        aria-label="Copy Address Details"
        className={cn(
          "absolute top-3 right-3 p-1.5 rounded-lg bg-gray-800/95 hover:bg-gray-700 text-gray-200 hover:text-white border border-gray-700/50 shadow-md transition-all duration-300 cursor-pointer flex items-center gap-1.5 text-[11px] font-medium z-30",
          showCopyBtn
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none translate-y-1"
        )}
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400 font-semibold">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-blue-400" />
            <span>Copy details</span>
          </>
        )}
      </button>
    </div>
  );
}

function WhatsAppButton() {
  const [isOpen, setIsOpen] = React.useState(false);

  const departments = [
    {
      id: "sales",
      name: "Sales & Business",
      description:
        "Get quotes, custom SLAs, and schedule corporate facility walkthroughs",
      message:
        "Hello ESS Sales! I would like to inquire about your corporate facility management, corporate housekeeping, and valet parking solutions.",
      icon: Sparkles,
      colorClass:
        "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/20",
      hoverClass:
        "hover:border-emerald-300 dark:hover:border-emerald-700/60 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/10",
    },
    {
      id: "support",
      name: "Operations & Support",
      description:
        "Request operational assistance, raise a query, or submit feedback",
      message:
        "Hello ESS Support! I need operational assistance regarding our ongoing facility services.",
      icon: Wrench,
      colorClass:
        "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/20",
      hoverClass:
        "hover:border-blue-300 dark:hover:border-blue-700/60 hover:bg-blue-50/40 dark:hover:bg-blue-950/10",
    },
    {
      id: "careers",
      name: "Careers & Recruitment",
      description:
        "Explore active job openings and submit your direct application",
      message:
        "Hello ESS Careers! I am interested in exploring job opportunities and joining the Expert Standard Solution team.",
      icon: Users,
      colorClass:
        "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900/20",
      hoverClass:
        "hover:border-purple-300 dark:hover:border-purple-700/60 hover:bg-purple-50/40 dark:hover:bg-purple-950/10",
    },
  ];

  return (
    <>
      <button
        id="WhatsAppButton"
        onClick={() => setIsOpen(true)}
        style={{ height: "40px", width: "181px" }}
        className="fixed bottom-20 md:bottom-6 right-6 z-50 hidden md:flex items-center justify-center gap-2 bg-[#0F7469] text-white rounded-full shadow-lg hover:bg-[#0a544c] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer border-none outline-none"
        aria-label="WhatsApp Us"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="flex-shrink-0 animate-pulse group-hover:scale-110 transition-transform"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
        <span className="font-semibold text-sm tracking-wide">WhatsApp Us</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-2xl p-6 max-w-md w-full relative z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors cursor-pointer border-none outline-none"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="mb-6 pr-6">
                <div className="flex items-center gap-2 text-[#0F7469] mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  <span className="font-bold tracking-tight">
                    Direct WhatsApp Support
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  Select a Department
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose the correct department to receive instant support and
                  tailored assistance from our team.
                </p>
              </div>

              {/* Department Options */}
              <div className="space-y-3">
                {departments.map((dept) => {
                  const Icon = dept.icon;
                  // Compute tracking variables and URL statically on render
                  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, "");
                  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
                  const deptCode = dept.id.substring(0, 3).toUpperCase();
                  const refId = `ESS-${deptCode}-${dateStr}-${randomStr}`;
                  const trackedMessage = `${dept.message}\n\n[Ref ID: ${refId} | Source: Website]`;
                  const url = `https://wa.me/917386843005?text=${encodeURIComponent(trackedMessage)}`;

                  return (
                    <a
                      key={dept.id}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className={`w-full text-left p-4 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-start gap-4 transition-all duration-300 transform active:scale-[0.98] group/item cursor-pointer bg-white dark:bg-gray-900 no-underline hover:no-underline ${dept.hoverClass}`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover/item:scale-110 ${dept.colorClass}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-bold text-gray-950 dark:text-white text-base group-hover/item:text-[#0F7469] dark:group-hover/item:text-emerald-400 transition-colors">
                            {dept.name}
                          </h3>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover/item:translate-x-1 transition-transform" />
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                          {dept.description}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Footer text */}
              <div className="mt-5 text-center">
                <p className="text-[11px] text-gray-500 dark:text-gray-500">
                  Typically responds in under 5 minutes • Available 24/7
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileStickyDock() {
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  const trackedMessage = `Hello ESS Sales! I would like to inquire about your corporate facility management, corporate housekeeping, and valet parking solutions.\n\n[Ref ID: ESS-SALES-${dateStr}-${randomStr} | Source: MobileDock]`;
  const whatsappUrl = `https://wa.me/917386843005?text=${encodeURIComponent(trackedMessage)}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex h-14 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
      <a
        href="tel:+917386843005"
        className="w-1/2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm h-full transition-all active:bg-blue-800"
      >
        <Phone className="w-4 h-4 fill-current" />
        <span>Call Now</span>
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-1/2 flex items-center justify-center gap-2 bg-[#0F7469] hover:bg-[#0a544c] text-white font-bold text-sm h-full transition-all active:bg-[#073832]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="flex-shrink-0"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
        <span>WhatsApp</span>
      </a>
    </div>
  );
}

function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const { pathname } = useLocation();

  React.useEffect(() => {
    let ticking = false;
    let totalHeight = 0;
    let lastProgress = -1;

    const measureHeight = () => {
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      totalHeight = docHeight - winHeight;
    };

    const handleScroll = () => {
      if (totalHeight <= 0) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const progress = Math.round((window.scrollY / totalHeight) * 100);
          if (progress !== lastProgress) {
            lastProgress = progress;
            setScrollProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    measureHeight();
    window.addEventListener("resize", measureHeight, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Account for dynamic dynamic content loading
    const timeoutId1 = setTimeout(measureHeight, 200);
    const timeoutId2 = setTimeout(measureHeight, 1000);

    return () => {
      window.removeEventListener("resize", measureHeight);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
    };
  }, [pathname]);

  return (
    <div className="w-full h-[3px] bg-gray-200/20 dark:bg-gray-800/20 relative z-50">
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-500 transition-all duration-75 ease-out shadow-[0_0_8px_rgba(59,130,246,0.5)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}

function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  React.useEffect(() => {
    let ticking = false;
    let lastScrolledState = false;

    const updateHeaderHeight = () => {
      const topBar = document.querySelector("header > div:first-child") as HTMLElement;
      const navContainer = document.querySelector("nav > div.max-w-7xl") as HTMLElement;
      let height = 120;
      if (navContainer) {
        height = navContainer.offsetHeight;
        if (topBar && !topBar.classList.contains("max-h-0")) {
          height += topBar.offsetHeight;
        }
      } else {
        const header = document.querySelector("header");
        if (header) height = header.offsetHeight;
      }
      document.documentElement.style.setProperty(
        "--header-height",
        `${height}px`
      );
    };

    const handleScroll = () => {
      const currentlyScrolled = window.scrollY > 20;
      if (currentlyScrolled !== lastScrolledState) {
        lastScrolledState = currentlyScrolled;
        if (!ticking) {
          window.requestAnimationFrame(() => {
            setIsScrolled(currentlyScrolled);
            updateHeaderHeight();
            ticking = false;
          });
          ticking = true;
        }
      }
    };

    updateHeaderHeight();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateHeaderHeight, { passive: true });
    
    const timeoutId1 = setTimeout(updateHeaderHeight, 200);
    const timeoutId2 = setTimeout(updateHeaderHeight, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeaderHeight);
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
    };
  }, []);

  return (
    <header
      className={cn(
        "z-50 flex flex-col w-full transition-all duration-300",
        isHome
          ? isScrolled
            ? "fixed top-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-sm border-b border-gray-100/40 dark:border-gray-800/40"
            : "absolute top-0 bg-transparent"
          : "sticky top-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-sm border-b border-gray-100/40 dark:border-gray-800/40"
      )}
    >
      <div
        className={cn(
          "transition-all duration-300 overflow-hidden",
          isScrolled ? "max-h-0 opacity-0" : "max-h-[100px] opacity-100",
        )}
      >
        <TopInfoBar />
        <NewsTicker />
      </div>
      <Navbar isScrolled={isScrolled} />
      <ScrollProgressBar />
    </header>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    // Disable native browser scroll restoration to avoid interference
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (hash) {
      const id = hash.replace("#", "");
      let attempts = 0;
      const maxAttempts = 20; // Poll for up to 2 seconds (100ms * 20)
      
      const scrollToElement = () => {
        const el = document.getElementById(id);
        if (el) {
          setTimeout(() => {
            const rect = el.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const getActualHeaderHeight = () => {
              const topBar = document.querySelector("header > div:first-child") as HTMLElement;
              const navContainer = document.querySelector("nav > div.max-w-7xl") as HTMLElement;
              if (navContainer) {
                let height = navContainer.offsetHeight;
                if (topBar && !topBar.classList.contains("max-h-0")) {
                  height += topBar.offsetHeight;
                }
                return height;
              }
              return document.querySelector("header")?.offsetHeight || 120;
            };
            const headerHeight = getActualHeaderHeight();
            window.scrollTo({
              top: rect.top + scrollTop - headerHeight,
              behavior: "smooth"
            });
          }, 50);
          return true;
        }
        return false;
      };

      if (!scrollToElement()) {
        const intervalId = setInterval(() => {
          attempts++;
          if (scrollToElement() || attempts >= maxAttempts) {
            clearInterval(intervalId);
          }
        }, 100);
        return () => clearInterval(intervalId);
      }
    } else {
      // Scroll immediately
      window.scrollTo(0, 0);
      
      // Also schedule a secondary scroll check to defeat lazy-loading race conditions
      const timerId = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 80);
      
      return () => clearTimeout(timerId);
    }
  }, [pathname, hash]);

  return null;
}

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 animate-pulse">
          Loading standard solutions...
        </p>
      </div>
    </div>
  );
}

function VersionChecker() {
  React.useEffect(() => {
    // Only run cache-busting checks in production environment
    if (import.meta.env.DEV) return;

    async function checkVersion() {
      try {
        const res = await fetch(`/version.json?t=${Date.now()}`);
        if (!res.ok) return;

        const data = await res.json();
        const serverVersion = String(data.version);

        let localVersion = "";
        try {
          // @ts-expect-error - injected by Vite define
          localVersion = String(__APP_VERSION__);
        } catch (e) {
          return;
        }

        if (localVersion && serverVersion && localVersion !== serverVersion) {
          console.log(
            `[VersionChecker] New version detected: server=${serverVersion}, local=${localVersion}. Reloading...`,
          );

          if ("serviceWorker" in navigator) {
            try {
              const registrations =
                await navigator.serviceWorker.getRegistrations();
              for (const registration of registrations) {
                await registration.unregister();
              }
            } catch (err) {
              console.warn("SW unregister failed:", err);
            }
          }

          if ("caches" in window) {
            try {
              const keys = await window.caches.keys();
              await Promise.all(keys.map((key) => window.caches.delete(key)));
            } catch (err) {
              console.warn("Cache clear failed:", err);
            }
          }

          // Force reload to grab latest assets from server
          window.location.reload();
        }
      } catch (err) {
        console.warn("Failed to fetch/compare version metadata:", err);
      }
    }

    // Check immediately on load
    checkVersion();

    // Check periodically every 5 minutes in background
    const timer = setInterval(checkVersion, 300000);

    return () => clearInterval(timer);
  }, []);

  return null;
}

function DynamicSEOMetadata() {
  const location = useLocation();
  const path = location.pathname;

  // Remove leading slash to get the slug
  const slug = path.replace(/^\//, "");
  const serviceConfig = SEO_PAGES_DATA[slug];

  let title =
    "Premium Valet Parking & Corporate Housekeeping Services in Hyderabad | ESS";
  let description =
    "Premium valet parking management, professional corporate housekeeping, deep cleaning, CCTV surveillance, and facility solutions in Hyderabad. Certified staff and tailored service agreements.";
  let keywords =
    "facility management hyderabad, corporate housekeeping hyderabad, office cleaning services hyderabad, valet parking management hyderabad, deep cleaning services hyderabad, cctv surveillance hyderabad, commercial housekeeping services";
  let canonical = "https://expertstandardsolution.com/";
  let ogTitle =
    "Premium Valet Parking & Corporate Housekeeping Services in Hyderabad | ESS";
  let ogDescription =
    "Premium commercial cleaning, corporate facility management, and professional valet parking management services in Hyderabad. ISO certified delivery, tailored SLAs, and professional staff.";

  if (serviceConfig) {
    title = serviceConfig.metaTitle;
    description = serviceConfig.metaDescription;
    keywords = serviceConfig.keywords.join(", ");
    canonical = `https://expertstandardsolution.com/${serviceConfig.slug}`;
    ogTitle = serviceConfig.metaTitle;
    ogDescription = serviceConfig.metaDescription;
  } else if (path === "/careers") {
    title =
      "Careers at Expert Standard Solution | Join Hyderabad's Premium Facility Team";
    description =
      "Join ESS, Hyderabad's leading facility management agency. Explore career opportunities, apply for operations, management, or field executive roles, and grow with us.";
    keywords =
      "ess careers, jobs in hyderabad, facility management jobs, office staff jobs hyderabad, office boys hiring hyderabad";
    canonical = "https://expertstandardsolution.com/careers";
    ogTitle = "Careers | Expert Standard Solution";
    ogDescription =
      "Join ESS, Hyderabad's leading facility management agency. Explore dynamic career opportunities and grow with us.";
  } else if (path === "/privacy") {
    title = "Privacy Policy | Expert Standard Solution";
    description =
      "Read our privacy policy to understand how Expert Standard Solution (ESS) collects, protects, and handles your personal data.";
    keywords =
      "privacy policy, data protection, security, expert standard solution";
    canonical = "https://expertstandardsolution.com/privacy";
    ogTitle = "Privacy Policy | Expert Standard Solution";
    ogDescription =
      "Our commitment to protecting your personal data and securing client privacy.";
  } else if (path === "/terms") {
    title = "Terms & Conditions | Expert Standard Solution";
    description =
      "Review the terms of service and business agreements for clients and partners of Expert Standard Solution.";
    keywords =
      "terms and conditions, user agreement, expert standard solution, terms of service";
    canonical = "https://expertstandardsolution.com/terms";
    ogTitle = "Terms & Conditions | Expert Standard Solution";
    ogDescription =
      "Review the terms of service and business agreements for Expert Standard Solution.";
  } else if (path === "/admin") {
    title = "Admin Dashboard | Expert Standard Solution";
    description =
      "Secure administration panel for managing service inquiries, client logs, and operational alerts.";
    keywords = "admin, dashboard, client management, expert standard solution";
    canonical = "https://expertstandardsolution.com/admin";
    ogTitle = "Admin Dashboard | Expert Standard Solution";
    ogDescription =
      "Secure administration panel for managing service inquiries.";
  } else if (path === "/seo") {
    title = "Google Search Ranking & SEO Optimizer Dashboard | ESS";
    description =
      "Audit, plan, and optimize Expert Standard Solution for top rankings on Google. Real-time Google Search Result previewer, sitemap validators, and schema markup generator.";
    keywords =
      "seo dashboard, google rankings, rank optimizer, hyderabad search optimization";
    canonical = "https://expertstandardsolution.com/seo";
    ogTitle = "Google Search Ranking & SEO Optimizer Dashboard | ESS";
    ogDescription =
      "Audit, plan, and optimize Expert Standard Solution for top rankings on Google.";
  } else if (path === "/sitemap") {
    title = "Sitemap | Expert Standard Solution";
    description =
      "Access the complete sitemap for Expert Standard Solution. Easily browse our corporate housekeeping, valet parking, and facility management services in Hyderabad.";
    keywords =
      "sitemap, expert standard solution, facility management hyderabad, site directory, all services index";
    canonical = "https://expertstandardsolution.com/sitemap";
    ogTitle = "Sitemap | Expert Standard Solution";
    ogDescription =
      "Complete site directory for Expert Standard Solution. Browse all available corporate facilities and parking services.";
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta
        property="og:image"
        content="https://res.cloudinary.com/deed9nqtg/image/upload/v1782989113/ESSfinalone_zdxt3v.png"
      />
      <meta property="og:site_name" content="Expert Standard Solution" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content="https://res.cloudinary.com/deed9nqtg/image/upload/v1782989113/ESSfinalone_zdxt3v.png"
      />

      {/* Robots */}
      <meta
        name="robots"
        content={path === "/admin" ? "noindex, nofollow" : "index, follow"}
      />
    </Helmet>
  );
}

function getDynamicBasename() {
  if (import.meta.env.DEV) return "/";

  if (window.location.hostname.endsWith(".github.io")) {
    const repo = window.location.pathname.split("/")[1];
    return repo ? `/${repo}` : "/";
  }
  return "/";
}

export default function Layout() {
  React.useEffect(() => {
    // Dismiss and clean up the initial loading wrapper as soon as React starts mounting
    const loader = document.getElementById("initial-loader");
    if (loader) {
      loader.style.transition = "opacity 0.4s ease";
      loader.style.opacity = "0";
      const timer = setTimeout(() => {
        loader.remove();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <HelmetProvider>
      <LanguageProvider>
        <ThemeProvider>
          <HashRouter>
            <VersionChecker />
            <DynamicSEOMetadata />
            <ScrollToTop />
            <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-gray-50 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300 pb-14 md:pb-0">
              <Header />
              <main className="flex-grow">
                <React.Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<Dashboard />} />
                    <Route path="/seo" element={<SeoDashboard />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsConditions />} />
                    <Route path="/sitemap" element={<Sitemap />} />
                    <Route
                      path="/housekeeping-services-hyderabad"
                      element={
                        <SeoServicePage slug="housekeeping-services-hyderabad" />
                      }
                    />
                    <Route
                      path="/deep-cleaning-services-hyderabad"
                      element={
                        <SeoServicePage slug="deep-cleaning-services-hyderabad" />
                      }
                    />
                    <Route
                      path="/valet-parking-services-hyderabad"
                      element={
                        <SeoServicePage slug="valet-parking-services-hyderabad" />
                      }
                    />
                    <Route
                      path="/facade-cleaning-services-hyderabad"
                      element={
                        <SeoServicePage slug="facade-cleaning-services-hyderabad" />
                      }
                    />
                    <Route
                      path="/cctv-monitoring-services-hyderabad"
                      element={
                        <SeoServicePage slug="cctv-monitoring-services-hyderabad" />
                      }
                    />
                    <Route
                      path="/access-control-services-hyderabad"
                      element={
                        <SeoServicePage slug="access-control-services-hyderabad" />
                      }
                    />
                    <Route
                      path="/pest-control-services-hyderabad"
                      element={
                        <SeoServicePage slug="pest-control-services-hyderabad" />
                      }
                    />
                    <Route
                      path="/manpower-supply-services-hyderabad"
                      element={
                        <SeoServicePage slug="manpower-supply-services-hyderabad" />
                      }
                    />
                    <Route
                      path="/hotel-valet-services-hyderabad"
                      element={
                        <SeoServicePage slug="hotel-valet-services-hyderabad" />
                      }
                    />
                    <Route
                      path="/corporate-valet-services-hyderabad"
                      element={
                        <SeoServicePage slug="corporate-valet-services-hyderabad" />
                      }
                    />
                    <Route
                      path="/restaurant-valet-services-hyderabad"
                      element={
                        <SeoServicePage slug="restaurant-valet-services-hyderabad" />
                      }
                    />
                    <Route
                      path="/event-valet-services-hyderabad"
                      element={
                        <SeoServicePage slug="event-valet-services-hyderabad" />
                      }
                    />
                    <Route
                      path="/apartment-valet-services-hyderabad"
                      element={
                        <SeoServicePage slug="apartment-valet-services-hyderabad" />
                      }
                    />
                  </Routes>
                </React.Suspense>
              </main>
              <Footer />
              <ScrollToTopButton />
              <WhatsAppButton />
              <MobileStickyDock />
              <SearchModal />
              <CookieBanner />
            </div>
          </HashRouter>
        </ThemeProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}
