import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CookieBanner() {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const consent = localStorage.getItem('ess_dpdp_consent');
    if (!consent) {
      // Small delay for smooth entry after page load
      const timer = setTimeout(() => setIsOpen(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('ess_dpdp_consent', 'accepted');
    setIsOpen(false);
  };

  const handleDecline = () => {
    localStorage.setItem('ess_dpdp_consent', 'declined');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 260, damping: 25 }}
          className="fixed bottom-6 left-4 right-4 md:left-6 md:right-auto md:max-w-md bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-2xl p-5 shadow-2xl z-[9999] transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl flex-shrink-0">
              <Shield className="w-5 h-5 animate-pulse" />
            </div>
            
            <div className="flex-grow min-w-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-sm font-bold text-gray-950 dark:text-white flex items-center gap-1.5">
                  DPDP Act 2023 Consent Notice
                </h3>
                <button
                  onClick={handleDecline}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1 -mt-1 -mr-1"
                  aria-label="Close Notice"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                In compliance with India's <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong>, Expert Standard Solution (Data Fiduciary) requests your voluntary consent to process minimal cookies and necessary technical metrics to optimize your website browsing and service quotes request. Learn more in our <Link to="/privacy" className="text-blue-600 dark:text-blue-400 underline font-medium" onClick={() => setIsOpen(false)}>Privacy Policy</Link>.
              </p>

              <div className="flex items-center justify-end gap-4">
                <button
                  onClick={handleAccept}
                  className="w-full px-4 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm hover:shadow transition-all text-center"
                >
                  Accept All Cookies
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
