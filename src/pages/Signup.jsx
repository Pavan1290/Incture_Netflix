import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useMemo, useState } from 'react'
import '../styles/auth.css'
import { passwordStrengthHints, validateEmail, validatePassword, validateUsername } from '../utils/validation'
import AuthProvider from '../context/AuthContext'

export default function Signup() {
  const nav = useNavigate()
  const { signIn } = useContext(AuthProvider.Context)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [focus, setFocus] = useState({ username:false, email:false, password:false, confirm:false })

  useEffect(() => { document.body.classList.add('auth-bg'); return () => document.body.classList.remove('auth-bg') }, [])

  const hints = useMemo(() => passwordStrengthHints(password), [password])
  const passOK = validatePassword(password)
  const userOK = validateUsername(username)
  const emailOK = validateEmail(email)
  const matchOK = confirm === password && password.length > 0
  const canSubmit = userOK && emailOK && passOK && matchOK

  function onSubmit(e) {
    e.preventDefault()
    if (!canSubmit) return
  try { localStorage.setItem('pavans-netflix-user', JSON.stringify({ username, email })) } catch (e) { void e }
    signIn(username)
    nav('/')
  }

  const showUserHint = focus.username && username.trim().length > 0 && !userOK
  const showEmailHint = focus.email && email.trim().length > 0 && !emailOK
  const showPasswordHints = focus.password && password.length > 0
  const showConfirmHint = focus.confirm && confirm.length > 0 && !matchOK

  return (
    <div className="auth-overlay min-vh-100">
      <nav className="navbar bg-transparent">
        <div className="container">
          <Link className="navbar-brand fw-bold text-danger" to="/">Pavan's Netflix</Link>
        </div>
      </nav>
      <div className="container d-flex justify-content-center align-items-start align-items-md-center py-4 py-md-5">
        <form className="auth-card w-100" onSubmit={onSubmit}>
          <h1 className="mb-3">Create account</h1>
          <div className="mb-3">
            <input
              type="text"
              className="form-control auth-input"
              placeholder="Username (letters only, min 5)"
              value={username}
              onChange={e=>setUsername(e.target.value)}
              onFocus={()=>setFocus(f=>({...f,username:true}))}
              onBlur={()=>setFocus(f=>({...f,username:false}))}
            />
            {showUserHint && <div className="text-warning small mt-1">Only letters, minimum 5, no numbers or special characters.</div>}
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control auth-input"
              placeholder="Email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              onFocus={()=>setFocus(f=>({...f,email:true}))}
              onBlur={()=>setFocus(f=>({...f,email:false}))}
            />
            {showEmailHint && <div className="text-warning small mt-1">Enter a valid email address.</div>}
          </div>
          <div className="mb-2">
            <input
              type="password"
              className="form-control auth-input"
              placeholder="Password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              onFocus={()=>setFocus(f=>({...f,password:true}))}
              onBlur={()=>setFocus(f=>({...f,password:false}))}
            />
            {showPasswordHints && (
              <div className="auth-helper text-secondary mt-2">
                <ul className="strength-list">
                  <li className={hints.length? 'strength-ok':'strength-bad'}>8+ characters</li>
                  <li className={hints.upper? 'strength-ok':'strength-bad'}>Uppercase letter</li>
                  <li className={hints.lower? 'strength-ok':'strength-bad'}>Lowercase letter</li>
                  <li className={hints.digit? 'strength-ok':'strength-bad'}>Number</li>
                  <li className={hints.special? 'strength-ok':'strength-bad'}>Special character</li>
                </ul>
              </div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control auth-input"
              placeholder="Confirm password"
              value={confirm}
              onChange={e=>setConfirm(e.target.value)}
              onFocus={()=>setFocus(f=>({...f,confirm:true}))}
              onBlur={()=>setFocus(f=>({...f,confirm:false}))}
            />
            {showConfirmHint && <div className="text-warning small mt-1">Passwords must match.</div>}
          </div>
          <button className="btn btn-danger w-100 mt-2" disabled={!canSubmit}>Create account</button>
          <div className="text-secondary mt-3">Already have an account? <Link to="/login" className="text-white">Sign in</Link>.</div>
        </form>
      </div>
      <footer className="footer-lite text-center text-secondary py-3">© {new Date().getFullYear()} Pavan's Netflix</footer>
    </div>
  )
}
