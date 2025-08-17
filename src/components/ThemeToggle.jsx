import { useContext } from 'react'
import ThemeProvider from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeProvider.Context)
  const isLight = theme !== 'dark'
  return (
    <button
      type="button"
      className={`theme-toggle ${isLight ? 'is-light' : 'is-dark'}`}
      onClick={toggleTheme}
      aria-pressed={isLight}
      title={isLight ? 'Switch to Dark' : 'Switch to Light'}
    >
      <span className="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.45 14.32l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM12 4V1h-0v3h0zm0 19v-3h0v3h0zM4 12H1v0h3v0zm19 0h-3v0h3v0zM6.76 19.16l-1.42 1.42-1.79-1.8 1.41-1.41 1.8 1.79zM19.16 6.76l1.4-1.4 1.8 1.79-1.41 1.41-1.79-1.8zM12 6a6 6 0 100 12 6 6 0 000-12z"/></svg>
      </span>
      <span className="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21.752 15.002a9 9 0 01-12.754-12.75A9 9 0 1021.752 15z"/></svg>
      </span>
      <span className="theme-toggle__knob" />
    </button>
  )
}
