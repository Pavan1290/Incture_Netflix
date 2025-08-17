import { useEffect, useMemo, useState } from 'react'
import data from '../store/movies'
import MovieCard from '../components/MovieCard'
import Loader from '../components/Loader'

export default function Search() {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('All')
  const [loading, setLoading] = useState(false)
  const genres = useMemo(() => ['All', ...Array.from(new Set(data.map(m => m.genre)))], [])
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = genre === 'All' ? data : data.filter(m => m.genre === genre)
    return !q ? filtered : filtered.filter(m => m.title.toLowerCase().includes(q))
  }, [query, genre])
  useEffect(() => { setLoading(true); const t = setTimeout(()=> setLoading(false), 300); return ()=>clearTimeout(t) }, [query, genre])

  return (
    <div className="container py-4">
      <div className="row g-2 align-items-center mb-3">
        <div className="col-12 col-md-8">
          <input className="form-control" placeholder="Search by title" value={query} onChange={(e)=>setQuery(e.target.value)} />
        </div>
        <div className="col-12 col-md-4">
          <select className="form-select" value={genre} onChange={(e)=>setGenre(e.target.value)}>
            {genres.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
      </div>
      {loading ? <Loader /> : (
        <div className="row g-3">
          {results.map(m => (
            <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={m.id}>
              <MovieCard movie={m} />
            </div>
          ))}
          {results.length === 0 && (
            <div className="text-center text-secondary py-5 w-100">No results</div>
          )}
        </div>
      )}
    </div>
  )
}
