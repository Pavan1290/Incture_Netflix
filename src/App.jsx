import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
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

export default function App() {
  const [splashDone, setSplashDone] = useState(false)
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <BrowserRouter>
          {!splashDone && <Splash onDone={() => setSplashDone(true)} />}
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movie/:id" element={<Details />} />
          </Routes>
          <footer className="footer text-center text-secondary py-4">© {new Date().getFullYear()} Pavan's Netflix</footer>
        </BrowserRouter>
      </FavoritesProvider>
    </ThemeProvider>
  )
}
