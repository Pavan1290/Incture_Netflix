import { createContext, useMemo, useState } from 'react'

const AuthContext = createContext()

function AuthProvider({ children }) {
  const [authed, setAuthed] = useState(() => {
    try { return localStorage.getItem('pavans-netflix-auth') === '1' } catch { /* ignore storage errors */ return false }
  })

  const signIn = (id) => {
    try {
      localStorage.setItem('pavans-netflix-auth', '1')
      if (id) localStorage.setItem('pavans-netflix-last-id', id)
    } catch { /* ignore storage errors */ }
    setAuthed(true)
  }

  const signOut = () => {
    try { localStorage.removeItem('pavans-netflix-auth') } catch { /* ignore storage errors */ }
    setAuthed(false)
  }

  const value = useMemo(() => ({ authed, signIn, signOut }), [authed])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.Context = AuthContext

export default AuthProvider
