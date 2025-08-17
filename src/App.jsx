import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Search from './pages/Search'
import Details from './pages/Details'
import ThemeProvider from './context/ThemeContext'
import FavoritesProvider from './context/FavoritesContext'
import Splash from './components/Splash'
import Login from './pages/Login'
import Signup from './pages/Signup'

function RequireAuth({ children }) {
  const authed = typeof window !== 'undefined' && localStorage.getItem('pavans-netflix-auth') === '1'
  const location = useLocation()
  if (!authed) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}

export default function App() {
  const [splashDone, setSplashDone] = useState(false)

  useEffect(() => {
    // no-op, splash handling occurs in render below
  }, [splashDone])

  return (
    <ThemeProvider>
      <FavoritesProvider>
        <BrowserRouter>
          {!splashDone && <Splash onDone={() => setSplashDone(true)} />}
          {/* If splash finished and not authenticated, show only auth routes */}
          {splashDone && !localStorage.getItem('pavans-netflix-auth') ? (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          ) : (
            <>
              <Navbar />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<RequireAuth><Favorites /></RequireAuth>} />
                <Route path="/search" element={<RequireAuth><Search /></RequireAuth>} />
                <Route path="/movie/:id" element={<RequireAuth><Details /></RequireAuth>} />
              </Routes>
              <footer className="footer text-center text-secondary py-4">© {new Date().getFullYear()} Pavan's Netflix</footer>
            </>
          )}
        </BrowserRouter>
      </FavoritesProvider>
    </ThemeProvider>
  )
}
