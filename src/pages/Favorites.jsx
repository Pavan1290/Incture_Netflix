import { useContext } from 'react'
import FavoritesProvider from '../context/FavoritesContext'
import MovieCard from '../components/MovieCard'

export default function Favorites() {
  const { favorites } = useContext(FavoritesProvider.Context)
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5 m-0">Favorites</h2>
      </div>
      {favorites.length === 0 ? (
        <div className="text-center text-secondary py-5">No favorites yet.</div>
      ) : (
        <div className="row g-3">
          {favorites.map(m => (
            <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={m.id}>
              <MovieCard movie={m} showActions />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
