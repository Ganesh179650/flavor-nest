import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, onClear, placeholder = "Search recipes..." }) {
  return (
    <div className="relative w-full max-w-2xl mx-auto z-10">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5C5C3D]">
        <Search size={20} />
      </div>
      
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="clay-input pl-12 pr-10 py-3.5 text-base font-body shadow-[inset_0_3px_8px_rgba(1,62,55,0.08)] placeholder-[#5C5C3D]/60"
      />

      {value && (
        <button
          onClick={onClear}
          aria-label="Clear search"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#013E37]/10 flex items-center justify-center text-[#013E37] hover:bg-[#013E37]/20 transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
