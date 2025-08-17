import { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthProvider from '../context/AuthContext'

export default function Profile() {
  const { authed, signOut } = useContext(AuthProvider.Context)
  const nav = useNavigate()
  const [avatar, setAvatar] = useState('')
  const [loginId, setLoginId] = useState('')
  const [passwordMasked, setPasswordMasked] = useState('********')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('pavans-netflix-user') || 'null')
      const lastId = localStorage.getItem('pavans-netflix-last-id') || ''
      setLoginId(user?.email || user?.username || lastId || '')
      const storedAvatar = localStorage.getItem('pavans-netflix-avatar')
      if (storedAvatar) setAvatar(storedAvatar)
      const passSet = localStorage.getItem('pavans-netflix-password-set') === '1'
      setPasswordMasked(passSet ? '********' : 'Not set')
    } catch { /* ignore storage errors */ }
  }, [authed])

  function onSignOut() {
    signOut()
    nav('/login', { replace: true })
  }

  function onPickAvatar(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result
      try { localStorage.setItem('pavans-netflix-avatar', dataUrl) } catch { /* ignore storage errors */ }
      setAvatar(String(dataUrl))
    }
    reader.readAsDataURL(file)
  }

  async function onSetPassword(e) {
    e.preventDefault()
    const pwd = (document.getElementById('profile-new-password') || {}).value || ''
    if (!pwd) return
    try { localStorage.setItem('pavans-netflix-password-set', '1') } catch { /* ignore storage errors */ }
    setPasswordMasked('********')
    setSaving(true)
    setTimeout(()=> setSaving(false), 500)
  }

  const initials = useMemo(() => (loginId?.trim()?.[0] || 'P').toUpperCase(), [loginId])

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h4 m-0">Your Profile</h1>
        <button className="btn btn-outline-danger" onClick={onSignOut}>Sign Out</button>
      </div>
      <div className="card bg-body-tertiary border-0 shadow-sm">
        <div className="card-body d-flex flex-column flex-md-row align-items-center gap-4">
          <div className="position-relative">
            {avatar ? (
              <img src={avatar} alt="Avatar" className="rounded-circle" style={{width:96,height:96,objectFit:'cover'}} />
            ) : (
              <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center" style={{width:96,height:96}}>{initials}</div>
            )}
            <label className="btn btn-sm btn-outline-secondary position-absolute bottom-0 start-50 translate-middle-x mt-2">
              Change
              <input type="file" accept="image/*" hidden onChange={onPickAvatar} />
            </label>
          </div>
          <div className="flex-fill w-100">
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label">Login ID</label>
                <input className="form-control" value={loginId} readOnly />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <input className="form-control" value={passwordMasked} readOnly />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <label htmlFor="profile-new-password" className="form-label">Set/Update Password (not stored in plain text)</label>
                <input id="profile-new-password" type="password" className="form-control" placeholder="New password" />
              </div>
              <div className="col-12 col-md-6 d-flex align-items-end">
                <button className="btn btn-primary" onClick={onSetPassword} disabled={saving}>{saving?'Saving...':'Save Password'}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
