import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import CategoryPill from '../components/CategoryPill';
import RecipeCard from '../components/RecipeCard';
import NewsletterBanner from '../components/NewsletterBanner';
import { recipes } from '../data/recipes';
import { blogPosts } from '../data/blogPosts';
import { tips } from '../data/tips';

export default function Home() {
  const navigate = useNavigate();

  // Categories list
  const categoriesList = [
    { name: 'Main Course', emoji: '🥘' },
    { name: 'Breakfast', emoji: '🥞' },
    { name: 'Dessert', emoji: '🍰' },
    { name: 'Drink', emoji: '🥤' },
    { name: 'Snack', emoji: '🍿' },
    { name: 'Soup', emoji: '🍲' },
  ];

  // Get featured recipes (take up to 3)
  const featuredRecipes = recipes.filter(r => r.featured).slice(0, 3);

  // Get recent blog posts (take 3)
  const recentPosts = blogPosts.slice(0, 3);

  // Helper for blog category gradient headers
  const getBlogHeaderGradient = (theme) => {
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
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. CATEGORY SCROLL SECTION */}
      <section className="bg-[#013E37] py-16 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[#FFEFB3] mb-8 text-center">
            What are you craving?
          </h2>
          
          {/* Horizontal scroll container (hide scrollbar via tailwind utilities or inline css) */}
          <div className="flex gap-6 overflow-x-auto pb-4 pt-2 justify-start md:justify-center no-scrollbar touch-pan-x">
            {categoriesList.map((cat) => (
              <CategoryPill
                key={cat.name}
                name={cat.name}
                emoji={cat.emoji}
                isActive={false}
                onClick={() => navigate(`/recipes?category=${encodeURIComponent(cat.name)}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED RECIPES SECTION */}
      <section className="bg-[#FFF8D6] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display font-black text-3xl md:text-5xl text-[#013E37] mb-2">
              This Week's Favorites
            </h2>
            <p className="font-script text-2xl text-[#F58F20] tracking-wide">
              Curated by our kitchen team
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRecipes.map((recipe, index) => (
              <RecipeCard key={recipe.id} recipe={recipe} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. COOKING TIPS STRIP (Marquee) */}
      <section className="bg-[#467434] py-12 overflow-hidden border-y-4 border-[#FFF8D6]/10">
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-[#FFEFB3] text-center">
            Quick Kitchen Tips
          </h2>
        </div>
        
        {/* Infinite Marquee container */}
        <div className="marquee-container w-full overflow-hidden cursor-pointer select-none">
          <div className="marquee-track flex gap-6">
            {/* Render tips twice for seamless loop */}
            {[...tips, ...tips].map((tip, idx) => (
              <div
                key={`${tip.id}-${idx}`}
                onClick={() => navigate('/tips')}
                className="bg-[#FFF8D6] text-[#013E37] font-body text-sm font-semibold py-3 px-6 rounded-full border-2 border-[#D4C97A]/60 shadow-[0_4px_0_0_rgba(0,0,0,0.18)] flex items-center gap-2 flex-shrink-0 transition-transform hover:scale-105 active:scale-95"
              >
                <span>{tip.icon}</span>
                <span>{tip.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BLOG PREVIEW SECTION */}
      <section className="bg-[#FFFDF0] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-black text-3xl md:text-5xl text-[#013E37] text-center mb-12">
            From the Kitchen Desk
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                onClick={() => navigate(`/blog/${post.id}`)}
                className="clay-card overflow-hidden flex flex-col justify-between cursor-pointer select-none"
              >
                {/* Category Gradient Header */}
                <div 
                  className="h-28 flex items-center justify-center p-4 text-center rounded-t-3xl"
                  style={{ background: getBlogHeaderGradient(post.colorTheme) }}
                >
                  <span className="bg-[#FFF8D6] text-[#013E37] text-xs font-bold font-body px-3.5 py-1 rounded-full shadow-[0_2px_0_rgba(1,62,55,0.15)]">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    {/* Read time and Date */}
                    <div className="flex justify-between text-xs text-[#5C5C3D] font-body mb-2">
                      <span>⏱️ {post.readTime} min read</span>
                      <span>{post.date}</span>
                    </div>
                    {/* Title */}
                    <h3 className="font-display font-bold text-xl text-[#013E37] leading-snug mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    {/* Excerpt */}
                    <p className="font-body text-sm text-[#5C5C3D] line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <span className="text-[#F58F20] font-sans font-bold text-sm hover:text-[#013E37] transition-colors self-start mt-2">
                    Read Article →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. NEWSLETTER BANNER */}
      <NewsletterBanner />
    </m.div>
  );
}

// Wrapper for Framer motion naming
import { motion as m } from 'framer-motion';
