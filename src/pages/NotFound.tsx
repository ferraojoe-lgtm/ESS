import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { FileQuestion, Home, Map, PhoneCall, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 py-16 transition-colors duration-300">
      <Helmet>
        <title>404 - Page Not Found | Expert Standard Solution</title>
        <meta name="description" content="The page you are looking for might have been moved, renamed, or is temporarily unavailable. Return home or browse our sitemap." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-xl w-full text-center bg-white dark:bg-gray-900 rounded-3xl p-8 sm:p-12 border border-gray-100 dark:border-gray-800 shadow-xl"
      >
        <div className="w-20 h-20 bg-blue-50 dark:bg-blue-950/60 rounded-3xl flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
          <FileQuestion className="w-10 h-10" />
        </div>

        <span className="inline-block px-3 py-1 bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-red-200 dark:border-red-900/40">
          Error 404
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
          Page Not Found
        </h1>

        <p className="text-gray-600 dark:text-gray-400 text-base mb-8 leading-relaxed">
          The link you followed may be broken or the page may have been removed. Don't worry, you can easily find what you need using the options below.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all duration-300 shadow-lg shadow-blue-600/20 hover:scale-[1.02]"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            to="/sitemap"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold text-sm transition-all duration-300"
          >
            <Map className="w-4 h-4 text-blue-500" />
            <span>Browse Sitemap</span>
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
          <span>Need immediate assistance?</span>
          <a href="tel:+917386843005" className="text-blue-600 dark:text-blue-400 font-bold hover:underline inline-flex items-center gap-1">
            <PhoneCall className="w-3 h-3" /> +91 73868 43005
          </a>
        </div>
      </motion.div>
    </div>
  );
}
