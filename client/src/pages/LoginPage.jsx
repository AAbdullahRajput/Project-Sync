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
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)
const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)
const LogoMark = () => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
    <rect width="34" height="34" rx="9" fill="url(#lg)"/>
    <defs>
      <linearGradient id="lg" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6366f1"/>
        <stop offset="1" stopColor="#8b5cf6"/>
      </linearGradient>
    </defs>
    <rect x="8" y="8" width="7.5" height="7.5" rx="1.8" fill="white"/>
    <rect x="18.5" y="8" width="7.5" height="7.5" rx="1.8" fill="white" opacity="0.55"/>
    <rect x="8" y="18.5" width="7.5" height="7.5" rx="1.8" fill="white" opacity="0.55"/>
    <rect x="18.5" y="18.5" width="7.5" height="7.5" rx="1.8" fill="white" opacity="0.25"/>
  </svg>
)
const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const ShieldIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)
const BoardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
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
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: #080b14;
          color: #e2e8f0;
          -webkit-font-smoothing: antialiased;
        }

        /* ── Page shell ── */
        .lp-root {
          min-height: 100vh;
          display: flex;
          background: #080b14;
          position: relative;
          overflow: hidden;
        }

        /* Ambient glows */
        .lp-glow-tl {
          position: fixed; top: -180px; left: -180px;
          width: 520px; height: 520px;
          background: radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .lp-glow-br {
          position: fixed; bottom: -200px; right: -120px;
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }

        /* ── Left branding panel ── */
        .lp-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 56px 64px;
          position: relative;
          z-index: 1;
          border-right: 1px solid rgba(255,255,255,0.055);
          min-width: 0;
        }

        .lp-brand {
          display: flex;
          align-items: center;
          gap: 11px;
          margin-bottom: 60px;
        }
        .lp-brand-name {
          font-family: 'Syne', sans-serif;
          font-size: 19px;
          font-weight: 700;
          color: #f1f5f9;
          letter-spacing: -0.3px;
        }

        .lp-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(99,102,241,0.13);
          border: 1px solid rgba(99,102,241,0.28);
          border-radius: 100px;
          padding: 5px 14px 5px 10px;
          font-size: 11px;
          font-weight: 600;
          color: #a5b4fc;
          letter-spacing: 0.7px;
          text-transform: uppercase;
          margin-bottom: 22px;
        }
        .lp-pill-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #6366f1;
          animation: lp-pulse 2.2s ease-in-out infinite;
        }
        @keyframes lp-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.75); }
        }

        .lp-headline {
          font-family: 'Syne', sans-serif;
          font-size: clamp(36px, 4vw, 52px);
          font-weight: 800;
          line-height: 1.06;
          letter-spacing: -2.5px;
          color: #f8fafc;
          margin-bottom: 18px;
        }
        .lp-headline .accent {
          background: linear-gradient(135deg, #818cf8 0%, #6366f1 50%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .lp-sub {
          font-size: 15px;
          color: #4a5568;
          line-height: 1.75;
          margin-bottom: 44px;
          max-width: 380px;
          font-weight: 400;
        }

        .lp-features {
          display: flex;
          flex-direction: column;
          gap: 13px;
          margin-bottom: 44px;
        }
        .lp-feature {
          display: flex;
          align-items: center;
          gap: 11px;
          font-size: 14px;
          color: #94a3b8;
          font-weight: 400;
        }
        .lp-check {
          width: 23px; height: 23px;
          border-radius: 6px;
          background: rgba(99,102,241,0.18);
          border: 1px solid rgba(99,102,241,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #818cf8;
          flex-shrink: 0;
        }

        /* Mini preview card */
        .lp-preview {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 18px 20px;
          display: flex;
          gap: 13px;
          align-items: flex-start;
          max-width: 380px;
          backdrop-filter: blur(12px);
          position: relative;
          overflow: hidden;
        }
        .lp-preview::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent);
        }
        .lp-preview-icon {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 14px rgba(99,102,241,0.35);
        }
        .lp-preview-body h4 {
          font-size: 13px;
          font-weight: 600;
          color: #f1f5f9;
          margin-bottom: 3px;
        }
        .lp-preview-body p {
          font-size: 12px;
          color: #475569;
          line-height: 1.5;
        }
        .lp-preview-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 10px;
        }
        .lp-avatars { display: flex; }
        .lp-av {
          width: 24px; height: 24px;
          border-radius: 50%;
          border: 2px solid #080b14;
          margin-left: -7px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          font-weight: 700;
          color: white;
        }
        .lp-av:first-child { margin-left: 0; background: #6366f1; }
        .lp-av:nth-child(2) { background: #ec4899; }
        .lp-av:nth-child(3) { background: #f59e0b; }
        .lp-live {
          font-size: 10px; font-weight: 600;
          color: #22c55e;
          background: rgba(34,197,94,0.12);
          border: 1px solid rgba(34,197,94,0.25);
          border-radius: 20px;
          padding: 2px 9px;
          letter-spacing: 0.3px;
        }

        /* ── Right form panel ── */
        .lp-right {
          width: 500px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 56px 52px;
          position: relative;
          z-index: 1;
          background: rgba(255,255,255,0.018);
        }

        /* Subtle inner border on left edge of form panel */
        .lp-right::before {
          content: '';
          position: absolute;
          top: 60px; bottom: 60px; left: 0;
          width: 1px;
          background: linear-gradient(180deg, transparent, rgba(99,102,241,0.25), transparent);
        }

        .lp-form-head { margin-bottom: 36px; }
        .lp-form-title {
          font-family: 'Syne', sans-serif;
          font-size: 30px;
          font-weight: 700;
          color: #f8fafc;
          letter-spacing: -1px;
          margin-bottom: 8px;
        }
        .lp-form-sub {
          font-size: 14px;
          color: #334155;
        }
        .lp-form-sub a {
          color: #818cf8;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .lp-form-sub a:hover { color: #a5b4fc; }

        .lp-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
          margin: 0 0 32px;
        }

        .lp-fields { display: flex; flex-direction: column; gap: 20px; }

        .lp-field { display: flex; flex-direction: column; gap: 7px; }
        .lp-label {
          font-size: 11px;
          font-weight: 600;
          color: #64748b;
          letter-spacing: 0.7px;
          text-transform: uppercase;
        }

        .lp-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .lp-input-icon {
          position: absolute;
          left: 14px;
          color: #2d3748;
          display: flex;
          align-items: center;
          pointer-events: none;
          transition: color 0.2s;
        }
        .lp-input-wrap.is-focused .lp-input-icon { color: #6366f1; }

        .lp-input {
          width: 100%;
          background: rgba(255,255,255,0.042);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 11px;
          padding: 13px 44px;
          color: #f1f5f9;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .lp-input::placeholder { color: #2d3748; }
        .lp-input:focus {
          border-color: rgba(99,102,241,0.55);
          background: rgba(99,102,241,0.055);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.09);
        }

        .lp-eye-btn {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: #2d3748;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 5px;
          border-radius: 5px;
          transition: color 0.2s;
        }
        .lp-eye-btn:hover { color: #94a3b8; }

        .lp-forgot {
          text-align: right;
          margin-top: 3px;
        }
        .lp-forgot a {
          font-size: 12px;
          color: #334155;
          text-decoration: none;
          transition: color 0.2s;
        }
        .lp-forgot a:hover { color: #818cf8; }

        .lp-submit {
          width: 100%;
          background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%);
          color: #fff;
          border: none;
          border-radius: 11px;
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
          letter-spacing: 0.15px;
          position: relative;
          overflow: hidden;
          transition: transform 0.15s, box-shadow 0.2s, opacity 0.2s;
        }
        .lp-submit::after {
          content: '';
          position: absolute;
          top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
          transition: left 0.55s;
        }
        .lp-submit:hover::after { left: 100%; }
        .lp-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 10px 28px rgba(99,102,241,0.42);
        }
        .lp-submit:active:not(:disabled) { transform: translateY(0); }
        .lp-submit:disabled { opacity: 0.58; cursor: not-allowed; }

        .lp-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: lp-spin 0.7s linear infinite;
        }
        @keyframes lp-spin { to { transform: rotate(360deg); } }

        .lp-register {
          text-align: center;
          margin-top: 24px;
          font-size: 13px;
          color: #2d3748;
        }
        .lp-register a {
          color: #818cf8;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }
        .lp-register a:hover { color: #a5b4fc; }

        .lp-secure {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          margin-top: 28px;
          padding-top: 22px;
          border-top: 1px solid rgba(255,255,255,0.05);
          font-size: 11px;
          color: #1e2a3a;
        }

        /* ═══════════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════════ */

        /* Tablet: 768–1100px → stack vertically */
        @media (max-width: 1100px) {
          .lp-root { flex-direction: column; }

          .lp-left {
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.055);
            padding: 44px 40px 40px;
            align-items: center;
            text-align: center;
          }
          .lp-brand { justify-content: center; margin-bottom: 40px; }
          .lp-pill { align-self: center; }
          .lp-sub { max-width: 500px; }
          .lp-features { align-items: center; }
          .lp-preview { max-width: 420px; }

          .lp-right {
            width: 100%;
            padding: 44px 40px;
            background: transparent;
          }
          .lp-right::before { display: none; }
          .lp-form-head { text-align: center; }
        }

        /* Mobile: <600px → tighten padding */
        @media (max-width: 600px) {
          .lp-left {
            padding: 32px 20px 28px;
          }
          .lp-headline {
            font-size: 32px;
            letter-spacing: -1.5px;
          }
          .lp-sub { font-size: 14px; }
          .lp-features { gap: 11px; }
          .lp-preview { max-width: 100%; }

          .lp-right { padding: 32px 20px; }
          .lp-form-title { font-size: 26px; }
        }

        /* Very small: <400px */
        @media (max-width: 400px) {
          .lp-headline { font-size: 28px; letter-spacing: -1px; }
          .lp-right { padding: 28px 16px; }
        }
      `}</style>

      <div className="lp-root">
        <div className="lp-glow-tl" />
        <div className="lp-glow-br" />

        {/* ── Left branding panel ── */}
        <div className="lp-left">
          <div className="lp-brand">
            <LogoMark />
            <span className="lp-brand-name">ProjectSync</span>
          </div>

          <span className="lp-pill">
            <span className="lp-pill-dot" />
            Project Management
          </span>

          <h1 className="lp-headline">
            Ship projects<br />
            <span className="accent">faster, together.</span>
          </h1>

          <p className="lp-sub">
            A modern Kanban workspace for high-performance teams.
            Organize, track, and deliver everything in one place.
          </p>

          <div className="lp-features">
            {features.map((f) => (
              <div className="lp-feature" key={f}>
                <div className="lp-check"><CheckIcon /></div>
                {f}
              </div>
            ))}
          </div>

          <div className="lp-preview">
            <div className="lp-preview-icon"><BoardIcon /></div>
            <div className="lp-preview-body">
              <h4>Sprint Dashboard</h4>
              <p>3 active sprints · 12 tasks in review</p>
              <div className="lp-preview-row">
                <div className="lp-avatars">
                  <div className="lp-av">A</div>
                  <div className="lp-av">S</div>
                  <div className="lp-av">R</div>
                </div>
                <span className="lp-live">Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right form panel ── */}
        <div className="lp-right">
          <div className="lp-form-head">
            <h2 className="lp-form-title">Welcome back</h2>
            <p className="lp-form-sub">
              New here? <Link to="/register">Create an account</Link>
            </p>
          </div>

          <div className="lp-divider" />

          <form onSubmit={handleSubmit}>
            <div className="lp-fields">
              <div className="lp-field">
                <label className="lp-label" htmlFor="email">Email Address</label>
                <div className={`lp-input-wrap ${focused === 'email' ? 'is-focused' : ''}`}>
                  <span className="lp-input-icon"><MailIcon /></span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="lp-input"
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

              <div className="lp-field">
                <label className="lp-label" htmlFor="password">Password</label>
                <div className={`lp-input-wrap ${focused === 'password' ? 'is-focused' : ''}`}>
                  <span className="lp-input-icon"><LockIcon /></span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    className="lp-input"
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
                    className="lp-eye-btn"
                    onClick={() => setShowPassword(v => !v)}
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                <div className="lp-forgot">
                  <a href="#">Forgot password?</a>
                </div>
              </div>
            </div>

            <button type="submit" className="lp-submit" disabled={loading}>
              {loading
                ? <><span className="lp-spinner" /> Signing in...</>
                : <>Sign In <ArrowRightIcon /></>
              }
            </button>
          </form>

          <p className="lp-register">
            Don't have an account? <Link to="/register">Sign up free</Link>
          </p>

          <div className="lp-secure">
            <ShieldIcon />
            Secured with 256-bit encryption · Your data is always safe
          </div>
        </div>
      </div>
    </>
  )
}