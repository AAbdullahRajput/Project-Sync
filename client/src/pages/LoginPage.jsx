import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import toast from 'react-hot-toast'

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

const EyeOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

const LogoMark = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="#6366f1"/>
    <rect x="8" y="8" width="7" height="7" rx="1.5" fill="white"/>
    <rect x="17" y="8" width="7" height="7" rx="1.5" fill="white" opacity="0.6"/>
    <rect x="8" y="17" width="7" height="7" rx="1.5" fill="white" opacity="0.6"/>
    <rect x="17" y="17" width="7" height="7" rx="1.5" fill="white" opacity="0.3"/>
  </svg>
)

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)

const features = [
  'Drag-and-drop Kanban boards',
  'Real-time team collaboration',
  'Priority tracking & due dates',
  'Comments & activity history',
]

// ─── Component ────────────────────────────────────────────────────────────────
export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [focused, setFocused] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(form.email, form.password)
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: #080a12;
          color: #e2e8f0;
        }

        .login-page {
          min-height: 100vh;
          display: flex;
          background: #080a12;
          position: relative;
          overflow: hidden;
        }

        /* Ambient background glows */
        .login-page::before {
          content: '';
          position: fixed;
          top: -200px;
          left: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .login-page::after {
          content: '';
          position: fixed;
          bottom: -200px;
          right: -100px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Left Panel ── */
        .left-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px;
          position: relative;
          z-index: 1;
          border-right: 1px solid rgba(255,255,255,0.05);
        }

        .left-panel-inner {
          max-width: 480px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 64px;
        }
        .brand-name {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #f1f5f9;
          letter-spacing: -0.3px;
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(99,102,241,0.15);
          border: 1px solid rgba(99,102,241,0.3);
          border-radius: 100px;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 500;
          color: #a5b4fc;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 24px;
        }
        .eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #6366f1;
          animation: pulse-dot 2s infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .hero-title {
          font-family: 'Syne', sans-serif;
          font-size: 48px;
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -2px;
          color: #f8fafc;
          margin-bottom: 20px;
        }
        .hero-title span {
          background: linear-gradient(135deg, #818cf8, #6366f1, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: 16px;
          color: #64748b;
          line-height: 1.7;
          margin-bottom: 48px;
          font-weight: 400;
        }

        .feature-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          color: #94a3b8;
        }
        .feature-check {
          width: 22px;
          height: 22px;
          border-radius: 6px;
          background: rgba(99,102,241,0.2);
          border: 1px solid rgba(99,102,241,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #818cf8;
          flex-shrink: 0;
        }

        /* Floating card preview */
        .preview-card {
          margin-top: 48px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          gap: 12px;
          align-items: flex-start;
          backdrop-filter: blur(10px);
        }
        .preview-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .preview-text h4 {
          font-size: 13px;
          font-weight: 600;
          color: #f1f5f9;
          margin-bottom: 4px;
        }
        .preview-text p {
          font-size: 12px;
          color: #475569;
          line-height: 1.5;
        }
        .preview-avatars {
          display: flex;
          margin-top: 10px;
        }
        .preview-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid #080a12;
          margin-left: -6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          font-weight: 700;
          color: white;
        }
        .preview-avatar:first-child { margin-left: 0; background: #6366f1; }
        .preview-avatar:nth-child(2) { background: #ec4899; }
        .preview-avatar:nth-child(3) { background: #f59e0b; }
        .preview-tag {
          font-size: 10px;
          color: #22c55e;
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: 4px;
          padding: 2px 7px;
          margin-left: 8px;
          align-self: center;
        }

        /* ── Right Panel (Form) ── */
        .right-panel {
          width: 520px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 56px;
          position: relative;
          z-index: 1;
          background: rgba(255,255,255,0.015);
        }

        .form-header {
          margin-bottom: 40px;
        }
        .form-welcome {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #f8fafc;
          letter-spacing: -0.8px;
          margin-bottom: 8px;
        }
        .form-sub {
          font-size: 14px;
          color: #475569;
        }
        .form-sub a {
          color: #818cf8;
          text-decoration: none;
          font-weight: 500;
        }
        .form-sub a:hover { color: #a5b4fc; }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          margin: 32px 0;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 8px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .field label {
          font-size: 12px;
          font-weight: 500;
          color: #94a3b8;
          letter-spacing: 0.4px;
          text-transform: uppercase;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .input-icon {
          position: absolute;
          left: 14px;
          color: #334155;
          display: flex;
          align-items: center;
          pointer-events: none;
          transition: color 0.2s;
        }
        .input-wrapper.focused .input-icon {
          color: #6366f1;
        }

        .field input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 13px 42px;
          color: #f1f5f9;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .field input::placeholder { color: #334155; }
        .field input:focus {
          border-color: rgba(99,102,241,0.5);
          background: rgba(99,102,241,0.05);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.08);
        }

        .eye-btn {
          position: absolute;
          right: 14px;
          background: none;
          border: none;
          color: #334155;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 4px;
          border-radius: 4px;
          transition: color 0.2s;
        }
        .eye-btn:hover { color: #94a3b8; }

        .forgot-link {
          text-align: right;
          margin-top: 4px;
        }
        .forgot-link a {
          font-size: 12px;
          color: #475569;
          text-decoration: none;
          transition: color 0.2s;
        }
        .forgot-link a:hover { color: #818cf8; }

        .submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #6366f1, #7c3aed);
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 14px;
          font-size: 15px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 28px;
          transition: transform 0.15s, box-shadow 0.15s, opacity 0.2s;
          position: relative;
          overflow: hidden;
          letter-spacing: 0.2px;
        }
        .submit-btn::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s;
        }
        .submit-btn:hover::before { left: 100%; }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 25px rgba(99,102,241,0.4);
        }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .register-prompt {
          text-align: center;
          margin-top: 28px;
          font-size: 13px;
          color: #334155;
        }
        .register-prompt a {
          color: #818cf8;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }
        .register-prompt a:hover { color: #a5b4fc; }

        .security-note {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.05);
          font-size: 11px;
          color: #1e293b;
          justify-content: center;
        }
        .security-note svg { color: #334155; }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .left-panel { display: none; }
          .right-panel { width: 100%; padding: 40px 32px; }
        }
        @media (max-width: 480px) {
          .right-panel { padding: 32px 20px; }
          .form-welcome { font-size: 24px; }
        }
      `}</style>

      <div className="login-page">
        {/* Left branding panel */}
        <div className="left-panel">
          <div className="left-panel-inner">
            <div className="brand">
              <LogoMark />
              <span className="brand-name">ProjectSync</span>
            </div>

            <div className="hero-eyebrow">
              <span className="eyebrow-dot" />
              Project Management
            </div>

            <h1 className="hero-title">
              Ship projects<br />
              <span>faster, together.</span>
            </h1>

            <p className="hero-sub">
              A modern Kanban workspace for high-performance teams. Organize, track, and deliver everything in one place.
            </p>

            <div className="feature-list">
              {features.map((f) => (
                <div className="feature-item" key={f}>
                  <div className="feature-check"><CheckIcon /></div>
                  {f}
                </div>
              ))}
            </div>

            <div className="preview-card">
              <div className="preview-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                </svg>
              </div>
              <div className="preview-text">
                <h4>Sprint Dashboard</h4>
                <p>3 active sprints · 12 tasks in review</p>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                  <div className="preview-avatars">
                    <div className="preview-avatar">A</div>
                    <div className="preview-avatar">S</div>
                    <div className="preview-avatar">R</div>
                  </div>
                  <span className="preview-tag">Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="right-panel">
          <div className="form-header">
            {/* Mobile logo */}
            <div className="brand" style={{ display: 'none' }}>
              <LogoMark />
              <span className="brand-name">ProjectSync</span>
            </div>
            <h2 className="form-welcome">Welcome back</h2>
            <p className="form-sub">
              New here? <Link to="/register">Create an account</Link>
            </p>
          </div>

          <div className="divider" />

          <form onSubmit={handleSubmit}>
            <div className="field-group">
              <div className="field">
                <label htmlFor="email">Email address</label>
                <div className={`input-wrapper ${focused === 'email' ? 'focused' : ''}`}>
                  <span className="input-icon"><MailIcon /></span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused('')}
                    placeholder="you@company.com"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="password">Password</label>
                <div className={`input-wrapper ${focused === 'password' ? 'focused' : ''}`}>
                  <span className="input-icon"><LockIcon /></span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused('')}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPassword(v => !v)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                <div className="forgot-link">
                  <a href="#">Forgot password?</a>
                </div>
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <><span className="spinner" /> Signing in...</>
              ) : (
                <>Sign In <ArrowRightIcon /></>
              )}
            </button>
          </form>

          <p className="register-prompt">
            Don't have an account? <Link to="/register">Sign up free</Link>
          </p>

          <div className="security-note">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Secured with 256-bit encryption · Your data is safe
          </div>
        </div>
      </div>
    </>
  )
}