import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  Map,
  Building2,
  Car,
  Eye,
  Home,
  Briefcase,
  Shield,
  FileText,
  Search,
  CheckCircle2,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function Sitemap() {
  const categories = [
    {
      title: "Core Navigation",
      icon: Home,
      description: "Primary website pages and essential organizational hubs.",
      links: [
        { name: "Home / Overview", path: "/" },
        { name: "Careers & Join Us", path: "/careers" },
        { name: "Google SEO & Ranking Workspace", path: "/seo" },
      ],
    },
    {
      title: "Facility Management & Housekeeping",
      icon: Building2,
      description: "Professional cleaning, sanitization, and staffing solutions.",
      links: [
        { name: "Corporate Housekeeping", path: "/housekeeping-services-hyderabad" },
        { name: "Commercial Deep Cleaning", path: "/deep-cleaning-services-hyderabad" },
        { name: "High-Rise Facade Cleaning", path: "/facade-cleaning-services-hyderabad" },
        { name: "Certified Pest Control Services", path: "/pest-control-services-hyderabad" },
        { name: "Corporate Manpower Supply", path: "/manpower-supply-services-hyderabad" },
      ],
    },
    {
      title: "Premium Valet & Parking Solutions",
      icon: Car,
      description: "Seamless guest arrivals and professional driveway management.",
      links: [
        { name: "Valet Parking Services (General)", path: "/valet-parking-services-hyderabad" },
        { name: "Five-Star Hotel Valet Services", path: "/hotel-valet-services-hyderabad" },
        { name: "Corporate Office Valet Services", path: "/corporate-valet-services-hyderabad" },
        { name: "Premium Restaurant Valet Services", path: "/restaurant-valet-services-hyderabad" },
        { name: "Elite Event Valet Parking", path: "/event-valet-services-hyderabad" },
        { name: "Gated Apartment Valet Parking", path: "/apartment-valet-services-hyderabad" },
      ],
    },
    {
      title: "Surveillance & Smart Infrastructure",
      icon: Eye,
      description: "Advanced electronic protection and secure entry control systems.",
      links: [
        { name: "Live CCTV Monitoring & Surveillance", path: "/cctv-monitoring-services-hyderabad" },
        { name: "Biometric Access Control Systems", path: "/access-control-services-hyderabad" },
      ],
    },
    {
      title: "Legal & Information Guidelines",
      icon: Shield,
      description: "Our standards regarding user privacy, data security, and service agreements.",
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms & Conditions", path: "/terms" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-6 md:pt-10 pb-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <Helmet>
        <title>Sitemap | Expert Standard Solution</title>
        <meta
          name="description"
          content="Access the complete sitemap for Expert Standard Solution. Easily browse our corporate housekeeping, valet parking, and facility management services in Hyderabad."
        />
        <link rel="canonical" href="https://expertstandardsolution.com/sitemap" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">
            <Map className="w-4 h-4" /> Comprehensive Index
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
            Website Sitemap
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            A comprehensive, structural directory of all service modules, core
            landing platforms, policies, and operational sections offered by{" "}
            <strong className="font-bold text-blue-600 dark:text-blue-400">
              Expert Standard Solution (ESS)
            </strong>
            .
          </p>
        </motion.div>

        {/* Bento Grid Sitemap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {categories.map((category, catIdx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all flex flex-col h-full"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-2xl">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    {category.title}
                  </h2>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                  {category.description}
                </p>
                <ul className="space-y-3.5 flex-grow">
                  {category.links.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        onClick={() =>
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                        className="group flex items-center gap-2 text-[14px] text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-0.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 group-hover:bg-blue-500 transition-colors shrink-0" />
                        <span className="truncate group-hover:underline underline-offset-4">
                          {link.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* SEO & Search Crawler Benefit Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-950/20 rounded-3xl p-6 sm:p-8 border border-blue-100/50 dark:border-gray-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="max-w-2xl">
            <h3 className="text-base sm:text-lg font-bold text-gray-950 dark:text-white mb-2 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              SEO Optimized Link Directory
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              This HTML sitemap provides clean semantic anchor links directly to all
              secondary pages, allowing search bots to index our deep service hierarchy
              rapidly. It complies fully with modern schema recommendations and search visibility
              best practices for the Hyderabad metropolitan region.
            </p>
          </div>
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-full md:w-auto text-center px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-colors duration-200 shadow-md hover:shadow-lg shadow-blue-500/10 shrink-0"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
