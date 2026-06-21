import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion as m, AnimatePresence as Ap } from 'framer-motion';
import { Search, Heart, Menu, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { recipes } from '../data/recipes';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();
  
  const favorites = useStore((state) => state.favorites);
  const setSearch = useStore((state) => state.setSearch);

  // Close menus on page navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  // Handle ESC key for Search Overlay
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    if (isSearchOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Recipes', path: '/recipes' },
    { name: 'Blog', path: '/blog' },
    { name: 'Tips', path: '/tips' },
    { name: 'About', path: '/about' },
  ];

  // Filter recipes for search overlay
  const filteredRecipes = searchInput.trim()
    ? recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchInput.toLowerCase())) ||
        recipe.cuisine.toLowerCase().includes(searchInput.toLowerCase())
      )
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearch(searchInput);
      setIsSearchOpen(false);
      navigate(`/recipes?search=${encodeURIComponent(searchInput)}`);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-[#FFF8D6] border-b-2 border-[#D4C97A]/50 shadow-[0_4px_0_rgba(1,62,55,0.08),0_4px_20px_rgba(1,62,55,0.06)] z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
          
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-1.5 group select-none">
            <span className="text-2xl transition-transform duration-300 group-hover:rotate-12">🍃</span>
            <span className="font-display font-black text-2xl text-[#013E37]">Flavor</span>
            <span className="font-display font-black text-2xl text-[#F58F20]">Nest</span>
          </Link>

          {/* Center: Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = 
                link.path === '/' 
                  ? location.pathname === '/' 
                  : location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative font-body font-bold text-sm tracking-wide transition-colors duration-200 py-1.5 ${
                    isActive 
                      ? 'text-[#013E37]' 
                      : 'text-[#5C5C3D] hover:text-[#F58F20]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <m.div
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#F58F20] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search recipes"
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#013E37] hover:bg-[#013E37]/5 transition-colors"
            >
              <Search size={20} />
            </button>

            {/* Favorites Icon */}
            <Link
              to="/recipes?filter=favorites"
              aria-label="View favorite recipes"
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#013E37] hover:bg-[#013E37]/5 transition-colors relative"
            >
              <Heart size={20} className={favorites.length > 0 ? "fill-red-500 text-red-500" : ""} />
              {favorites.length > 0 && (
                <m.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-[#F58F20] text-white font-sans text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border border-[#FFF8D6]"
                >
                  {favorites.length}
                </m.span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-[#013E37] hover:bg-[#013E37]/5 transition-colors"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Slide-Down Menu */}
      <Ap>
        {isMobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-16 left-0 right-0 bg-[#FFF8D6] border-b-2 border-[#D4C97A]/50 shadow-[0_10px_25px_rgba(1,62,55,0.12)] z-30 py-6 px-4 md:hidden flex flex-col gap-4"
          >
            <m.div 
              className="flex flex-col gap-3"
              variants={{
                open: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } }
              }}
              initial="closed"
              animate="open"
            >
              {navLinks.map((link) => {
                const isActive = 
                  link.path === '/' 
                    ? location.pathname === '/' 
                    : location.pathname.startsWith(link.path);
                return (
                  <m.div
                    key={link.name}
                    variants={{
                      open: { y: 0, opacity: 1 },
                      closed: { y: 20, opacity: 0 }
                    }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block font-display font-bold text-2xl py-2 px-3 rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'bg-[#013E37]/5 text-[#013E37] border-l-4 border-[#F58F20]' 
                          : 'text-[#013E37] hover:bg-[#013E37]/5'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </m.div>
                );
              })}
            </m.div>
          </m.div>
        )}
      </Ap>

      {/* Full-Screen Search Overlay */}
      <Ap>
        {isSearchOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#013E37]/95 backdrop-blur-md z-50 overflow-y-auto px-4 py-8"
          >
            <div className="max-w-4xl mx-auto flex flex-col min-h-full relative">
              
              {/* Close Button */}
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchInput('');
                }}
                className="self-end w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors mb-8"
              >
                <X size={24} />
              </button>

              {/* Centered Search Form */}
              <form onSubmit={handleSearchSubmit} className="w-full mb-12">
                <h2 className="font-display font-bold text-3xl md:text-4xl text-[#FFEFB3] mb-6 text-center">
                  Search Recipes & Flavors
                </h2>
                <div className="relative">
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search by ingredients, cuisine, dish title..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full rounded-2xl px-6 py-5 pr-14 text-lg md:text-xl text-[#2A2A2A] outline-none bg-[#FFF8D6] border-4 border-[#D4C97A] shadow-[0_8px_0_0_rgba(245,143,32,0.3),inset_0_2px_8px_rgba(1,62,55,0.15)] focus:border-[#F58F20] transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-[#013E37] text-[#FFEFB3] flex items-center justify-center shadow-md hover:bg-[#025C52] transition-colors"
                  >
                    <Search size={22} />
                  </button>
                </div>
                <p className="text-white/60 text-sm text-center mt-3 font-sans">
                  Press ESC to cancel • Try "chicken", "breakfast", "curry" or "Italian"
                </p>
              </form>

              {/* Real-time Search Results */}
              <div className="flex-1">
                {searchInput.trim() && (
                  <div>
                    <h3 className="font-display font-semibold text-2xl text-[#FFEFB3] mb-6 border-b border-[#FFEFB3]/20 pb-2">
                      Matching Recipes ({filteredRecipes.length})
                    </h3>
                    
                    {filteredRecipes.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {filteredRecipes.map((recipe) => (
                          <div 
                            key={recipe.id}
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchInput('');
                              navigate(`/recipes/${recipe.id}`);
                            }}
                            className="cursor-pointer"
                          >
                            {/* Simple inline RecipeCard card preview for search */}
                            <div className="bg-[#FFF8D6] rounded-3xl border-2 border-[#D4C97A]/60 overflow-hidden shadow-[0_6px_0_0_rgba(255,255,255,0.1),0_8px_16px_rgba(0,0,0,0.2)] hover:scale-[1.03] transition-transform duration-200">
                              
                              {/* Food visual */}
                              <div 
                                className="h-32 flex items-center justify-center text-4xl"
                                style={{
                                  background: 
                                    recipe.colorTheme === 'tangerine'
                                      ? 'linear-gradient(135deg, #F58F20 0%, #FFB347 40%, #FFF8D6 100%)'
                                      : recipe.colorTheme === 'leaf'
                                      ? 'linear-gradient(135deg, #467434 0%, #6BA050 40%, #FFEFB3 100%)'
                                      : recipe.colorTheme === 'forest'
                                      ? 'linear-gradient(135deg, #013E37 0%, #025C52 40%, #FFEFB3 100%)'
                                      : 'linear-gradient(135deg, #FFD966 0%, #FFEFB3 60%, #F58F20 100%)'
                                }}
                              >
                                {recipe.emoji}
                              </div>
                              
                              <div className="p-4">
                                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#5C5C3D]">
                                  {recipe.cuisine} • {recipe.category}
                                </span>
                                <h4 className="font-display font-bold text-lg text-[#013E37] line-clamp-1 mt-1">
                                  {recipe.title}
                                </h4>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-white/50">
                        <span className="text-5xl block mb-4">🥄</span>
                        <p className="text-lg">No recipes found for "{searchInput}"</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>
          </m.div>
        )}
      </Ap>
    </>
  );
}
