import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OfflineToast() {
  const [status, setStatus] = useState(null); // 'online' | 'offline' | null

  useEffect(() => {
    const handleOnline = () => {
      setStatus('online');
      // Auto-dismiss the online toast after 3 seconds
      const timer = setTimeout(() => {
        setStatus(null);
      }, 3000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setStatus('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check (only set if offline initially, we don't need to spam "online" at start)
    if (!navigator.onLine) {
      setStatus('offline');
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {status && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 15 }}
          className={`fixed bottom-6 left-6 z-50 font-sans font-medium px-6 py-4 rounded-2xl shadow-[0_8px_16px_rgba(1,62,55,0.15)] flex items-center gap-3 border ${
            status === 'offline'
              ? 'bg-[#363636] text-[#FFEFB3] border-[#5C5C3D]'
              : 'bg-[#467434] text-white border-[#D4C97A]/20'
          }`}
        >
          {status === 'offline' ? (
            <>
              <span className="text-xl">📡</span>
              <span>You're offline — saved recipes still available</span>
            </>
          ) : (
            <>
              <span className="text-xl">✅</span>
              <span>Back online!</span>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
