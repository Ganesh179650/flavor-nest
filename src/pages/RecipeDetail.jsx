import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Clock, Users, Flame, ChevronRight, Share2, Star, Check } from 'lucide-react';
import { useStore } from '../store/useStore';
import { recipes } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';

export default function RecipeDetail() {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === id);

  // States
  const [servings, setServings] = useState(4);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [showShareToast, setShowShareToast] = useState(false);
  const [isNutritionOpen, setIsNutritionOpen] = useState(true);

  // Store
  const favorites = useStore((state) => state.favorites);
  const toggleFavorite = useStore((state) => state.toggleFavorite);
  const isFavorite = favorites.includes(id);

  // Reset page states when recipe changes
  useEffect(() => {
    if (recipe) {
      setServings(recipe.servings);
      setCompletedSteps([]);
      setCheckedIngredients([]);
      window.scrollTo(0, 0);
    }
  }, [id, recipe]);

  if (!recipe) {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center gap-4 bg-[#FFFDF0]">
        <span className="text-6xl">🔍</span>
        <h2 className="font-display font-bold text-2xl text-[#013E37]">Recipe Not Found</h2>
        <Link to="/recipes" className="clay-btn">Browse All Recipes</Link>
      </div>
    );
  }

  // Get similar recipes (same category, exclude current recipe, up to 3)
  const similarRecipes = recipes
    .filter((r) => r.category === recipe.category && r.id !== recipe.id)
    .slice(0, 3);

  const getGradient = (theme) => {
    switch (theme) {
      case 'tangerine':
        return 'linear-gradient(135deg, #F58F20 0%, #FFB347 40%, #FFF8D6 100%)';
      case 'leaf':
        return 'linear-gradient(135deg, #467434 0%, #6BA050 40%, #FFEFB3 100%)';
      case 'forest':
        return 'linear-gradient(135deg, #013E37 0%, #025C52 40%, #FFEFB3 100%)';
      case 'butter':
        return 'linear-gradient(135deg, #FFD966 0%, #FFEFB3 60%, #F58F20 100%)';
      default:
        return 'linear-gradient(135deg, #F58F20 0%, #FFB347 40%, #FFF8D6 100%)';
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: recipe.tagline,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2000);
    }
  };

  const toggleStep = (idx) => {
    setCompletedSteps((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const toggleIngredient = (idx) => {
    setCheckedIngredients((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  // Helper to parse amount and scale
  const getScaledAmount = (amountStr) => {
    if (!amountStr) return '';
    const cleanAmount = amountStr.trim();
    if (isNaN(parseFloat(cleanAmount))) {
      return cleanAmount;
    }
    const scaled = (parseFloat(cleanAmount) * servings) / recipe.servings;
    return scaled.toFixed(1).replace(/\.0$/, ''); // removes training .0
  };

  // Nutrition helper values
  const getNutritionPercent = (key, valStr) => {
    if (!valStr) return 0;
    const val = parseFloat(valStr.replace(/[^\d.]/g, ''));
    if (isNaN(val)) return 0;
    
    // Daily recommended limits: Protein 50g, Carbs 300g, Fat 70g, Fiber 25g
    switch (key) {
      case 'protein': return Math.min(100, Math.round((val / 50) * 100));
      case 'carbs': return Math.min(100, Math.round((val / 300) * 100));
      case 'fat': return Math.min(100, Math.round((val / 70) * 100));
      case 'fiber': return Math.min(100, Math.round((val / 25) * 100));
      default: return 50;
    }
  };

  // Nutrition color theme mapping
  const nutritionMetrics = [
    { key: 'protein', label: 'Protein', color: '#F58F20', raw: recipe.nutrition.protein },
    { key: 'carbs', label: 'Carbs', color: '#467434', raw: recipe.nutrition.carbs },
    { key: 'fat', label: 'Fat', color: '#013E37', raw: recipe.nutrition.fat },
    { key: 'fiber', label: 'Fiber', color: '#363636', raw: recipe.nutrition.fiber },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="pt-16 min-h-screen bg-[#FFFDF0]"
    >
      {/* 1. FULL-WIDTH HEADER (bg-forest) */}
      <header className="bg-[#013E37] text-[#FFEFB3] pt-8 pb-12 px-4 shadow-[inset_0_-8px_16px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-1 text-xs font-body text-[#FFEFB3]/60">
            <Link to="/" className="hover:text-[#FFEFB3] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/recipes" className="hover:text-[#FFEFB3] transition-colors">Recipes</Link>
            <ChevronRight size={12} />
            <span className="text-[#FFEFB3] truncate max-w-[150px] sm:max-w-none">{recipe.title}</span>
          </div>

          {/* Title and Tagline */}
          <h1 className="font-display font-black text-3xl md:text-5xl text-[#FFEFB3] mt-2 select-none leading-tight">
            {recipe.title}
          </h1>
          <p className="font-script text-2xl text-[#F58F20] tracking-wide select-none">
            {recipe.tagline}
          </p>

          {/* Meta Row */}
          <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-xs sm:text-sm font-body text-[#FFEFB3]/90 mt-2">
            <div className="flex items-center gap-1 text-[#F58F20]">
              <Star size={16} className="fill-current" />
              <span className="font-bold text-white">{recipe.rating}</span>
              <span className="text-white/60">({recipe.ratingCount} reviews)</span>
            </div>
            <span>|</span>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{recipe.prepTime + recipe.cookTime} min total</span>
            </div>
            <span>|</span>
            <div className="flex items-center gap-1">
              <Users size={16} />
              <span>{recipe.servings} servings</span>
            </div>
            <span>|</span>
            <div className="flex items-center gap-1">
              <Flame size={16} />
              <span>{recipe.calories} kcal</span>
            </div>
          </div>

          {/* Category & Cuisine pills */}
          <div className="flex flex-wrap gap-2.5 mt-3">
            <span className="clay-tag py-1 px-4">{recipe.category}</span>
            <span className="clay-tag-leaf py-1 px-4">{recipe.cuisine}</span>
            <span className="bg-[#363636] text-white text-xs font-sans font-bold px-4 py-1 rounded-full shadow-[0_4px_0_0_rgba(0,0,0,0.18)]">
              {recipe.difficulty}
            </span>
          </div>

        </div>
      </header>

      {/* 2. GRADIENT FOOD VISUAL */}
      <div className="max-w-7xl mx-auto px-0 md:px-4 -mt-6 md:-mt-8 relative z-10">
        <div 
          className="h-[320px] md:h-[500px] w-full relative flex items-center justify-center text-[80px] md:text-[140px] md:rounded-[32px] shadow-[0_12px_24px_rgba(1,62,55,0.15)] overflow-hidden"
          style={{ background: getGradient(recipe.colorTheme) }}
        >
          {/* Subtle Bottom shading for legibility overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#013E37]/35 via-transparent to-transparent pointer-events-none" />

          {/* Large Centered Emoji */}
          <span className="animate-float-slow select-none">
            {recipe.emoji}
          </span>

          {/* Floating Heart Toggle */}
          <button
            onClick={() => toggleFavorite(recipe.id)}
            aria-label={isFavorite ? "Remove from favorites" : "Save to favorites"}
            className="absolute top-6 right-6 w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-[0_6px_12px_rgba(0,0,0,0.15)] border-2 border-[#D4C97A] hover:scale-110 active:scale-95 transition-transform"
          >
            <Heart 
              size={24} 
              className={isFavorite ? "fill-red-500 text-red-500" : "text-[#013E37]/75"} 
            />
          </button>
        </div>
      </div>

      {/* 3. TWO-COLUMN DETAILS LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 items-start">
          
          {/* LEFT COLUMN (60%): Steps */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div>
              <h2 className="font-display font-black text-3xl text-[#013E37] mb-6">
                How to Make It
              </h2>

              {/* Numbered Steps list */}
              <div className="flex flex-col gap-5">
                {recipe.steps.map((step, idx) => {
                  const isDone = completedSteps.includes(idx);
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.08 }}
                      onClick={() => toggleStep(idx)}
                      className={`clay-card p-5 flex gap-4 items-start cursor-pointer select-none transition-all ${
                        isDone 
                          ? 'bg-[#013E37] text-[#FFEFB3] border-[#013E37]' 
                          : 'bg-[#FFF8D6] text-[#2A2A2A]'
                      }`}
                    >
                      {/* Step Number Circle */}
                      <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-display font-bold text-lg border-2 shadow-[0_3px_0_rgba(0,0,0,0.18)] ${
                        isDone
                          ? 'bg-[#467434] text-white border-white/20'
                          : 'bg-[#F58F20] text-white border-[#D4C97A]/40'
                      }`}>
                        {isDone ? <Check size={18} /> : idx + 1}
                      </div>

                      {/* Step Text */}
                      <p className={`font-body text-sm leading-relaxed ${isDone ? 'line-through text-[#FFEFB3]/60' : ''}`}>
                        {step}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Pro Tip Box at bottom */}
            {recipe.tips && (
              <div className="bg-[#FFEFB3] border-l-8 border-[#F58F20] rounded-2xl p-5 shadow-[0_6px_12px_rgba(1,62,55,0.04)]">
                <span className="font-display font-bold text-lg text-[#013E37] block mb-1">
                  💡 Chef's Tip:
                </span>
                <p className="font-body text-sm text-[#5C5C3D] leading-relaxed">
                  {recipe.tips}
                </p>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN (40%): Ingredients */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-6">
            
            {/* Ingredients Container */}
            <div className="clay-card p-6 bg-[#FFF8D6]">
              <h2 className="font-display font-black text-2xl text-[#013E37] mb-4">
                Ingredients
              </h2>

              {/* Servings Adjuster */}
              <div className="flex items-center justify-between mb-6 bg-[#FFFDF0] p-3 rounded-2xl border-2 border-[#D4C97A]/50">
                <span className="font-sans text-xs font-bold text-[#5C5C3D]">Scale Servings</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setServings(Math.max(1, servings - 1))}
                    className="w-8 h-8 rounded-lg bg-[#F58F20] text-white font-bold flex items-center justify-center shadow-md active:translate-y-0.5 select-none"
                  >
                    -
                  </button>
                  <span className="font-display font-black text-lg text-[#013E37] w-8 text-center">
                    {servings}
                  </span>
                  <button
                    onClick={() => setServings(servings + 1)}
                    className="w-8 h-8 rounded-lg bg-[#F58F20] text-white font-bold flex items-center justify-center shadow-md active:translate-y-0.5 select-none"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Ingredients Checklist */}
              <div className="flex flex-col gap-3.5 mb-6">
                {recipe.ingredients.map((ing, idx) => {
                  const isChecked = checkedIngredients.includes(idx);
                  return (
                    <div 
                      key={idx}
                      onClick={() => toggleIngredient(idx)}
                      className="flex items-start gap-3 cursor-pointer select-none group py-0.5"
                    >
                      {/* Custom Clay Checkbox */}
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        isChecked
                          ? 'bg-[#013E37] border-[#013E37] text-[#FFEFB3]'
                          : 'bg-[#FFFDF0] border-[#D4C97A] group-hover:border-[#013E37]'
                      }`}>
                        {isChecked && <Check size={12} />}
                      </div>

                      {/* Ingredient Text */}
                      <p className={`font-body text-sm leading-tight text-[#2A2A2A] ${isChecked ? 'line-through text-[#5C5C3D]/65' : ''}`}>
                        <strong className="font-bold text-[#013E37] mr-1">
                          {getScaledAmount(ing.amount)} {ing.unit}
                        </strong>
                        {ing.item}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Nutrition Facts Accordion */}
              <div className="border-t border-[#D4C97A]/40 pt-4">
                <button
                  onClick={() => setIsNutritionOpen(!isNutritionOpen)}
                  className="flex items-center justify-between w-full font-sans text-xs font-bold text-[#5C5C3D] hover:text-[#013E37] transition-colors mb-4"
                >
                  <span>NUTRITION FACTS (per serving)</span>
                  <span>{isNutritionOpen ? 'Collapse [-]' : 'Expand [+]'}</span>
                </button>

                <AnimatePresence initial={false}>
                  {isNutritionOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-4 gap-3 text-center mt-2">
                        {nutritionMetrics.map((m) => {
                          const percent = getNutritionPercent(m.key, m.raw);
                          const radius = 16;
                          const circ = 2 * Math.PI * radius;
                          const offset = circ - (percent / 100) * circ;
                          return (
                            <div key={m.key} className="flex flex-col items-center">
                              {/* Circle SVG */}
                              <div className="relative w-12 h-12 mb-1 flex items-center justify-center">
                                <svg className="w-full h-full -rotate-90">
                                  {/* Background ring */}
                                  <circle
                                    cx="24"
                                    cy="24"
                                    r={radius}
                                    fill="transparent"
                                    stroke="#FFFDF0"
                                    strokeWidth="3.5"
                                  />
                                  {/* Progress ring */}
                                  <circle
                                    cx="24"
                                    cy="24"
                                    r={radius}
                                    fill="transparent"
                                    stroke={m.color}
                                    strokeWidth="3.5"
                                    strokeDasharray={circ}
                                    strokeDashoffset={offset}
                                    strokeLinecap="round"
                                  />
                                </svg>
                                <span className="absolute text-[9px] font-sans font-bold text-[#013E37]">
                                  {m.raw}
                                </span>
                              </div>
                              <span className="text-[9px] font-sans font-bold text-[#5C5C3D] uppercase tracking-wide">
                                {m.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Save & Share Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => toggleFavorite(recipe.id)}
                className="w-full clay-btn py-3.5 flex items-center justify-center gap-2"
              >
                <Heart size={18} className={isFavorite ? "fill-red-500 text-red-500" : ""} />
                <span>{isFavorite ? 'Saved to Favorites' : 'Save to Favorites'}</span>
              </button>
              
              <button
                onClick={handleShare}
                className="w-full clay-btn-ghost py-3 flex items-center justify-center gap-2 bg-transparent"
              >
                <Share2 size={18} />
                <span>Share Recipe</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* 4. SIMILAR RECIPES SECTION (bottom) */}
      {similarRecipes.length > 0 && (
        <section className="bg-[#FFF8D6] py-16 px-4 border-t-2 border-[#D4C97A]/40 mt-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display font-black text-2xl md:text-3xl text-[#013E37] mb-8 text-center select-none">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarRecipes.map((similar, idx) => (
                <RecipeCard key={similar.id} recipe={similar} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Toast Notification for Link Copy */}
      <AnimatePresence>
        {showShareToast && (
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: 'spring', damping: 15 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#013E37] text-[#FFEFB3] font-sans font-medium px-6 py-3.5 rounded-full shadow-lg border border-[#D4C97A]/40"
          >
            <span>Link Copied! 📋 Ready to share.</span>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
