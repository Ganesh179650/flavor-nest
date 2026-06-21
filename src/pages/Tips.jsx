import React from 'react';
import { tips } from '../data/tips';
import TipCard from '../components/TipCard';
import { motion } from 'framer-motion';

export default function Tips() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="pt-16 min-h-screen bg-[#FFFDF0]"
    >
      {/* HEADER SECTION */}
      <header className="bg-[#467434] text-[#FFEFB3] py-16 px-4 text-center shadow-[inset_0_-8px_16px_rgba(0,0,0,0.1)]">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          <h1 className="font-display font-black text-4xl md:text-5xl">
            Kitchen Wisdom
          </h1>
          <p className="font-sans text-sm text-[#FFEFB3]/80 max-w-md mx-auto">
            Practical tips, techniques, and food hacks to elevate your daily cooking game.
          </p>
        </div>
      </header>

      {/* TIPS GRID SECTION */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tips.map((tip, index) => (
            <TipCard key={tip.id} tip={tip} index={index} />
          ))}
        </div>
      </main>
    </motion.div>
  );
}
