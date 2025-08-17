import { Link, NavLink } from 'react-router-dom'
import { useContext, useEffect, useMemo, useState } from 'react'
import ThemeProvider from '../context/ThemeContext'
import ThemeToggle from './ThemeToggle'
import AuthProvider from '../context/AuthContext'

export default function Navbar() {
  const { theme } = useContext(ThemeProvider.Context)
  const { authed } = useContext(AuthProvider.Context)
  const [avatar, setAvatar] = useState('')
  const [loginId, setLoginId] = useState('')

  useEffect(() => {
    if (!authed) return
    try {
      const user = JSON.parse(localStorage.getItem('pavans-netflix-user') || 'null')
      const lastId = localStorage.getItem('pavans-netflix-last-id') || ''
      setLoginId(user?.email || user?.username || lastId || '')
      const storedAvatar = localStorage.getItem('pavans-netflix-avatar')
      if (storedAvatar) setAvatar(storedAvatar)
    } catch { /* ignore */ }
  }, [authed])

  const initials = useMemo(() => (loginId?.trim()?.[0] || 'P').toUpperCase(), [loginId])

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
      <div className="container-fluid">
  <Link className="navbar-brand fw-bold text-danger" to="/">Pavan's Netflix</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/favorites">Favorites</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/search">Search</NavLink></li>
          </ul>
          <div className="d-flex align-items-center gap-3 ms-auto">
            <small className="text-secondary d-none d-md-inline">{theme==='dark'?'Dark':'Light'}</small>
            <ThemeToggle />
            {authed && (
              <Link to="/profile" className="text-decoration-none d-flex align-items-center" title="Profile">
                {avatar ? (
                  <img src={avatar} alt="Profile" className="rounded-circle" style={{width:32,height:32,objectFit:'cover'}} />
                ) : (
                  <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center" style={{width:32,height:32,fontSize:12}}>{initials}</div>
                )}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
