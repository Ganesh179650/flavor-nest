import React from 'react';
import { motion } from 'framer-motion';

export default function CategoryPill({ name, emoji, isActive, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-24 h-28 rounded-[24px] border-2 transition-all duration-200 ${
        isActive
          ? 'bg-[#F58F20] border-[#F58F20] text-white shadow-[0_8px_0_0_rgba(0,0,0,0.25),0_12px_24px_rgba(245,143,32,0.3),inset_0_2px_0_rgba(255,255,255,0.4)]'
          : 'bg-[#FFF8D6] border-[#013E37]/20 text-[#013E37] shadow-[0_6px_0_0_rgba(1,62,55,0.1),0_8px_16px_rgba(1,62,55,0.06),inset_0_2px_0_rgba(255,255,255,0.8)]'
      }`}
    >
      <span className="text-3xl mb-2 select-none">{emoji}</span>
      <span className="font-sans font-bold text-xs text-center leading-tight">
        {name}
      </span>
    </motion.button>
  );
}
