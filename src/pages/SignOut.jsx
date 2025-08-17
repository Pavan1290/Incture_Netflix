import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthProvider from '../context/AuthContext'

export default function SignOut() {
  const { signOut } = useContext(AuthProvider.Context)
  const nav = useNavigate()
  useEffect(() => {
    signOut()
    nav('/login', { replace: true })
  }, [signOut, nav])
  return null
}
