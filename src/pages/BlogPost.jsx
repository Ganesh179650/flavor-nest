import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blogPosts';
import { Clock, Calendar, ArrowLeft, Lightbulb } from 'lucide-react';

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center gap-4 bg-[#FFFDF0]">
        <span className="text-6xl">🔍</span>
        <h2 className="font-display font-bold text-2xl text-[#013E37]">Article Not Found</h2>
        <Link to="/blog" className="clay-btn">Back to Blog</Link>
      </div>
    );
  }

  // Get related articles (exclude current, up to 3)
  const relatedArticles = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  // Custom pull quotes and pro tips based on the article
  const getArticleExtras = (articleId) => {
    switch (articleId) {
      case 'knife-skills':
        return {
          pullQuote: "A dull knife is a cook's greatest hazard; respect the blade, and it will work with you.",
          tipText: "Honing vs Sharpening: Hone your knife with a steel rod every time you cook to keep the blade centered. Only sharpen it once or twice a year to grind a new edge."
        };
      case 'spice-pantry':
        return {
          pullQuote: "Spices do not just flavor a dish; they tell the story of its origin, travels, and soul.",
          tipText: "Freshness test: Crush a small amount of spice between your fingers. If the aroma doesn't immediately release, the spice is stale and should be replaced."
        };
      case 'sourdough-magic':
        return {
          pullQuote: "Flour, water, salt, and time. Sourdough teaches us that patience is the finest ingredient.",
          tipText: "If your kitchen is cold, ferment your dough inside an turned-off oven with only the oven light switched on. This creates a cozy 24-26°C environment."
        };
      case 'cast-iron-care':
        return {
          pullQuote: "A cast iron skillet isn't bought for a year; it is inherited for generations.",
          tipText: "Never let cast iron drip-dry! Always dry it completely on a stove burner over medium heat for 60 seconds, then rub a drop of oil onto it before storage."
        };
      case 'plant-protein':
        return {
          pullQuote: "Plant proteins represent a clean, nutrient-dense path to sustainable wellness.",
          tipText: "To make tofu absorb seasonings like a sponge, freeze the block of tofu, thaw it, and press the water out. The freezing creates spongy microscopic pockets."
        };
      case 'slow-cooking':
        return {
          pullQuote: "Slow cooking is the ultimate act of culinary patience, converting tough cuts into molten gold.",
          tipText: "Don't lift the lid! Every time you open a slow cooker, enough steam escapes to drop the internal temp and add 15-20 minutes to your total cooking time."
        };
      default:
        return {
          pullQuote: "Cooking is an expression of love, shared through flavor and texture.",
          tipText: "Mise en Place is key: Measure out all spices, sauces, and chopped veggies before turning on the burner to enjoy a relaxed, stress-free cooking flow."
        };
    }
  };

  const extras = getArticleExtras(post.id);

  // Divide content into paragraphs
  const paragraphs = post.content.split('\n\n');

  // Helper for blog card headers
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
      className="pt-16 min-h-screen bg-[#FFFDF0] pb-16"
    >
      <div className="max-w-[720px] mx-auto px-4 py-12 flex flex-col gap-8">
        
        {/* Back Link */}
        <Link
          to="/blog"
          className="flex items-center gap-1.5 text-xs font-bold text-[#F58F20] hover:text-[#013E37] transition-colors self-start"
        >
          <ArrowLeft size={14} />
          <span>Back to Kitchen Diaries</span>
        </Link>

        {/* 1. HEADER AREA */}
        <header className="flex flex-col gap-4 text-left">
          
          {/* Category, time and date row */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#5C5C3D] font-body">
            <span className="clay-tag text-[10px] py-0.5 px-3">
              {post.category}
            </span>
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{post.readTime} min read</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>{post.date}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-display font-black text-3xl sm:text-5xl text-[#013E37] leading-[1.1] mt-2">
            {post.title}
          </h1>

          {/* Author info card (clay mini card) */}
          <div className="clay-card p-4 bg-[#FFF8D6] flex items-center gap-3.5 mt-4 max-w-sm select-none border-2 border-[#D4C97A]/40 shadow-[0_4px_0_0_rgba(1,62,55,0.08)]">
            <div className="w-10 h-10 rounded-full bg-[#F58F20] text-white flex items-center justify-center font-display font-bold text-sm border border-white/20 shadow-sm">
              {post.initials}
            </div>
            <div className="text-left">
              <p className="font-sans font-black text-sm text-[#013E37] leading-none">{post.author}</p>
              <p className="font-body text-xs text-[#5C5C3D] mt-0.5">Culinary Writer • FlavorNest Team</p>
            </div>
          </div>

        </header>

        {/* Divider */}
        <div className="border-t-2 border-[#D4C97A]/30" />

        {/* 2. ARTICLE BODY */}
        <article className="font-body text-[#2A2A2A] text-lg leading-[1.8] flex flex-col gap-6 text-left">
          
          {/* Paragraph 1 */}
          <p>{paragraphs[0]}</p>

          {/* Paragraph 2 */}
          {paragraphs[1] && <p>{paragraphs[1]}</p>}

          {/* Pull Quote */}
          {extras.pullQuote && (
            <blockquote className="clay-card p-6 bg-[#FFF8D6] border-l-4 border-[#F58F20] my-4 select-none">
              <p className="font-script font-bold text-2xl md:text-3xl text-[#F58F20] leading-snug text-center">
                "{extras.pullQuote}"
              </p>
            </blockquote>
          )}

          {/* Paragraph 3 */}
          {paragraphs[2] && <p>{paragraphs[2]}</p>}

          {/* Tip Box */}
          {extras.tipText && (
            <div className="clay-card p-5 bg-[#FFEFB3] border-2 border-[#D4C97A]/60 flex items-start gap-4 my-4 select-none shadow-[inset_0_2px_4px_rgba(1,62,55,0.05)]">
              <div className="w-10 h-10 rounded-full bg-[#F58F20] text-white flex items-center justify-center flex-shrink-0 border border-white/20 shadow-sm">
                <Lightbulb size={20} className="text-white" />
              </div>
              <div>
                <span className="font-sans font-bold text-sm text-[#013E37] block mb-1">
                  Pro Chef Tip:
                </span>
                <p className="text-sm text-[#5C5C3D] leading-relaxed">
                  {extras.tipText}
                </p>
              </div>
            </div>
          )}

          {/* Paragraph 4 */}
          {paragraphs[3] && <p>{paragraphs[3]}</p>}

        </article>

        {/* Divider */}
        <div className="border-t-2 border-[#D4C97A]/30 mt-8" />

        {/* 3. RELATED ARTICLES SECTION */}
        <section className="mt-8">
          <h2 className="font-display font-bold text-2xl text-[#013E37] mb-6 text-left">
            Related Articles
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => navigate(`/blog/${article.id}`)}
                className="clay-card overflow-hidden cursor-pointer select-none bg-[#FFF8D6] shadow-[0_4px_8px_rgba(1,62,55,0.05)] border-2 border-[#D4C97A]/50 flex flex-col justify-between h-full hover:scale-[1.03] transition-transform"
              >
                {/* Gradient banner */}
                <div 
                  className="h-16 flex items-center justify-center p-2 rounded-t-3xl"
                  style={{ background: getGradient(article.colorTheme) }}
                >
                  <span className="bg-[#FFF8D6] text-[#013E37] text-[9px] font-sans font-bold px-2 py-0.5 rounded-full">
                    {article.category}
                  </span>
                </div>
                
                <div className="p-4 flex-1 flex flex-col justify-between gap-3 text-left">
                  <h3 className="font-display font-bold text-sm text-[#013E37] line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <span className="text-[10px] text-[#5C5C3D] font-body">
                    ⏱️ {article.readTime} min read
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </motion.div>
  );
}
