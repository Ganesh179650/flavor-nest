import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OfflineToast from './components/OfflineToast';

// Pages
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Tips from './pages/Tips';
import About from './pages/About';

export default function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF0]">
      {/* Navigation */}
      <Navbar />

      {/* Main Pages with Route Transitions */}
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipes/:id" element={<RecipeDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/about" element={<About />} />
            <Route
              path="*"
              element={
                <div className="pt-24 min-h-screen flex flex-col items-center justify-center gap-4 bg-[#FFFDF0]">
                  <span className="text-6xl">🧭</span>
                  <h2 className="font-display font-bold text-2xl text-[#013E37]">Page Not Found</h2>
                  <Link to="/" className="clay-btn">Go to Home</Link>
                </div>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>

      {/* Offline Warning */}
      <OfflineToast />

      {/* Footer */}
      <Footer />
    </div>
  );
}

import { Link } from 'react-router-dom';

