import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import FavoritesProvider from '../context/FavoritesContext'
import Poster from './Poster'

export default function MovieCard({ movie, showActions = false }) {
  const { removeFavorite } = useContext(FavoritesProvider.Context)
  const navigate = useNavigate()
  return (
    <div className="card h-100 bg-dark text-light border-0 shadow-sm" role="button" onClick={() => navigate(`/movie/${movie.id}`)}>
  <Poster movie={movie} className="card-img-top" style={{ aspectRatio: '2 / 3', objectFit: 'cover' }} />
      <div className="card-body d-flex flex-column">
        <h6 className="card-title mb-1">{movie.title}</h6>
        <div className="small text-secondary mb-2">⭐ {movie.rating} · {movie.genre} · {movie.year}</div>
        {showActions && (
          <div className="mt-auto d-flex gap-2">
            <button className="btn btn-outline-warning btn-sm" onClick={(e) => { e.stopPropagation(); removeFavorite(movie.id) }}>Remove</button>
          </div>
        )}
      </div>
    </div>
  )
}
