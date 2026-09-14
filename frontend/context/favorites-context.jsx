"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import FavoritesStorage from "@/utils/favorites-storage";

const FavoritesContext = createContext(null);

/**
 * @typedef {Object} FavoritesContextValue
 * @property {(string|number)[]} favorites list of stored favorite IDs
 * @property {boolean} isLoaded whether favorites have been loaded from localStorage
 * @property {(id: string|number) => boolean} hasFavorite checks if an ID is in favorites
 * @property {(id: string|number) => boolean} toggleFavorite adds or removes an ID from favorites and returns whether it was added
 */

/**
 * Provides favorites state and storage to child components.
 *
 * @param {Object} props component props
 * @param {React.ReactNode} props.children child elements
 *
 * @returns {JSX.Element} the favorites context provider
 */
export function FavoritesProvider({ children }) {
  const storage = useMemo(() => new FavoritesStorage(), []);
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setFavorites(storage.getAll());
    setIsLoaded(true);
  }, [storage]);

  const toggleFavorite = (id) => {
    const isAdded = storage.toggleFavorite(id);
    setFavorites(storage.getAll());

    return isAdded;
  };

  const hasFavorite = (id) => favorites.includes(id);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isLoaded,
        hasFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

/**
 * Hook to access favorites state and manipulation methods from FavoritesContext.
 *
 * @throws {Error} if invoked outside of a FavoritesProvider
 *
 * @returns {FavoritesContextValue} the favorites context value
 */
export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }

  return context;
}
