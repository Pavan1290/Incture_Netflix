import { useMemo } from 'react'

export default function Poster({ movie, className = '', style = {}, alt }) {
  const FALLBACK = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="%23222"/><stop offset="1" stop-color="%23111"/></linearGradient></defs><rect width="100%" height="100%" fill="url(%23g)"/><g fill="%23bbb" font-family="Arial, Helvetica, sans-serif" text-anchor="middle"><text x="200" y="280" font-size="28">Poster</text><text x="200" y="320" font-size="18">Not Available</text></g></svg>'
  const src = useMemo(() => (typeof movie.img === 'string' && movie.img) ? movie.img : FALLBACK, [movie])
  return <img src={src} alt={alt || movie.title} className={className} style={style} onError={(e)=>{ e.currentTarget.src=FALLBACK }} />
}
