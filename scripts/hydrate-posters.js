/*
  Script: hydrate-posters.js
  Purpose: For each movie in src/store/movies.js, try to fetch an iTunes artwork URL.
  - If found, set movie.img to the URL
  - If not found, drop the movie from the list
  Writes back the updated file.
*/

import fs from 'fs'
import path from 'path'
import vm from 'vm'

const root = path.resolve(globalThis.process?.cwd?.() || '.')
const storePath = path.join(root, 'src', 'store', 'movies.js')

function readMoviesModule(filePath) {
  const code = fs.readFileSync(filePath, 'utf8')
  // Execute the module in a VM to get the movies array
  const sandbox = { exports: {}, module: { exports: {} } }
  // Convert "export default movies" to module.exports = movies
  const transformed = code.replace(/export\s+default\s+movies\s*;?\s*$/m, 'module.exports = movies;')
  vm.createContext(sandbox)
  const script = new vm.Script(transformed, { filename: 'movies.js' })
  script.runInContext(sandbox)
  const movies = sandbox.module.exports
  if (!Array.isArray(movies)) throw new Error('movies export not found')
  return movies
}

async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok) return null
  try { return await res.json() } catch { return null }
}

const normalize = (s) => String(s||'').toLowerCase().trim()
const yearOf = (d) => String(d||'').slice(0,4)

function pickResult(results, title, year) {
  if (!Array.isArray(results) || !results.length) return null
  const t = normalize(title)
  const exact = results.find(r => {
    const n = normalize(r.trackName || r.collectionName || r.artistName)
    const y = yearOf(r.releaseDate)
    return n === t && (!year || String(year) === y)
  })
  return exact || results[0]
}

function upscaleArtwork(url) {
  if (!url) return null
  return url.replace(/\/(\d+)x\1bb\./, '/1000x1000bb.').replace(/\/(\d+)x\d+bb\./, '/1000x1000bb.')
}

async function getArtworkUrl(movie) {
  const API = 'https://itunes.apple.com/search'
  const term = movie.title
  const indianLangs = new Set(['Hindi','Kannada','Tamil','Telugu','Malayalam'])
  const primary = indianLangs.has(movie.language) ? 'IN' : 'US'
  const stores = [primary, 'US', 'GB']
  let pick = null
  for (const country of stores) {
    const patterns = [term, `${term} ${movie.year||''}`, `${term} movie`]
    const attributes = ['movieTerm', 'movieArtistTerm']
    for (const q of patterns) {
      for (const attribute of attributes) {
        const url = `${API}?${new URLSearchParams({ term: q, media: 'movie', entity: 'movie', attribute, country, limit: 15 })}`
        const mv = await fetchJson(url)
        const mvPick = pickResult(mv?.results, term, movie.year)
        if (mvPick) { pick = mvPick; break }
      }
      if (pick) break
      const urlTv = `${API}?${new URLSearchParams({ term: q, media: 'tvShow', entity: 'tvSeason', country, limit: 15 })}`
      const tv = await fetchJson(urlTv)
      const tvPick = pickResult(tv?.results, term, movie.year)
      if (tvPick) { pick = tvPick; break }
    }
    if (pick) break
  }
  if (!pick) {
    for (const country of stores) {
      const url = `${API}?${new URLSearchParams({ term, media: 'music', entity: 'album', country, limit: 15 })}`
      const music = await fetchJson(url)
      const musicPick = pickResult(music?.results, term, movie.year)
      if (musicPick) { pick = musicPick; break }
    }
  }
  const art = upscaleArtwork(pick?.artworkUrl100 || pick?.artworkUrl60)
  return art || null
}


function writeMovies(filePath, movies) {
  const header = 'const movies = [\n'
  const body = movies.map(m => {
    // Keep ordering and fields; ensure strings are quoted and escaped
    return `    { id: ${m.id}, title: ${JSON.stringify(m.title)}, img: ${JSON.stringify(m.img||'')}, rating: ${m.rating}, genre: ${JSON.stringify(m.genre)}, year: ${m.year}, language:${JSON.stringify(m.language)}, description: ${JSON.stringify(m.description)} }`
  }).join(',\n')
  const footer = '\n]\n\nexport default movies\n'
  fs.writeFileSync(filePath, header + body + footer, 'utf8')
}

async function main() {
  console.log('Reading movies...')
  const movies = readMoviesModule(storePath)
  const updated = []
  let withImg = 0, withoutImg = 0
  for (const movie of movies) {
    try {
  let art = await getArtworkUrl(movie)
      if (art) {
        updated.push({ ...movie, img: art })
        withImg++
        console.log(`✔ Found image: ${movie.title}`)
      } else {
        withoutImg++
        console.log(`✖ No image: ${movie.title}`)
      }
    } catch (e) {
      withoutImg++
      console.log(`✖ Error for ${movie.title}: ${e.message}`)
    }
  }
  console.log(`Done. With images: ${withImg}, dropped: ${withoutImg}`)
  writeMovies(storePath, updated)
}

main().catch(err => { console.error(err); (globalThis.process?.exit ?? (()=>{}))(1) })
