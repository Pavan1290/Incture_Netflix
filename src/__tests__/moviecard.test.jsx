import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import FavoritesProvider from '../context/FavoritesContext'

vi.stubGlobal('open', vi.fn())

const movie = { id: 1, title: 'Inception', rating: 9, genre: 'Sci-Fi', year: 2010 }

describe('MovieCard', () => {
  it('renders title and trailer button', () => {
    render(
      <MemoryRouter>
        <FavoritesProvider>
          <MovieCard movie={movie} />
        </FavoritesProvider>
      </MemoryRouter>
    )
    expect(screen.getByText('Inception')).toBeInTheDocument()
    expect(screen.getByText('Watch Trailer')).toBeInTheDocument()
  })

  it('opens trailer url in new tab on click', () => {
    render(
      <MemoryRouter>
        <FavoritesProvider>
          <MovieCard movie={movie} />
        </FavoritesProvider>
      </MemoryRouter>
    )
    fireEvent.click(screen.getByText('Watch Trailer'))
    expect(window.open).toHaveBeenCalled()
  })
})
