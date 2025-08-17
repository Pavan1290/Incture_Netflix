import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useMemo, useState } from 'react'
import '../styles/auth.css'
import { passwordStrengthHints, validateEmail, validatePassword, validateUsername } from '../utils/validation'
import AuthProvider from '../context/AuthContext'

export default function Login() {
  const nav = useNavigate()
  const { signIn } = useContext(AuthProvider.Context)
  const [id, setId] = useState('') // username or email
  const [password, setPassword] = useState('')
  const [focus, setFocus] = useState({ id: false, password: false })

  useEffect(() => {
    document.body.classList.add('auth-bg')
    return () => document.body.classList.remove('auth-bg')
  }, [])

  const hints = useMemo(() => passwordStrengthHints(password), [password])
  const isEmailLike = id.includes('@')
  const idValid = isEmailLike ? validateEmail(id) : validateUsername(id)
  const canSubmit = idValid && validatePassword(password)

  function doSignIn() {
    signIn(id)
  try { alert(`Welcome ${id}!`) } catch (e) { void e }
    nav('/')
  }

  function onSubmit(e) {
    e.preventDefault()
    if (!canSubmit) return
    doSignIn()
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' && canSubmit) {
      e.preventDefault()
      doSignIn()
    }
  }

  const showIdHint = focus.id && id.trim().length > 0 && !idValid
  const showPasswordHints = focus.password && password.length > 0

  return (
    <div className="auth-overlay min-vh-100">
      <nav className="navbar bg-transparent">
        <div className="container">
          <Link className="navbar-brand fw-bold text-danger" to="/">Pavan's Netflix</Link>
        </div>
      </nav>
      <div className="container d-flex justify-content-center align-items-start align-items-md-center py-4 py-md-5">
        <form className="auth-card w-100" onSubmit={onSubmit}>
          <h1 className="mb-3">Sign In</h1>
          <div className="mb-3">
            <input
              type="text"
              className="form-control auth-input"
              placeholder="Email or username"
              value={id}
              onChange={e=>setId(e.target.value)}
              onFocus={()=>setFocus(f=>({...f,id:true}))}
              onBlur={()=>setFocus(f=>({...f,id:false}))}
              onKeyDown={onKeyDown}
            />
            {showIdHint && (
              <div className="text-warning small mt-1">
                {isEmailLike ? 'Enter a valid email address.' : 'Username must be letters only, minimum 5 characters.'}
              </div>
            )}
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
              onKeyDown={onKeyDown}
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
          <button
            type="submit"
            className="btn btn-danger w-100 mt-2"
            disabled={!canSubmit}
            onClick={(e)=>{ if(!canSubmit){ e.preventDefault(); return } }}
          >
            Sign In
          </button>
          <div className="text-secondary mt-3">New to Pavan's Netflix? <Link to="/signup" className="text-white">Create an account</Link>.</div>
        </form>
      </div>
      <footer className="footer-lite text-center text-secondary py-3">© {new Date().getFullYear()} Pavan's Netflix</footer>
    </div>
  )
}
