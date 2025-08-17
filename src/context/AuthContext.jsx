import { createContext, useMemo, useState } from 'react'

const AuthContext = createContext()

function AuthProvider({ children }) {
  const [authed, setAuthed] = useState(() => {
    try { return localStorage.getItem('pavans-netflix-auth') === '1' } catch (e) { void e; return false }
  })

  const signIn = (id) => {
    try {
      localStorage.setItem('pavans-netflix-auth', '1')
      if (id) localStorage.setItem('pavans-netflix-last-id', id)
  } catch (e) { void e }
    setAuthed(true)
  }

  const signOut = () => {
  try { localStorage.removeItem('pavans-netflix-auth') } catch (e) { void e }
    setAuthed(false)
  }

  const value = useMemo(() => ({ authed, signIn, signOut }), [authed])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.Context = AuthContext

export default AuthProvider
