import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function TipCard({ tip, index }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="clay-card p-6 flex flex-col justify-between gap-4 h-full relative"
    >
      <div>
        {/* Top: Category Pill */}
        <div className="flex justify-between items-start mb-4">
          <span className="bg-[#363636] text-white text-[10px] font-sans font-bold px-3 py-1 rounded-full shadow-[0_2px_0_rgba(0,0,0,0.18)]">
            {tip.category}
          </span>
        </div>

        {/* Emoji Circle (tangerine bg, clay circle) */}
        <div className="w-16 h-16 rounded-full bg-[#F58F20] text-white border-2 border-[#D4C97A]/40 shadow-[0_4px_0_rgba(0,0,0,0.18),inset_0_2px_0_rgba(255,255,255,0.3)] flex items-center justify-center text-3xl mb-4 select-none mx-auto">
          {tip.icon}
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-xl text-[#013E37] text-center mb-2 leading-snug">
          {tip.title}
        </h3>

        {/* Body */}
        <p className="font-body text-[#2A2A2A] text-sm text-center leading-relaxed mb-4">
          {tip.body}
        </p>
      </div>

      {/* Expandable Fact */}
      {tip.didYouKnow && (
        <div className="border-t border-[#D4C97A]/40 pt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center gap-1.5 w-full text-xs font-bold text-[#F58F20] hover:text-[#013E37] transition-colors"
          >
            <span>{isExpanded ? 'Hide Fact' : 'Did You Know?'}</span>
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="bg-[#FFFDF0] border-2 border-[#D4C97A]/40 rounded-xl p-3.5 mt-3 text-xs text-[#5C5C3D] leading-relaxed shadow-[inset_0_2px_4px_rgba(1,62,55,0.04)]">
                  <span className="font-bold text-[#013E37] block mb-1">💡 Fun Fact:</span>
                  {tip.didYouKnow}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
