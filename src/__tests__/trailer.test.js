import { describe, it, expect } from 'vitest'
import { getTrailerUrl } from '../utils/trailer'

describe('trailer url', () => {
  it('builds youtube search url with title and year', () => {
    const url = getTrailerUrl({ title: 'Inception', year: 2010 })
    expect(url).toContain('https://www.youtube.com/results')
    expect(decodeURIComponent(url)).toContain('Inception 2010 official trailer')
  })

  it('handles missing year', () => {
    const url = getTrailerUrl({ title: 'RRR' })
    expect(decodeURIComponent(url)).toContain('RRR official trailer')
  })
})
