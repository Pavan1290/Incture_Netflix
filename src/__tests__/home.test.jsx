import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '../pages/Home'

describe('Home page', () => {
  it('renders Browse and Languages sections', async () => {
    render(<Home />)
    expect(screen.getByText('Browse')).toBeInTheDocument()
    expect(screen.getByText('Languages')).toBeInTheDocument()
  })
})
