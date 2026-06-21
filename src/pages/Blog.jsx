import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { blogPosts } from '../data/blogPosts';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

export default function Blog() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Kitchen Skills', 'Ingredients', 'Nutrition', 'World Cuisine', 'Beginner Tips', 'Equipment'];

  // Apply filter
  const filteredPosts = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter((post) => post.category === activeCategory);

  const getGradient = (theme) => {
    switch (theme) {
      case 'forest':
        return 'linear-gradient(135deg, #013E37 0%, #025C52 100%)';
      case 'tangerine':
        return 'linear-gradient(135deg, #F58F20 0%, #FFB347 100%)';
      case 'leaf':
        return 'linear-gradient(135deg, #467434 0%, #6BA050 100%)';
      case 'butter':
        return 'linear-gradient(135deg, #FFD966 0%, #F58F20 100%)';
      default:
        return 'linear-gradient(135deg, #013E37 0%, #F58F20 100%)';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="pt-16 min-h-screen bg-[#FFFDF0]"
    >
      {/* HEADER SECTION */}
      <header className="bg-[#013E37] text-[#FFEFB3] py-16 px-4 text-center shadow-[inset_0_-8px_16px_rgba(0,0,0,0.1)]">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          <h1 className="font-display font-black text-4xl md:text-5xl">
            Kitchen Diaries
          </h1>
          <p className="font-sans text-sm text-[#FFEFB3]/80 max-w-md mx-auto">
            Stories, culinary secrets, guides, and inspiration straight from our chefs.
          </p>
        </div>
      </header>

      {/* FILTER PILLS */}
      <section className="bg-[#FFF8D6] py-5 px-4 border-b-2 border-[#D4C97A]/50 sticky top-16 z-30 shadow-sm overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-3 no-scrollbar overflow-x-auto py-0.5">
          <span className="text-xs font-bold text-[#5C5C3D] flex-shrink-0">Filter Category:</span>
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-4 py-1.5 rounded-full font-semibold transition-all select-none border-2 ${
                  activeCategory === cat
                    ? 'bg-[#013E37] text-[#FFEFB3] border-[#013E37] shadow-[0_3px_0_rgba(0,0,0,0.25)]'
                    : 'bg-transparent text-[#013E37] border-[#013E37]/35 hover:bg-[#013E37]/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG POSTS GRID */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <AnimatePresence mode="popLayout">
          {filteredPosts.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  whileHover={{ y: -6 }}
                  onClick={() => navigate(`/blog/${post.id}`)}
                  className="clay-card overflow-hidden flex flex-col justify-between cursor-pointer select-none h-full"
                >
                  
                  {/* Gradient category header */}
                  <div 
                    className="h-28 flex items-center justify-center p-4 rounded-t-3xl"
                    style={{ background: getGradient(post.colorTheme) }}
                  >
                    <span className="bg-[#FFF8D6] text-[#013E37] text-xs font-bold font-body px-4 py-1 rounded-full shadow-[0_3px_0_rgba(1,62,55,0.12)]">
                      {post.category}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                    <div>
                      {/* Meta dates */}
                      <div className="flex gap-4 items-center text-xs text-[#5C5C3D] font-body mb-3">
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>{post.readTime} min read</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span>{post.date}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-bold text-2xl text-[#013E37] leading-snug mb-3 hover:text-[#F58F20] transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="font-body text-sm text-[#5C5C3D] leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Footer Author Row */}
                    <div className="flex items-center justify-between border-t border-[#D4C97A]/30 pt-4 mt-auto">
                      <div className="flex items-center gap-2.5">
                        {/* Author avatar circle */}
                        <div className="w-8 h-8 rounded-full bg-[#F58F20] text-white flex items-center justify-center font-display font-bold text-xs border border-white/20 shadow-sm select-none">
                          {post.initials}
                        </div>
                        <div className="text-left">
                          <p className="font-sans font-bold text-xs text-[#013E37] leading-none">{post.author}</p>
                          <p className="font-body text-[10px] text-[#5C5C3D]">Culinary Writer</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[#F58F20] font-sans font-bold text-xs hover:text-[#013E37] transition-colors">
                        <span>Read More</span>
                        <ArrowRight size={12} />
                      </div>
                    </div>
                  </div>

                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12 text-[#5C5C3D]">
              <span className="text-5xl block mb-3">📖</span>
              <p className="text-lg font-bold">No articles found in this category.</p>
            </div>
          )}
        </AnimatePresence>
      </main>

    </motion.div>
  );
}
