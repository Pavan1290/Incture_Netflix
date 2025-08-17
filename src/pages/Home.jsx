import { useEffect, useMemo, useState } from 'react'
import '../styles/home.css'
import data from '../store/movies'
import MovieCard from '../components/MovieCard'
import Loader from '../components/Loader'
import Poster from '../components/Poster'

export default function Home() {
  const [genre, setGenre] = useState('All')
  const [loading, setLoading] = useState(true)
  const genres = useMemo(() => ['All', ...Array.from(new Set(data.map(m => m.genre)))], [])
  useEffect(() => { const t = setTimeout(()=> setLoading(false), 400); return ()=>clearTimeout(t) }, [])
  const topByRating = useMemo(() => {
    const pick = (items, k) => {
      const pool = [...items]
      const out = []
      while (out.length < k && pool.length) {
        const total = pool.reduce((s, it) => s + (it.rating || 1), 0)
        let r = Math.random() * total
        let idx = 0
        for (; idx < pool.length; idx++) { r -= (pool[idx].rating || 1); if (r <= 0) break }
        out.push(pool[idx])
        pool.splice(idx, 1)
      }
      return out
    }
    return pick(data, 5)
  }, [])
  const filtered = useMemo(() => genre === 'All' ? data : data.filter(m => m.genre === genre), [genre])
  const languages = useMemo(() => ['All','English','Hindi','Kannada','Tamil','Telugu','Malayalam','Spanish','Korean','German','French'], [])
  const [lang, setLang] = useState('All')
  const byLanguage = useMemo(() => lang==='All' ? data : data.filter(m => m.language === lang), [lang])

  return (
    <div className="container-fluid p-0">
      <section className="position-relative text-light overflow-hidden">
        <div id="hero" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000" data-bs-pause="false">
          <div className="carousel-inner">
            {topByRating.map((m, idx) => (
              <div className={`carousel-item ${idx===0?'active':''}`} key={m.id}>
                <div className="ratio hero-ratio">
                  <Poster movie={m} className="hero-img" />
                </div>
                <div className="position-absolute start-0 end-0 bottom-0 p-4 hero-caption">
                  <h1 className="display-6 fw-bold">{m.title}</h1>
                  <p className="text-secondary small mb-0">{m.genre} · {m.year} · ⭐ {m.rating}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#hero" data-bs-slide="prev"><span className="carousel-control-prev-icon" aria-hidden="true"></span><span className="visually-hidden">Previous</span></button>
          <button className="carousel-control-next" type="button" data-bs-target="#hero" data-bs-slide="next"><span className="carousel-control-next-icon" aria-hidden="true"></span><span className="visually-hidden">Next</span></button>
        </div>
      </section>

      <section className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h5 m-0">Browse</h2>
          <select className="form-select w-auto" value={genre} onChange={(e)=>setGenre(e.target.value)}>
            {genres.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        {loading ? <Loader /> : (
        <div className="row g-3">
          {filtered.map(m => (
            <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={m.id}>
              <MovieCard movie={m} />
            </div>
          ))}
        </div>
        )}
      </section>

      <section className="container py-2">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h2 className="h6 m-0">Languages</h2>
        </div>
        <div className="d-flex flex-wrap lang-pills mb-3">
          {languages.map(l => (
            <button key={l} className={`btn btn-sm ${l===lang?'btn-primary':'btn-outline-secondary'} lang-pill`} onClick={()=>setLang(l)}>{l}</button>
          ))}
        </div>
        {loading ? <Loader /> : (
        <div className="row g-3">
          {byLanguage.map(m => (
            <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={m.id}>
              <MovieCard movie={m} />
            </div>
          ))}
        </div>
        )}
      </section>

 
    </div>
  )
}
