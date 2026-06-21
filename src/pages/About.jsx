import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  const chefs = [
    {
      name: 'Chef Marcus',
      initials: 'CM',
      bg: '#F58F20',
      role: 'Executive Chef & Founder',
      bio: 'With over 15 years in Michelin-starred kitchens, Marcus loves bringing complex gourmet flavors to home cooks.'
    },
    {
      name: 'Elena Rostova',
      initials: 'ER',
      bg: '#467434',
      role: 'Pastry Chef & Spice Consultant',
      bio: 'Elena specializes in natural sourdough fermentation, world cuisines, and layering exotic spices.'
    },
    {
      name: 'Sarah Baker',
      initials: 'SB',
      bg: '#013E37',
      role: 'Head of Recipe Research',
      bio: 'Sarah tests every single recipe in our test kitchen, adjusting ratios to guarantee fail-proof cooking.'
    }
  ];

  const values = [
    {
      icon: '🌿',
      title: 'Fresh Ingredients',
      description: 'We believe clean, seasonal, and fresh ingredients are the ultimate building blocks of delicious healthy eating.'
    },
    {
      icon: '👨‍🍳',
      title: 'Expert Recipes',
      description: 'Every recipe is extensively tested, double-checked, and simplified by real chefs for home kitchen success.'
    },
    {
      icon: '❤️',
      title: 'Made With Love',
      description: 'Food is connection. We write our guides and share our passion to make your kitchen a place of comfort and joy.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="pt-16 min-h-screen bg-[#FFFDF0]"
    >
      {/* 1. HERO SECTION */}
      <section className="bg-[#013E37] text-[#FFEFB3] py-20 px-4 text-center shadow-[inset_0_-8px_16px_rgba(0,0,0,0.1)]">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          <h1 className="font-display font-black text-4xl md:text-6xl select-none leading-none">
            We Cook With Love
          </h1>
          <p className="font-sans text-base md:text-lg text-[#FFEFB3]/80 max-w-2xl mx-auto leading-relaxed">
            FlavorNest was born from a simple belief: anyone can cook delicious food when given clean instructions, authentic culinary tips, and a dash of kitchen confidence. We are a team of dedicated chefs writing recipes to help you build cooking habits that feed your soul.
          </p>
        </div>
      </section>

      {/* 2. TEAM SECTION */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="font-display font-black text-3xl md:text-4xl text-[#013E37] text-center mb-12 select-none">
          Meet Our Chefs
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {chefs.map((chef, idx) => (
            <motion.div
              key={chef.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="clay-card p-6 flex flex-col items-center text-center gap-4 bg-[#FFF8D6]"
            >
              {/* Circular Avatar */}
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center text-white font-display font-bold text-2xl border-4 border-white shadow-[0_4px_0_0_rgba(1,62,55,0.15)] select-none"
                style={{ backgroundColor: chef.bg }}
              >
                {chef.initials}
              </div>

              <div>
                <h3 className="font-display font-bold text-xl text-[#013E37]">{chef.name}</h3>
                <p className="font-body text-xs text-[#F58F20] font-semibold mt-0.5">{chef.role}</p>
              </div>

              <p className="font-body text-sm text-[#5C5C3D] leading-relaxed">
                {chef.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. VALUES SECTION (bg-card) */}
      <section className="bg-[#FFF8D6] py-20 px-4 border-y-2 border-[#D4C97A]/40">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-black text-3xl md:text-4xl text-[#013E37] text-center mb-12 select-none">
            Our Core Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, idx) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="bg-[#FFFDF0] rounded-3xl p-6 border-2 border-[#D4C97A]/50 shadow-[0_6px_0_0_rgba(1,62,55,0.08),inset_0_2px_0_rgba(255,255,255,0.8)] flex flex-col gap-3 text-left"
              >
                <span className="text-4xl select-none">{v.icon}</span>
                <h3 className="font-display font-bold text-xl text-[#013E37]">{v.title}</h3>
                <p className="font-body text-sm text-[#5C5C3D] leading-relaxed">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. STATS ROW (bg-tangerine) */}
      <section className="bg-[#F58F20] py-16 px-4 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center select-none">
          <div className="flex flex-col gap-1">
            <span className="font-display font-black text-4xl md:text-5xl">500+</span>
            <span className="font-body text-xs md:text-sm text-white/80 uppercase tracking-wider font-semibold">Handmade Recipes</span>
          </div>
          <div className="flex flex-col gap-1 border-l border-white/20 md:border-l-0">
            <span className="font-display font-black text-4xl md:text-5xl">50K+</span>
            <span className="font-body text-xs md:text-sm text-white/80 uppercase tracking-wider font-semibold">Happy Cooks Daily</span>
          </div>
          <div className="flex flex-col gap-1 border-t border-white/20 pt-8 md:pt-0 md:border-t-0 md:border-l border-white/20">
            <span className="font-display font-black text-4xl md:text-5xl">25+</span>
            <span className="font-body text-xs md:text-sm text-white/80 uppercase tracking-wider font-semibold">Global Cuisines</span>
          </div>
          <div className="flex flex-col gap-1 border-t border-white/20 pt-8 md:pt-0 md:border-t-0 md:border-l border-white/20">
            <span className="font-display font-black text-4xl md:text-5xl">4.9★</span>
            <span className="font-body text-xs md:text-sm text-white/80 uppercase tracking-wider font-semibold">User Rating</span>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
