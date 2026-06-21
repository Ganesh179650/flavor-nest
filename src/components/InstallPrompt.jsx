import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share, Download, Monitor, CheckCircle, Smartphone } from 'lucide-react';

export default function InstallPrompt() {
  const [showButton, setShowButton] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showManualGuide, setShowManualGuide] = useState(false);

  useEffect(() => {
    // Detect mobile screen
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Detect iOS
    const detectIOS = () => {
      const userAgent = window.navigator.userAgent || '';
      const isApple = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
      const isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
      return isApple && !isStandalone;
    };

    const ios = detectIOS();
    setIsIOS(ios);

    const isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;

    // Show the floating button in top-right after a short delay if not already in standalone mode
    if (!isStandalone) {
      const timer = setTimeout(() => {
        setShowButton(true);
      }, 1000);
      return () => clearTimeout(timer);
    }

    // Capture browser PWA trigger event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true); // Always show button if PWA is supported and installable
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsOpen(false);
        setShowButton(false);
        setDeferredPrompt(null);
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 4000);
      }
    } else {
      setShowManualGuide(true);
    }
  };

  const handleFloatingButtonClick = async () => {
    if (deferredPrompt) {
      // Trigger native browser install directly without showing the custom modal
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowButton(false);
        setDeferredPrompt(null);
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 4000);
      }
    } else {
      // If no native prompt is available (like on iOS or Safari), open the manual guide modal
      setIsOpen(true);
      setShowManualGuide(true);
    }
  };

  const handleDismiss = () => {
    setIsOpen(false);
    setTimeout(() => setShowManualGuide(false), 300);
  };

  return (
    <>
      {/* 1. SMALL TINY FLOATING INSTALL BUTTON (Top Right Corner below Navbar) */}
      <AnimatePresence>
        {showButton && !isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.5 }}
            className="fixed top-20 right-4 z-40"
          >
            <div className="relative group">
              {/* Pulsing ring animation */}
              <span className="absolute -inset-1 rounded-full bg-[#F58F20] opacity-45 blur-sm animate-ping pointer-events-none" />
              
              <button
                onClick={handleFloatingButtonClick}
                aria-label="Install web application"
                className="w-10 h-10 rounded-full bg-[#F58F20] text-white border-2 border-white shadow-[0_4px_0_0_rgba(1,62,55,0.25),inset_0_2px_0_rgba(255,255,255,0.4)] flex items-center justify-center hover:scale-110 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 transition-all select-none"
              >
                <Download size={16} className="animate-bounce" />
              </button>

              {/* Hover Tooltip */}
              <div className="absolute right-12 top-1/2 -translate-y-1/2 bg-[#013E37] text-[#FFEFB3] text-[10px] font-sans font-bold py-1 px-2.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-md whitespace-nowrap border border-[#D4C97A]/20">
                Install App 📲
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. THE DETAILED MODAL/BOTTOM SHEET (triggered from the button) */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleDismiss}
              className="absolute inset-0 bg-[#013E37]/65 backdrop-blur-sm"
            />

            {/* Mobile Bottom Sheet Layout */}
            {isMobile ? (
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                drag="y"
                dragConstraints={{ top: 0 }}
                dragElastic={0.15}
                onDragEnd={(e, info) => {
                  if (info.offset.y > 80) {
                    handleDismiss();
                  }
                }}
                className="absolute bottom-0 left-0 right-0 max-h-[90vh] bg-[#FFF8D6] border-t-4 border-[#D4C97A] rounded-t-[36px] p-6 shadow-[0_-10px_35px_rgba(1,62,55,0.18)] z-10 flex flex-col items-center select-none"
              >
                <div className="w-12 h-1.5 bg-[#013E37]/15 rounded-full mb-6" />

                <div className="w-16 h-16 bg-[#013E37] rounded-2xl flex items-center justify-center text-3xl shadow-lg border border-white/20 mb-4">
                  🍃
                </div>

                <h3 className="font-display font-black text-2xl text-[#013E37] mb-1.5 text-center">
                  Install FlavorNest App
                </h3>
                
                <p className="font-body text-[#5C5C3D] text-xs text-center mb-6 max-w-xs leading-relaxed">
                  Save to your home screen for rapid loading, offline recipe lookup, and fullscreen cooking experience.
                </p>

                {isIOS ? (
                  <div className="w-full bg-[#FFFDF0] border-2 border-[#D4C97A]/40 rounded-2xl p-4 text-xs text-[#2A2A2A] mb-5 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 bg-[#F58F20] text-white rounded-full flex items-center justify-center font-bold text-[10px]">1</span>
                      <span>Tap Safari's share icon <span className="inline-block p-1 bg-gray-100 rounded-md"><Share size={12} className="inline text-[#013E37]" /></span> at the bottom</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 bg-[#F58F20] text-white rounded-full flex items-center justify-center font-bold text-[10px]">2</span>
                      <span>Choose <strong className="font-bold">"Add to Home Screen" ✚</strong></span>
                    </div>
                  </div>
                ) : showManualGuide ? (
                  <div className="w-full bg-[#FFFDF0] border-2 border-[#D4C97A]/40 rounded-2xl p-4 text-xs text-[#2A2A2A] mb-5 flex flex-col gap-3 text-left">
                    <h4 className="font-bold text-[#013E37] text-center border-b border-[#D4C97A]/20 pb-1.5">How to Install Manually</h4>
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 bg-[#467434] text-white rounded-full flex items-center justify-center font-bold text-[10px] mt-0.5">1</span>
                      <span>Tap your browser menu icon (three dots <strong className="font-bold">⋮</strong> or lines)</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 bg-[#467434] text-white rounded-full flex items-center justify-center font-bold text-[10px] mt-0.5">2</span>
                      <span>Select <strong className="font-bold">"Install App"</strong> or <strong className="font-bold">"Add to Home Screen"</strong></span>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleInstallClick}
                    className="w-full clay-btn py-4 mb-4 text-sm font-black tracking-wide flex items-center justify-center gap-2 relative overflow-hidden"
                  >
                    <Download size={16} />
                    <span>INSTALL NOW</span>
                  </button>
                )}

                <button
                  onClick={handleDismiss}
                  className="text-xs font-bold text-[#5C5C3D] hover:text-[#013E37] transition-colors py-2"
                >
                  Maybe Later
                </button>
              </motion.div>
            ) : (
              // Desktop Modal Layout
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', damping: 22, stiffness: 280 }}
                className="w-full max-w-[390px] bg-[#FFF8D6] border-4 border-[#D4C97A] rounded-[32px] p-6 shadow-[0_12px_24px_rgba(1,62,55,0.18),inset_0_2px_0_rgba(255,255,255,0.7)] z-10 relative flex flex-col items-center text-center"
              >
                <button
                  onClick={handleDismiss}
                  className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#013E37]/5 text-[#5C5C3D] hover:text-[#013E37] transition-colors"
                >
                  <X size={18} />
                </button>

                <div className="w-16 h-16 bg-[#013E37] rounded-2xl flex items-center justify-center text-3xl shadow-lg border border-white/20 mb-5 mt-2">
                  🍃
                </div>

                <h3 className="font-display font-black text-2xl text-[#013E37] mb-2 leading-tight">
                  Install FlavorNest App
                </h3>
                
                <p className="font-body text-[#5C5C3D] text-xs leading-relaxed mb-6 px-2">
                  Install this web app on your device for quick cooking lookups, faster load times, and custom fullscreen mode.
                </p>

                {showManualGuide ? (
                  <div className="w-full bg-[#FFFDF0] border-2 border-[#D4C97A]/40 rounded-2xl p-4 text-xs text-[#2A2A2A] mb-5 flex flex-col gap-2.5 text-left">
                    <h4 className="font-bold text-[#013E37] text-center border-b border-[#D4C97A]/20 pb-1">Manual Installation Guide</h4>
                    <div className="flex items-center gap-2">
                      <Monitor size={14} className="text-[#F58F20] flex-shrink-0" />
                      <span>Click the install icon in the URL address bar, or:</span>
                    </div>
                    <div className="flex items-start gap-2.5 pl-2 mt-1">
                      <span className="w-4 h-4 bg-[#467434] text-white rounded-full flex items-center justify-center font-bold text-[9px] mt-0.5">1</span>
                      <span>Click the browser menu <strong className="font-bold">⋮</strong> (or share icon)</span>
                    </div>
                    <div className="flex items-start gap-2.5 pl-2">
                      <span className="w-4 h-4 bg-[#467434] text-white rounded-full flex items-center justify-center font-bold text-[9px] mt-0.5">2</span>
                      <span>Select <strong className="font-bold">"Save / Install App"</strong></span>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleInstallClick}
                    className="w-full clay-btn py-3 mb-4 text-xs font-black tracking-wide flex items-center justify-center gap-2"
                  >
                    <Download size={14} />
                    <span>INSTALL NOW</span>
                  </button>
                )}

                <button
                  onClick={handleDismiss}
                  className="text-xs font-bold text-[#5C5C3D] hover:text-[#013E37] transition-colors"
                >
                  Maybe Later
                </button>
              </motion.div>
            )}

          </div>
        )}
      </AnimatePresence>

      {/* Success Install Toast */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ y: 60, opacity: 0, x: '-50%' }}
            animate={{ y: 0, opacity: 1, x: '-50%' }}
            exit={{ y: 60, opacity: 0, x: '-50%' }}
            transition={{ type: 'spring', damping: 15 }}
            className="fixed bottom-6 left-1/2 z-50 bg-[#467434] text-white font-sans font-bold text-sm px-6 py-3.5 rounded-full shadow-xl flex items-center gap-2 border border-white/20 select-none"
          >
            <CheckCircle size={18} />
            <span>FlavorNest successfully installed! Find it on your home screen.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
