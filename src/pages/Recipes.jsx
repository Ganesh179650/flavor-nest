import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { recipes } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import { SlidersHorizontal, RefreshCw } from 'lucide-react';

export default function Recipes() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const searchQuery = useStore((state) => state.searchQuery);
  const activeCategory = useStore((state) => state.activeCategory);
  const activeCuisine = useStore((state) => state.activeCuisine);
  const activeDifficulty = useStore((state) => state.activeDifficulty);
  const favorites = useStore((state) => state.favorites);

  const setSearch = useStore((state) => state.setSearch);
  const setCategory = useStore((state) => state.setCategory);
  const setCuisine = useStore((state) => state.setCuisine);
  const setDifficulty = useStore((state) => state.setDifficulty);
  const clearFilters = useStore((state) => state.clearFilters);

  // Sync URL search params to Zustand store
  useEffect(() => {
    const category = searchParams.get('category');
    const cuisine = searchParams.get('cuisine');
    const difficulty = searchParams.get('difficulty');
    const search = searchParams.get('search');
    
    if (category) setCategory(category);
    if (cuisine) setCuisine(cuisine);
    if (difficulty) setDifficulty(difficulty);
    if (search) setSearch(search);
  }, [searchParams, setCategory, setCuisine, setDifficulty, setSearch]);

  // Is favorites view active?
  const isFavoritesView = searchParams.get('filter') === 'favorites';

  // Filter Categories, Cuisines, Difficulties options
  const categories = ['All', 'Main Course', 'Breakfast', 'Dessert', 'Snack', 'Drink', 'Soup'];
  const cuisines = ['All', 'Indian', 'Italian', 'Western', 'Continental', 'Healthy'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  // Count active filters (excluding 'All' and empty search)
  let activeFilterCount = 0;
  if (activeCategory !== 'All') activeFilterCount++;
  if (activeCuisine !== 'All') activeFilterCount++;
  if (activeDifficulty !== 'All') activeFilterCount++;
  if (searchQuery.trim()) activeFilterCount++;
  if (isFavoritesView) activeFilterCount++;

  // Apply filters
  const filteredRecipes = recipes.filter((recipe) => {
    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = recipe.title.toLowerCase().includes(q);
      const matchTags = recipe.tags.some(tag => tag.toLowerCase().includes(q));
      const matchCuisine = recipe.cuisine.toLowerCase().includes(q);
      if (!matchTitle && !matchTags && !matchCuisine) return false;
    }
    // 2. Category
    if (activeCategory !== 'All' && recipe.category !== activeCategory) {
      return false;
    }
    // 3. Cuisine
    if (activeCuisine !== 'All' && recipe.cuisine !== activeCuisine) {
      return false;
    }
    // 4. Difficulty
    if (activeDifficulty !== 'All' && recipe.difficulty !== activeDifficulty) {
      return false;
    }
    // 5. Favorites
    if (isFavoritesView && !favorites.includes(recipe.id)) {
      return false;
    }
    return true;
  });

  const handleClearFilters = () => {
    clearFilters();
    // Clear URL params
    setSearchParams({});
  };

  const handleFilterClick = (type, value) => {
    // Update URL params in addition to Zustand store
    const newParams = new URLSearchParams(searchParams);
    
    // Clear favorites view if applying other category/cuisine filters if needed, or keep it
    if (type === 'category') {
      setCategory(value);
      if (value === 'All') newParams.delete('category');
      else newParams.set('category', value);
    } else if (type === 'cuisine') {
      setCuisine(value);
      if (value === 'All') newParams.delete('cuisine');
      else newParams.set('cuisine', value);
    } else if (type === 'difficulty') {
      setDifficulty(value);
      if (value === 'All') newParams.delete('difficulty');
      else newParams.set('difficulty', value);
    }

    setSearchParams(newParams);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="pt-16 min-h-screen bg-[#FFFDF0]"
    >
      {/* HEADER SECTION (bg-forest, butter text) */}
      <header className="bg-[#013E37] text-[#FFEFB3] py-12 px-4 shadow-[inset_0_-8px_16px_rgba(0,0,0,0.15)] relative">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-6">
          <div className="flex items-center justify-center gap-3">
            <h1 className="font-display font-black text-4xl md:text-5xl">
              {isFavoritesView ? 'Favorite Recipes' : 'Explore Recipes'}
            </h1>
            <span className="bg-[#F58F20] text-white font-sans font-bold text-sm px-3.5 py-1.5 rounded-full shadow-[0_4px_0_rgba(0,0,0,0.15)]">
              {filteredRecipes.length}
            </span>
          </div>

          <p className="font-sans text-sm text-[#FFEFB3]/80 max-w-md mx-auto">
            {isFavoritesView 
              ? 'Your personal kitchen catalog. Hand-saved recipes ready to be cooked.'
              : 'Browse our complete library of tasty creations. Filter by course, style or difficulty.'
            }
          </p>

          <SearchBar
            value={searchQuery}
            onChange={(val) => {
              setSearch(val);
              const newParams = new URLSearchParams(searchParams);
              if (val) newParams.set('search', val);
              else newParams.delete('search');
              setSearchParams(newParams);
            }}
            onClear={() => {
              setSearch('');
              const newParams = new URLSearchParams(searchParams);
              newParams.delete('search');
              setSearchParams(newParams);
            }}
            placeholder="Search by name, cuisine, ingredients..."
          />
        </div>
      </header>

      {/* FILTER BAR (sticky below header on scroll) */}
      <section className="sticky top-16 bg-[#FFF8D6] border-b-2 border-[#D4C97A]/50 z-30 shadow-[0_4px_12px_rgba(1,62,55,0.06)] py-4 px-4 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#013E37]">
              <SlidersHorizontal size={18} />
              <span className="font-sans font-bold text-sm">Filter Options</span>
              {activeFilterCount > 0 && (
                <span className="bg-[#F58F20] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {activeFilterCount} active
                </span>
              )}
            </div>

            {activeFilterCount > 0 && (
              <button
                onClick={handleClearFilters}
                className="text-xs font-bold text-[#F58F20] hover:text-[#013E37] flex items-center gap-1 transition-colors select-none"
              >
                <RefreshCw size={12} />
                <span>Clear All Filters</span>
              </button>
            )}
          </div>

          {/* 3 filter rows */}
          <div className="flex flex-col gap-3.5 pt-2 border-t border-[#D4C97A]/30">
            
            {/* Category Filter */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-0.5">
              <span className="text-xs font-bold text-[#5C5C3D] w-20 flex-shrink-0">Category:</span>
              <div className="flex gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleFilterClick('category', cat)}
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

            {/* Cuisine Filter */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-0.5">
              <span className="text-xs font-bold text-[#5C5C3D] w-20 flex-shrink-0">Cuisine:</span>
              <div className="flex gap-2">
                {cuisines.map((c) => (
                  <button
                    key={c}
                    onClick={() => handleFilterClick('cuisine', c)}
                    className={`text-xs px-4 py-1.5 rounded-full font-semibold transition-all select-none border-2 ${
                      activeCuisine === c
                        ? 'bg-[#013E37] text-[#FFEFB3] border-[#013E37] shadow-[0_3px_0_rgba(0,0,0,0.25)]'
                        : 'bg-transparent text-[#013E37] border-[#013E37]/35 hover:bg-[#013E37]/5'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-0.5">
              <span className="text-xs font-bold text-[#5C5C3D] w-20 flex-shrink-0">Difficulty:</span>
              <div className="flex gap-2">
                {difficulties.map((d) => (
                  <button
                    key={d}
                    onClick={() => handleFilterClick('difficulty', d)}
                    className={`text-xs px-4 py-1.5 rounded-full font-semibold transition-all select-none border-2 ${
                      activeDifficulty === d
                        ? 'bg-[#013E37] text-[#FFEFB3] border-[#013E37] shadow-[0_3px_0_rgba(0,0,0,0.25)]'
                        : 'bg-transparent text-[#013E37] border-[#013E37]/35 hover:bg-[#013E37]/5'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* RECIPES GRID SECTION */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <AnimatePresence mode="popLayout">
          {filteredRecipes.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredRecipes.map((recipe, index) => (
                <RecipeCard key={recipe.id} recipe={recipe} index={index} />
              ))}
            </motion.div>
          ) : (
            // EMPTY STATE
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-md mx-auto clay-card p-12 flex flex-col items-center justify-center text-center gap-6 mt-8"
            >
              <span className="text-6xl animate-bounce">🥄</span>
              <div>
                <h3 className="font-display font-bold text-2xl text-[#013E37] mb-2">No Recipes Found</h3>
                <p className="font-sans text-[#5C5C3D] text-sm">
                  We couldn't find any recipes matching your current search or filter criteria. Try clearing them to browse everything.
                </p>
              </div>
              <button
                onClick={handleClearFilters}
                className="clay-btn text-sm"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

    </motion.div>
  );
}
