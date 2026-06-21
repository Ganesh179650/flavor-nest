import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      // State
      favorites: [],
      searchQuery: '',
      activeCategory: 'All',
      activeCuisine: 'All',
      activeDifficulty: 'All',
      newsletterEmail: '',
      newsletterSubmitted: false,

      // Actions
      toggleFavorite: (recipeId) =>
        set((state) => {
          const isFavorite = state.favorites.includes(recipeId);
          const newFavorites = isFavorite
            ? state.favorites.filter((id) => id !== recipeId)
            : [...state.favorites, recipeId];
          return { favorites: newFavorites };
        }),

      setSearch: (query) => set({ searchQuery: query }),
      
      setCategory: (cat) => set({ activeCategory: cat }),
      
      setCuisine: (cuisine) => set({ activeCuisine: cuisine }),
      
      setDifficulty: (diff) => set({ activeDifficulty: diff }),
      
      clearFilters: () =>
        set({
          searchQuery: '',
          activeCategory: 'All',
          activeCuisine: 'All',
          activeDifficulty: 'All',
        }),

      submitNewsletter: (email) =>
        set({
          newsletterEmail: email,
          newsletterSubmitted: true,
        }),
    }),
    {
      name: 'flavornest_store', // localStorage key
      partialize: (state) => ({
        favorites: state.favorites,
        newsletterEmail: state.newsletterEmail,
        newsletterSubmitted: state.newsletterSubmitted,
      }), // only persist favorites and newsletter state
    }
  )
);
