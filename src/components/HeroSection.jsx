import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function HeroSection() {
  const navigate = useNavigate();

  // Floating animations
  const floatAnim1 = {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const floatAnim2 = {
    y: [0, -5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 0.5
    }
  };

  return (
    <section className="relative bg-[#FFFDF0] pt-24 pb-16 px-4 overflow-hidden min-h-[85vh] flex items-center">
      
      {/* BACKGROUND DECORATIONS (Clay Blobs) */}
      {/* Tangerine Blob */}
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-12 -left-12 w-64 h-64 md:w-96 md:h-96 pointer-events-none z-0 opacity-15 text-[#F58F20]"
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current">
          <path d="M43.7,-74C56.6,-66.9,67,-56,74.9,-42.8C82.7,-29.6,87.9,-14.8,87.7,-0.1C87.5,14.6,81.9,29.1,73.5,41.4C65.2,53.7,54,63.6,40.9,71.2C27.7,78.8,13.9,84.1,-0.7,85.2C-15.3,86.4,-30.5,83.4,-44.1,76.2C-57.7,69,-69.6,57.7,-77.2,43.9C-84.8,30.1,-88.2,15,-87.3,0.5C-86.4,-14,-81.2,-28,-73.2,-40C-65.2,-52.1,-54.4,-62.3,-41.8,-69.7C-29.2,-77.1,-14.6,-81.7,0.3,-82.2C15.2,-82.7,30.7,-81.1,43.7,-74Z" transform="translate(100 100)" />
        </svg>
      </motion.div>

      {/* Leaf Blob */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/2 -right-20 w-80 h-80 pointer-events-none z-0 opacity-12 text-[#467434]"
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-current">
          <path d="M49,-75.6C62.7,-68.8,72.6,-53.4,77.7,-36.8C82.8,-20.2,83.1,-2.3,79.5,14.3C76,30.9,68.7,46.1,56.9,56.9C45.1,67.7,28.8,74,11.8,76.8C-5.2,79.6,-22.8,79,-38.7,72.7C-54.6,66.4,-68.8,54.4,-76.3,39C-83.8,23.5,-84.6,4.6,-80.7,-12.8C-76.9,-30.2,-68.4,-46.1,-55.5,-53C-42.6,-59.9,-25.2,-57.8,-8.7,-59.5C7.9,-61.2,23.7,-66.6,37.2,-73C40.6,-74.6,44.9,-77.3,49,-75.6Z" transform="translate(100 100)" />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Column: Headline and CTAs */}
        <div className="flex flex-col gap-6 text-left max-w-xl">
          
          {/* Eyebrow label */}
          <div className="self-start bg-[#467434] text-white px-4 py-1.5 rounded-full shadow-[0_4px_0_rgba(0,0,0,0.15)] flex items-center justify-center">
            <span className="font-script text-lg tracking-wider">🌿 Fresh Recipes Daily</span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-black text-5xl md:text-7xl text-[#013E37] leading-[1.08] select-none">
            Cook with <br />
            Passion &amp; <br />
            <motion.span 
              className="text-[#F58F20] italic inline-block font-display"
              initial={{ rotate: -2 }}
              animate={{ rotate: [2, -2, 2] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            >
              Flavor
            </motion.span>
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-[#5C5C3D] text-lg leading-relaxed md:text-xl">
            Discover 100+ recipes from around the world — from quick weeknight dinners to weekend feasts. No account needed, just pure taste.
          </p>

          {/* Buttons Row */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <button
              onClick={() => navigate('/recipes')}
              className="clay-btn text-base px-8 py-3.5"
            >
              Explore Recipes →
            </button>
            <button
              onClick={() => navigate('/tips')}
              className="clay-btn-ghost text-base px-8 py-3.5"
            >
              Watch Tips ▶
            </button>
          </div>

          {/* Trust Row */}
          <div className="border-t border-[#D4C97A]/40 pt-6 mt-4 flex flex-wrap items-center gap-y-2 gap-x-4 text-sm font-body text-[#5C5C3D]">
            <span>⭐ 4.9 Avg Rating</span>
            <span>·</span>
            <span>🍽 500+ Handpicked Recipes</span>
            <span>·</span>
            <span>👨‍🍳 50K Happy Cooks Daily</span>
          </div>
        </div>

        {/* Right Column: Hero Graphic (Mini Recipe Card & Floating Badges) */}
        <div className="flex justify-center relative py-10 lg:py-0">
          
          {/* Outer floating Container for absolute cards */}
          <div className="relative w-80 sm:w-85 z-10">
            
            {/* Main Featured Mini Recipe Preview Card */}
            <div className="clay-card overflow-hidden bg-[#FFF8D6] shadow-[0_12px_24px_rgba(1,62,55,0.15)] max-w-full">
              {/* Gradient background with emoji */}
              <div 
                className="h-48 flex items-center justify-center text-7xl rounded-t-3xl"
                style={{ background: 'linear-gradient(135deg, #F58F20 0%, #FFB347 40%, #FFF8D6 100%)' }}
              >
                🍗
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex gap-2 mb-2">
                  <span className="bg-[#F58F20] text-white text-[10px] font-sans font-bold px-3 py-0.5 rounded-full shadow-[0_2px_0_rgba(0,0,0,0.12)]">
                    Featured
                  </span>
                  <span className="bg-[#467434] text-white text-[10px] font-sans font-bold px-3 py-0.5 rounded-full shadow-[0_2px_0_rgba(0,0,0,0.12)]">
                    Indian
                  </span>
                </div>
                
                <h3 className="font-display font-bold text-2xl text-[#013E37] leading-tight mb-2">
                  Creamy Butter Chicken
                </h3>

                <div className="flex items-center gap-1 text-xs text-[#2A2A2A] mb-4">
                  <div className="flex text-[#F58F20]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-current" />
                    ))}
                  </div>
                  <span className="font-bold ml-1">4.8</span>
                  <span className="text-[#5C5C3D]">(234 reviews)</span>
                </div>

                <button
                  onClick={() => navigate('/recipes/butter-chicken')}
                  className="w-full clay-btn py-2.5 text-sm"
                >
                  View Recipe
                </button>
              </div>
            </div>


            {/* Overlapping Floating Card 2: Chef's Pick (top-right) */}
            <motion.div
              animate={floatAnim2}
              className="absolute -top-6 -right-8 bg-[#F58F20] text-white border-2 border-white rounded-2xl py-2.5 px-4 shadow-[0_6px_12px_rgba(1,62,55,0.15)] flex items-center gap-2 z-20 select-none cursor-default"
            >
              <span className="text-lg">🌟</span>
              <span className="font-sans font-bold text-sm tracking-wide">Chef's Pick</span>
            </motion.div>

          </div>

          {/* Decorative clay blobs around right graphic */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none z-0">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-[#F58F20] opacity-5">
              <path d="M30,-40C40,-30,50,-20,50,-10C50,0,40,10,30,20C20,30,10,40,0,40C-10,40,-20,30,-30,20C-40,10,-50,0,-50,-10C-50,-20,-40,-30,-30,-40C-20,-50,-10,-50,0,-50C10,-50,20,-50,30,-40Z" transform="translate(50 50)" />
            </svg>
          </div>

        </div>

      </div>
    </section>
  );
}
