import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Clock, Users, Flame, Star } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function RecipeCard({ recipe, index }) {
  const navigate = useNavigate();
  const favorites = useStore((state) => state.favorites);
  const toggleFavorite = useStore((state) => state.toggleFavorite);
  const isFavorite = favorites.includes(recipe.id);

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

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(recipe.id);
  };

  // Set card animations
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 100,
        delay: index * 0.05
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -6 }}
      onClick={() => navigate(`/recipes/${recipe.id}`)}
      className="clay-card overflow-hidden flex flex-col justify-between h-full cursor-pointer select-none group"
    >
      {/* Top Image (Gradient + Emoji) */}
      <div 
        className="h-44 relative flex items-center justify-center text-6xl rounded-t-3xl"
        style={{ background: getGradient(recipe.colorTheme) }}
      >
        <span className="transition-transform duration-300 group-hover:scale-125 select-none">
          {recipe.emoji}
        </span>
        
        {/* Heart Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-transform border border-[#D4C97A]/40 text-[#013E37]"
        >
          <motion.div
            key={isFavorite ? "fav" : "unfav"}
            initial={{ scale: 0 }}
            animate={{ scale: [1, 0, 1.4, 1] }}
            transition={{ duration: 0.4 }}
          >
            <Heart 
              size={18} 
              className={isFavorite ? "fill-red-500 text-red-500" : "text-[#013E37]/75"} 
            />
          </motion.div>
        </button>
      </div>

      {/* Card Info */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          {/* Pills row */}
          <div className="flex gap-2 mb-2">
            <span className="clay-tag text-[10px] py-0.5 px-3">
              {recipe.category}
            </span>
            <span className={`text-[10px] font-sans font-bold px-3 py-0.5 rounded-full shadow-[0_2px_0_0_rgba(0,0,0,0.12)] border text-white ${
              recipe.difficulty === 'Easy' 
                ? 'bg-[#467434] border-[#D4C97A]/20' 
                : 'bg-[#363636] border-[#D4C97A]/20'
            }`}>
              {recipe.difficulty}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-xl text-[#013E37] leading-tight mb-1 group-hover:text-[#F58F20] transition-colors">
            {recipe.title}
          </h3>
          {/* Tagline */}
          <p className="font-sans text-xs text-[#5C5C3D] line-clamp-1 italic mb-3">
            {recipe.tagline}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 text-xs text-[#2A2A2A] font-body mb-3">
            <div className="flex text-[#F58F20]">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={13} 
                  className={i < Math.floor(recipe.rating) ? "fill-current" : "text-[#D4C97A]"} 
                />
              ))}
            </div>
            <span className="font-bold ml-1">{recipe.rating}</span>
            <span className="text-gray-400">({recipe.ratingCount})</span>
          </div>
        </div>

        <div>
          {/* Stats Row */}
          <div className="grid grid-cols-3 border-t border-[#D4C97A]/40 pt-3 pb-2 text-[11px] font-body text-[#5C5C3D] gap-2">
            <div className="flex items-center gap-1 justify-center">
              <Clock size={12} className="text-[#013E37]" />
              <span>{recipe.prepTime + recipe.cookTime} min</span>
            </div>
            <div className="flex items-center gap-1 justify-center border-x border-[#D4C97A]/40 px-1">
              <Users size={12} className="text-[#013E37]" />
              <span>{recipe.servings} Serves</span>
            </div>
            <div className="flex items-center gap-1 justify-center">
              <Flame size={12} className="text-[#013E37]" />
              <span>{recipe.calories} kcal</span>
            </div>
          </div>

          {/* View Recipe Button */}
          <button 
            className="w-full clay-btn py-2 text-xs font-bold mt-2"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/recipes/${recipe.id}`);
            }}
          >
            View Recipe →
          </button>
        </div>
      </div>
    </motion.div>
  );
}
