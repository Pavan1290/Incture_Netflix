
export function getTrailerUrl(movie) {
  const title = movie?.title || ''
  const year = movie?.year ? ` ${movie.year}` : ''
  const q = encodeURIComponent(`${title}${year} official trailer`)
  return `https://www.youtube.com/results?search_query=${q}`
}
