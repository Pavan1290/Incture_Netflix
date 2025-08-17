import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useContext, useState } from 'react'
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
import AuthProvider from './context/AuthContext'

function RequireAuth({ children }) {
  const { authed } = useContext(AuthProvider.Context)
  const location = useLocation()
  if (!authed) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}

export default function App() {
  const [splashDone, setSplashDone] = useState(false)

  return (
    <ThemeProvider>
      <FavoritesProvider>
        <AuthProvider>
          <BrowserRouter>
            {!splashDone && <Splash onDone={() => setSplashDone(true)} />}
            <AppRoutes splashDone={splashDone} />
          </BrowserRouter>
        </AuthProvider>
      </FavoritesProvider>
    </ThemeProvider>
  )
}

function AppRoutes({ splashDone }) {
  const { authed } = useContext(AuthProvider.Context)
  if (splashDone && !authed) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }
  return (
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
  )
}
