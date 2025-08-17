import { useContext, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import data from '../store/movies'
import Poster from '../components/Poster'
import MovieCard from '../components/MovieCard'
import FavoritesProvider from '../context/FavoritesContext'

export default function Details() {
  const { id } = useParams()
  const movie = useMemo(() => data.find(m => String(m.id) === String(id)), [id])
  const similar = useMemo(() => data.filter(m => m.genre === movie?.genre && m.id !== movie?.id).slice(0, 6), [movie])

  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesProvider.Context)
  if (!movie) return <div className="container py-5 text-secondary">Movie not found.</div>

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-12 col-md-4">
          <Poster movie={movie} className="img-fluid rounded" />
        </div>
        <div className="col-12 col-md-8">
          <h1 className="h4 mb-2">{movie.title}</h1>
          <div className="text-secondary small mb-2">{movie.genre} · {movie.year} · ⭐ {movie.rating}</div>
          <p className="mb-3">{movie.description}</p>
          <div className="d-flex gap-2">
            <a href="#play" className="btn btn-primary">Play</a>
            <a href="#trailer" className="btn btn-outline-secondary">Trailer</a>
            {isFavorite(movie.id) ? (
              <button className="btn btn-outline-warning" onClick={()=>removeFavorite(movie.id)}>Remove Favorite</button>
            ) : (
              <button className="btn btn-warning" onClick={()=>addFavorite(movie)}>Add to Favorites</button>
            )}
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <h2 className="h5 mb-3">More like this</h2>
      <div className="row g-3">
        {similar.map(m => (
          <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={m.id}>
            <MovieCard movie={m} />
          </div>
        ))}
      </div>
    </div>
  )
}
