import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';

export default function Footer() {
  const categories = ['Main Course', 'Breakfast', 'Dessert', 'Snack', 'Drink', 'Soup'];

  return (
    <footer className="bg-[#012B25] text-[#FFEFB3] pt-16 pb-8 border-t-4 border-[#D4C97A]/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Column 1: Logo, Tagline, Socials & Contact */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-1.5 select-none">
              <span className="text-3xl">🍃</span>
              <span className="font-display font-black text-2xl text-[#FFEFB3]">Flavor</span>
              <span className="font-display font-black text-2xl text-[#F58F20]">Nest</span>
            </Link>
            <p className="font-body text-white/70 text-sm max-w-xs leading-relaxed">
              Discover delicious recipes, master kitchen techniques, and find cooking inspiration to feed your passion for flavor.
            </p>

            {/* Contact Details */}
            <div className="flex flex-col gap-2.5 mt-2 text-sm font-body">
              <a
                href="tel:9949411053"
                className="flex items-center gap-2.5 text-white/80 hover:text-[#F58F20] transition-colors w-fit group"
              >
                <div className="w-8 h-8 rounded-full bg-[#013E37] flex items-center justify-center border-2 border-[#D4C97A]/20 shadow-[0_3px_0_rgba(0,0,0,0.25)] group-hover:-translate-y-0.5 group-hover:shadow-[0_4px_0_rgba(0,0,0,0.25)] active:translate-y-0.5 active:shadow-[0_1px_0_rgba(0,0,0,0.25)] transition-all">
                  <Phone size={14} className="text-[#FFEFB3]" />
                </div>
                <span>+91 99494 11053</span>
              </a>
              <a
                href="mailto:gr179650@gmail.com"
                className="flex items-center gap-2.5 text-white/80 hover:text-[#F58F20] transition-colors w-fit group"
              >
                <div className="w-8 h-8 rounded-full bg-[#013E37] flex items-center justify-center border-2 border-[#D4C97A]/20 shadow-[0_3px_0_rgba(0,0,0,0.25)] group-hover:-translate-y-0.5 group-hover:shadow-[0_4px_0_rgba(0,0,0,0.25)] active:translate-y-0.5 active:shadow-[0_1px_0_rgba(0,0,0,0.25)] transition-all">
                  <Mail size={14} className="text-[#FFEFB3]" />
                </div>
                <span>gr179650@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-bold text-lg text-white tracking-wide border-b border-[#D4C97A]/20 pb-2">
              Quick Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-3 text-sm font-body">
              <li>
                <Link to="/" className="text-white/80 hover:text-[#F58F20] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/recipes" className="text-white/80 hover:text-[#F58F20] transition-colors">
                  Recipes
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/80 hover:text-[#F58F20] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/tips" className="text-white/80 hover:text-[#F58F20] transition-colors">
                  Kitchen Tips
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-[#F58F20] transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-bold text-lg text-white tracking-wide border-b border-[#D4C97A]/20 pb-2">
              Explore Categories
            </h4>
            <ul className="grid grid-cols-2 gap-3 text-sm font-body">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/recipes?category=${encodeURIComponent(cat)}`}
                    className="text-white/80 hover:text-[#F58F20] transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>


        {/* Thin Butter Divider */}
        <div className="border-t border-[#D4C97A]/20 my-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-body text-white/50 gap-4">
          <p>Made with 🍃 by FlavorNest © 2026.</p>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
