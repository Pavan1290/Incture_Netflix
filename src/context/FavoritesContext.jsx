import { createContext, useEffect, useMemo, useState } from 'react'

const FavoritesContext = createContext()

function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('favorites') || '[]') } catch { return [] }
  })
  useEffect(() => { localStorage.setItem('favorites', JSON.stringify(favorites)) }, [favorites])
  const value = useMemo(() => ({
    favorites,
    addFavorite: (movie) => setFavorites((prev) => (prev.some((m) => m.id === movie.id) ? prev : [...prev, movie])),
    removeFavorite: (id) => setFavorites((prev) => prev.filter((m) => m.id !== id)),
    isFavorite: (id) => favorites.some((m) => m.id === id)
  }), [favorites])
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

FavoritesProvider.Context = FavoritesContext

export default FavoritesProvider
