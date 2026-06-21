import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Check } from 'lucide-react';

export default function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const newsletterSubmitted = useStore((state) => state.newsletterSubmitted);
  const submitNewsletter = useStore((state) => state.submitNewsletter);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    submitNewsletter(email);
  };

  return (
    <section className="relative bg-[#F58F20] py-16 px-6 overflow-hidden rounded-[32px] my-12 mx-4 border-2 border-white/20 shadow-[0_12px_24px_rgba(245,143,32,0.25)] select-none">
      
      {/* FLOATING EMOJIS */}
      {/* Lemon 🍋 */}
      <div className="absolute top-8 left-8 text-4xl animate-float-fast pointer-events-none opacity-80 select-none">
        🍋
      </div>
      {/* Leaf 🌿 */}
      <div className="absolute bottom-8 left-1/4 text-4xl animate-float-slow pointer-events-none opacity-80 select-none">
        🌿
      </div>
      {/* Orange 🍊 */}
      <div className="absolute top-12 right-12 text-4xl pointer-events-none opacity-80 select-none" style={{ animation: 'float 4s ease-in-out infinite' }}>
        🍊
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10 flex flex-col gap-6">
        
        {/* Title */}
        <h2 className="font-display font-black text-3xl md:text-5xl text-white leading-tight">
          Get Weekly Recipes in Your Inbox
        </h2>
        
        {/* Subtitle */}
        <p className="font-body text-white/95 text-base md:text-lg max-w-xl mx-auto">
          Join our cooking community. No spam, no fluff. Just handpicked, delicious recipes and culinary secrets.
        </p>

        {/* Form or Success State */}
        {newsletterSubmitted ? (
          <div className="bg-[#FFF8D6] text-[#013E37] max-w-md mx-auto w-full p-6 rounded-2xl border-2 border-[#D4C97A] shadow-[0_6px_0_0_rgba(1,62,55,0.15)] flex flex-col items-center gap-2 animate-float-slow">
            <div className="w-12 h-12 rounded-full bg-[#467434] text-white flex items-center justify-center shadow-md">
              <Check size={24} />
            </div>
            <h4 className="font-display font-bold text-xl">🎉 You're in!</h4>
            <p className="font-body text-sm text-[#5C5C3D]">
              Check your inbox shortly for your first taste of FlavorNest.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto w-full flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-2xl px-4 py-3 bg-white text-[#2A2A2A] placeholder-gray-400 outline-none border-2 border-transparent focus:border-[#013E37] focus:ring-4 focus:ring-[#013E37]/15 transition-all text-sm flex-1 shadow-[inset_0_3px_8px_rgba(0,0,0,0.06)]"
              />
              <button
                type="submit"
                className="clay-btn bg-[#013E37] text-[#FFEFB3] font-semibold text-sm px-6 py-3 whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
            {error && (
              <p className="text-white text-xs font-bold bg-[#363636]/60 py-1.5 px-3 rounded-lg self-center">
                ⚠️ {error}
              </p>
            )}
          </form>
        )}

      </div>
    </section>
  );
}
