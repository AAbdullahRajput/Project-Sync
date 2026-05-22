import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import toast from 'react-hot-toast'

const LogoMark = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <defs>
      <linearGradient id="rg1" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6366f1"/><stop offset="1" stopColor="#8b5cf6"/>
      </linearGradient>
    </defs>
    <rect width="36" height="36" rx="10" fill="url(#rg1)"/>
    <rect x="8.5" y="8.5" width="8" height="8" rx="2" fill="white"/>
    <rect x="19.5" y="8.5" width="8" height="8" rx="2" fill="white" opacity="0.55"/>
    <rect x="8.5" y="19.5" width="8" height="8" rx="2" fill="white" opacity="0.55"/>
    <rect x="19.5" y="19.5" width="8" height="8" rx="2" fill="white" opacity="0.25"/>
  </svg>
)
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
)
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)
const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)
const BriefcaseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-4 0v2"/><path d="M12 12v4"/><path d="M8 12h8"/>
  </svg>
)
const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
)
const EyeOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)
const AddUserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
  </svg>
)
const ShieldIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)
const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const CheckFeatIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)
const BoardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

function getStrength(val) {
  if (!val) return { score: 0, label: '', color: '#475569' }
  let score = 0
  if (val.length >= 8) score++
  if (/[A-Z]/.test(val)) score++
  if (/[0-9]/.test(val)) score++
  if (/[^A-Za-z0-9]/.test(val)) score++
  const labels = ['Too weak', 'Could be stronger', 'Almost there', 'Strong password!']
  const colors = ['#ef4444', '#f59e0b', '#6366f1', '#22c55e']
  return { score, label: labels[score - 1] || 'Too weak', color: colors[score - 1] || '#ef4444' }
}

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', role: '' })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [focused, setFocused] = useState('')
  const [termsChecked, setTermsChecked] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setTimeout(() => setMounted(true), 50) }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const strength = getStrength(form.password)
  const barColor = (idx) => (strength.score === 0 || idx >= strength.score) ? 'rgba(255,255,255,0.08)' : strength.color

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!termsChecked) return
    setLoading(true)
    try {
      await register(`${form.firstName} ${form.lastName}`, form.email, form.password)
      toast.success('Account created!')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        body { font-family:'DM Sans',sans-serif; background:#0b0e1a; color:#e2e8f0; -webkit-font-smoothing:antialiased; }

        .rp {
          min-height:100vh;
          display:grid;
          grid-template-columns:1fr 500px;
          background:#0b0e1a;
          position:relative;
          overflow:hidden;
        }

        /* ── GLOWS ── */
        .rp-glow1 { position:fixed;top:-200px;left:-150px;width:700px;height:700px;background:radial-gradient(circle,rgba(99,102,241,0.14) 0%,transparent 68%);pointer-events:none;z-index:0; }
        .rp-glow2 { position:fixed;bottom:-200px;right:-100px;width:600px;height:600px;background:radial-gradient(circle,rgba(139,92,246,0.10) 0%,transparent 68%);pointer-events:none;z-index:0; }
        .rp-glow3 { position:fixed;top:50%;left:40%;transform:translateY(-50%);width:400px;height:400px;background:radial-gradient(circle,rgba(99,102,241,0.06) 0%,transparent 70%);pointer-events:none;z-index:0; }

        /* ── LEFT FEATURE PANEL ── */
        .rp-left {
          display:flex;flex-direction:column;justify-content:center;
          padding:60px 64px;
          position:relative;z-index:1;
          border-right:1px solid rgba(255,255,255,0.06);
          overflow:hidden;
        }

        .rp-brand {
          display:flex;align-items:center;gap:12px;
          margin-bottom:56px;
          opacity:0;transform:translateY(20px);
          transition:opacity .6s ease, transform .6s ease;
        }
        .rp-brand.in { opacity:1;transform:translateY(0); }
        .rp-brand-name { font-family:'Syne',sans-serif;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.3px; }

        .rp-pill {
          display:inline-flex;align-items:center;gap:8px;width:fit-content;
          background:rgba(99,102,241,0.14);border:1px solid rgba(99,102,241,0.30);
          border-radius:100px;padding:6px 16px 6px 10px;
          font-size:11px;font-weight:600;color:#a5b4fc;letter-spacing:0.8px;text-transform:uppercase;
          margin-bottom:24px;
          opacity:0;transform:translateY(20px);
          transition:opacity .6s ease .1s, transform .6s ease .1s;
        }
        .rp-pill.in { opacity:1;transform:translateY(0); }
        .rp-dot { width:7px;height:7px;border-radius:50%;background:#6366f1;animation:rp-pulse 2.2s ease-in-out infinite;flex-shrink:0; }
        @keyframes rp-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.35;transform:scale(0.7)}}

        .rp-h1 {
          font-family:'Syne',sans-serif;
          font-size:clamp(38px,4.2vw,54px);
          font-weight:800;line-height:1.05;letter-spacing:-2.5px;
          color:#ffffff;margin-bottom:18px;
          opacity:0;transform:translateY(24px);
          transition:opacity .7s ease .2s, transform .7s ease .2s;
        }
        .rp-h1.in { opacity:1;transform:translateY(0); }
        .rp-h1 .grad {
          background:linear-gradient(135deg,#818cf8,#6366f1,#a78bfa);
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
        }

        .rp-sub {
          font-size:15px;color:#94a3b8;line-height:1.75;margin-bottom:40px;max-width:420px;
          opacity:0;transform:translateY(20px);
          transition:opacity .6s ease .3s, transform .6s ease .3s;
        }
        .rp-sub.in { opacity:1;transform:translateY(0); }

        .rp-feats {
          display:flex;flex-direction:column;gap:13px;margin-bottom:44px;
          opacity:0;transform:translateY(20px);
          transition:opacity .6s ease .4s, transform .6s ease .4s;
        }
        .rp-feats.in { opacity:1;transform:translateY(0); }
        .rp-feat { display:flex;align-items:center;gap:12px;font-size:14px;color:#cbd5e1;font-weight:400; }
        .rp-ck {
          width:24px;height:24px;border-radius:7px;
          background:rgba(99,102,241,0.18);border:1px solid rgba(99,102,241,0.32);
          display:flex;align-items:center;justify-content:center;color:#818cf8;flex-shrink:0;
        }

        .rp-card {
          display:flex;gap:14px;align-items:flex-start;
          background:rgba(255,255,255,0.035);border:1px solid rgba(255,255,255,0.08);
          border-radius:16px;padding:20px 22px;max-width:420px;
          position:relative;overflow:hidden;
          opacity:0;transform:translateY(20px);
          transition:opacity .6s ease .5s, transform .6s ease .5s;
        }
        .rp-card.in { opacity:1;transform:translateY(0); }
        .rp-card::before { content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(99,102,241,0.5),transparent); }
        .rp-card-icon { width:40px;height:40px;border-radius:11px;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 16px rgba(99,102,241,0.35); }
        .rp-card-body h4 { font-size:13px;font-weight:600;color:#ffffff;margin-bottom:4px; }
        .rp-card-body p { font-size:12px;color:#64748b;line-height:1.5; }
        .rp-card-row { display:flex;align-items:center;gap:8px;margin-top:10px; }
        .rp-avs { display:flex; }
        .rp-av { width:25px;height:25px;border-radius:50%;border:2px solid #0b0e1a;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:white;margin-left:-7px; }
        .rp-av:first-child { margin-left:0;background:#6366f1; }
        .rp-av:nth-child(2) { background:#ec4899; }
        .rp-av:nth-child(3) { background:#f59e0b; }
        .rp-live { font-size:10px;font-weight:600;color:#22c55e;background:rgba(34,197,94,0.12);border:1px solid rgba(34,197,94,0.25);border-radius:20px;padding:3px 10px; }

        /* ── RIGHT FORM PANEL ── */
        .rp-right {
          display:flex;flex-direction:column;justify-content:center;
          padding:48px 52px;
          position:relative;z-index:1;
          background:rgba(255,255,255,0.02);
          overflow-y:auto;
        }

        .rp-fhead {
          margin-bottom:28px;
          opacity:0;transform:translateX(20px);
          transition:opacity .6s ease .1s, transform .6s ease .1s;
        }
        .rp-fhead.in { opacity:1;transform:translateX(0); }
        .rp-ftitle { font-family:'Syne',sans-serif;font-size:28px;font-weight:700;color:#ffffff;letter-spacing:-1px;margin-bottom:6px; }
        .rp-fsub { font-size:14px;color:#94a3b8; }
        .rp-fsub a { color:#818cf8;text-decoration:none;font-weight:500;transition:color .2s; }
        .rp-fsub a:hover { color:#a5b4fc; }

        .rp-div { height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent);margin-bottom:24px; }

        .rp-form-body {
          opacity:0;transform:translateX(20px);
          transition:opacity .6s ease .2s, transform .6s ease .2s;
        }
        .rp-form-body.in { opacity:1;transform:translateX(0); }

        .rp-row { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
        .rp-fields { display:flex;flex-direction:column;gap:16px; }
        .rp-field { display:flex;flex-direction:column;gap:6px; }
        .rp-lbl { font-size:11px;font-weight:600;color:#cbd5e1;letter-spacing:0.7px;text-transform:uppercase; }

        .rp-wrap { position:relative;display:flex;align-items:center; }
        .rp-ico { position:absolute;left:14px;color:#475569;display:flex;align-items:center;pointer-events:none;transition:color .2s; }
        .rp-wrap.focused .rp-ico { color:#6366f1; }
        .rp-inp {
          width:100%;background:rgba(255,255,255,0.05);
          border:1px solid rgba(255,255,255,0.10);border-radius:11px;
          padding:13px 14px 13px 44px;color:#ffffff;font-size:14px;
          font-family:'DM Sans',sans-serif;outline:none;
          transition:border-color .2s,background .2s,box-shadow .2s;
        }
        .rp-inp::placeholder { color:#475569; }
        .rp-inp:focus { border-color:rgba(99,102,241,0.55);background:rgba(99,102,241,0.06);box-shadow:0 0 0 3px rgba(99,102,241,0.10); }

        .rp-eye { position:absolute;right:12px;background:none;border:none;color:#475569;cursor:pointer;display:flex;align-items:center;padding:5px;border-radius:5px;transition:color .2s; }
        .rp-eye:hover { color:#94a3b8; }

        .rp-strength-bars { display:flex;gap:4px;margin-top:6px;margin-bottom:4px; }
        .rp-bar { height:3px;flex:1;border-radius:4px;transition:background .35s; }

        .rp-terms { display:flex;align-items:flex-start;gap:10px;cursor:pointer;margin-top:2px; }
        .rp-check { width:18px;height:18px;border:1px solid rgba(255,255,255,0.20);border-radius:5px;background:rgba(255,255,255,0.05);flex-shrink:0;margin-top:1px;display:flex;align-items:center;justify-content:center;transition:all .2s; }
        .rp-check.on { background:#6366f1;border-color:#6366f1; }
        .rp-terms-text { font-size:12px;color:#94a3b8;line-height:1.6;user-select:none; }
        .rp-terms-text a { color:#818cf8;text-decoration:none; }
        .rp-terms-text a:hover { color:#a5b4fc; }

        .rp-btn {
          width:100%;background:linear-gradient(135deg,#6366f1 0%,#7c3aed 100%);
          color:#ffffff;border:none;border-radius:11px;padding:14px;
          font-size:15px;font-weight:600;font-family:'DM Sans',sans-serif;
          cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;
          margin-top:20px;letter-spacing:0.2px;position:relative;overflow:hidden;
          transition:transform .15s,box-shadow .2s,opacity .2s;
        }
        .rp-btn::after { content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.13),transparent);transition:left .55s; }
        .rp-btn:hover::after { left:100%; }
        .rp-btn:hover:not(:disabled) { transform:translateY(-1px);box-shadow:0 10px 30px rgba(99,102,241,0.45); }
        .rp-btn:active:not(:disabled) { transform:translateY(0); }
        .rp-btn:disabled { opacity:.5;cursor:not-allowed; }

        .rp-spin { width:16px;height:16px;border:2px solid rgba(255,255,255,0.3);border-top-color:white;border-radius:50%;animation:spin .7s linear infinite; }
        @keyframes spin{to{transform:rotate(360deg)}}

        .rp-login { text-align:center;margin-top:18px;font-size:13px;color:#94a3b8; }
        .rp-login a { color:#818cf8;text-decoration:none;font-weight:600;transition:color .2s; }
        .rp-login a:hover { color:#a5b4fc; }

        .rp-sec { display:flex;align-items:center;justify-content:center;gap:7px;margin-top:20px;padding-top:18px;border-top:1px solid rgba(255,255,255,0.06);font-size:11px;color:#475569; }

        .rp-proof {
          display:flex;align-items:center;gap:14px;
          background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);
          border-radius:14px;padding:16px 18px;margin-top:20px;
          position:relative;overflow:hidden;
        }
        .rp-proof::before { content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(99,102,241,0.4),transparent); }
        .rp-pavs { display:flex; }
        .rp-pav { width:30px;height:30px;border-radius:50%;border:2px solid #0b0e1a;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:white;margin-left:-8px; }
        .rp-pav:first-child { margin-left:0;background:linear-gradient(135deg,#6366f1,#8b5cf6); }
        .rp-pav:nth-child(2) { background:linear-gradient(135deg,#ec4899,#f43f5e); }
        .rp-pav:nth-child(3) { background:linear-gradient(135deg,#f59e0b,#fb923c); }
        .rp-pav:nth-child(4) { background:linear-gradient(135deg,#10b981,#06b6d4); }
        .rp-proof-stars { display:flex;gap:2px;margin-bottom:3px; }
        .rp-proof-text h4 { font-size:12px;font-weight:600;color:#ffffff; }
        .rp-proof-text p { font-size:11px;color:#64748b; }

        /* ══════════════════════════
           RESPONSIVE
        ══════════════════════════ */
        @media(max-width:1100px){
          .rp { grid-template-columns:1fr; }
          .rp-left {
            border-right:none;border-bottom:1px solid rgba(255,255,255,0.06);
            padding:48px 40px;align-items:center;text-align:center;
          }
          .rp-brand { justify-content:center; }
          .rp-pill { align-self:center; }
          .rp-sub { max-width:520px;text-align:center; }
          .rp-feats { align-items:center; }
          .rp-feat { text-align:left; }
          .rp-card { max-width:460px; }
          .rp-right { padding:48px 40px; }
          .rp-fhead { opacity:1;transform:none; }
          .rp-form-body { opacity:1;transform:none; }
        }
        @media(max-width:700px){
          .rp-left { padding:32px 20px 28px; }
          .rp-brand { margin-bottom:28px; }
          .rp-h1 { font-size:32px;letter-spacing:-1.5px; }
          .rp-right { padding:32px 20px 40px; }
          .rp-ftitle { font-size:24px; }
          .rp-row { grid-template-columns:1fr; }
        }
        @media(max-width:400px){
          .rp-left { padding:28px 16px 24px; }
          .rp-h1 { font-size:27px;letter-spacing:-1px; }
          .rp-right { padding:24px 16px 36px; }
        }
      `}</style>

      <div className="rp">
        <div className="rp-glow1"/><div className="rp-glow2"/><div className="rp-glow3"/>

        {/* ══════════════════════════════
            LEFT — FEATURE / MARKETING
        ══════════════════════════════ */}
        <div className="rp-left">
          <div className={`rp-brand ${mounted?'in':''}`}>
            <LogoMark/>
            <span className="rp-brand-name">ProjectSync</span>
          </div>

          <span className={`rp-pill ${mounted?'in':''}`}>
            <span className="rp-dot"/>
            Project Management
          </span>

          <h1 className={`rp-h1 ${mounted?'in':''}`}>
            Ship projects<br/>
            <span className="grad">faster, together.</span>
          </h1>

          <p className={`rp-sub ${mounted?'in':''}`}>
            A modern Kanban workspace for high-performance teams.
            Organize, track, and deliver everything in one place.
          </p>

          <div className={`rp-feats ${mounted?'in':''}`}>
            {features.map(f => (
              <div className="rp-feat" key={f}>
                <div className="rp-ck"><CheckFeatIcon/></div>
                {f}
              </div>
            ))}
          </div>

          <div className={`rp-card ${mounted?'in':''}`}>
            <div className="rp-card-icon"><BoardIcon/></div>
            <div className="rp-card-body">
              <h4>Sprint Dashboard</h4>
              <p>3 active sprints · 12 tasks in review</p>
              <div className="rp-card-row">
                <div className="rp-avs">
                  <div className="rp-av">A</div>
                  <div className="rp-av">S</div>
                  <div className="rp-av">R</div>
                </div>
                <span className="rp-live">Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════
            RIGHT — REGISTER FORM
        ══════════════════════════════ */}
        <div className="rp-right">
          <div className={`rp-fhead ${mounted?'in':''}`}>
            <h2 className="rp-ftitle">Create your account</h2>
            <p className="rp-fsub">Already have an account? <Link to="/login">Sign in</Link></p>
          </div>

          <div className="rp-div"/>

          <div className={`rp-form-body ${mounted?'in':''}`}>
            <form onSubmit={handleSubmit}>
              <div className="rp-fields">

                {/* First + Last Name */}
                <div className="rp-row">
                  <div className="rp-field">
                    <label className="rp-lbl">First Name</label>
                    <div className={`rp-wrap ${focused==='firstName'?'focused':''}`}>
                      <span className="rp-ico"><UserIcon/></span>
                      <input name="firstName" type="text" className="rp-inp"
                        value={form.firstName} onChange={handleChange}
                        placeholder="John" required
                        onFocus={()=>setFocused('firstName')} onBlur={()=>setFocused('')}/>
                    </div>
                  </div>
                  <div className="rp-field">
                    <label className="rp-lbl">Last Name</label>
                    <div className={`rp-wrap ${focused==='lastName'?'focused':''}`}>
                      <span className="rp-ico"><UserIcon/></span>
                      <input name="lastName" type="text" className="rp-inp"
                        value={form.lastName} onChange={handleChange}
                        placeholder="Doe" required
                        onFocus={()=>setFocused('lastName')} onBlur={()=>setFocused('')}/>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="rp-field">
                  <label className="rp-lbl">Work Email</label>
                  <div className={`rp-wrap ${focused==='email'?'focused':''}`}>
                    <span className="rp-ico"><MailIcon/></span>
                    <input name="email" type="email" className="rp-inp"
                      value={form.email} onChange={handleChange}
                      placeholder="you@company.com" required autoComplete="email"
                      onFocus={()=>setFocused('email')} onBlur={()=>setFocused('')}/>
                  </div>
                </div>

                {/* Password */}
                <div className="rp-field">
                  <label className="rp-lbl">Password</label>
                  <div className={`rp-wrap ${focused==='password'?'focused':''}`}>
                    <span className="rp-ico"><LockIcon/></span>
                    <input name="password" type={showPassword?'text':'password'} className="rp-inp"
                      value={form.password} onChange={handleChange}
                      placeholder="Min 8 characters" required minLength={8}
                      onFocus={()=>setFocused('password')} onBlur={()=>setFocused('')}/>
                    <button type="button" className="rp-eye"
                      onClick={()=>setShowPassword(v=>!v)}
                      aria-label={showPassword?'Hide':'Show'}>
                      {showPassword?<EyeOffIcon/>:<EyeIcon/>}
                    </button>
                  </div>
                  {form.password.length > 0 && (
                    <>
                      <div className="rp-strength-bars">
                        {[0,1,2,3].map(i=>(
                          <div key={i} className="rp-bar" style={{background:barColor(i)}}/>
                        ))}
                      </div>
                      <span style={{fontSize:'11px',color:strength.color}}>{strength.label}</span>
                    </>
                  )}
                </div>

                {/* Role */}
                <div className="rp-field">
                  <label className="rp-lbl">
                    Role&nbsp;<span style={{color:'#475569',fontWeight:400,textTransform:'none',letterSpacing:0,fontSize:'11px'}}>(optional)</span>
                  </label>
                  <div className={`rp-wrap ${focused==='role'?'focused':''}`}>
                    <span className="rp-ico"><BriefcaseIcon/></span>
                    <input name="role" type="text" className="rp-inp"
                      value={form.role} onChange={handleChange}
                      placeholder="e.g. Product Manager"
                      onFocus={()=>setFocused('role')} onBlur={()=>setFocused('')}/>
                  </div>
                </div>

                {/* Terms */}
                <div className="rp-terms" onClick={()=>setTermsChecked(v=>!v)}>
                  <div className={`rp-check ${termsChecked?'on':''}`}>
                    {termsChecked && <CheckIcon/>}
                  </div>
                  <span className="rp-terms-text">
                    I agree to the <a href="#" onClick={e=>e.stopPropagation()}>Terms of Service</a> and{' '}
                    <a href="#" onClick={e=>e.stopPropagation()}>Privacy Policy</a>. My data will be handled securely.
                  </span>
                </div>
              </div>

              <button type="submit" className="rp-btn" disabled={loading || !termsChecked}>
                {loading
                  ? <><span className="rp-spin"/> Creating account...</>
                  : <><AddUserIcon/> Create Free Account</>
                }
              </button>
            </form>

            {/* Social proof */}
            <div className="rp-proof">
              <div className="rp-pavs">
                <div className="rp-pav">A</div>
                <div className="rp-pav">M</div>
                <div className="rp-pav">K</div>
                <div className="rp-pav">+</div>
              </div>
              <div className="rp-proof-text">
                <div className="rp-proof-stars">
                  {[0,1,2,3,4].map(i=><StarIcon key={i}/>)}
                </div>
                <h4>50,000+ teams already onboard</h4>
                <p>Rated 4.9 / 5 across 12,000+ reviews</p>
              </div>
            </div>

            <p className="rp-login">Already a member? <Link to="/login">Sign in to your workspace</Link></p>

            <div className="rp-sec">
              <ShieldIcon/>
              256-bit encrypted · No credit card required · Free forever
            </div>
          </div>
        </div>
      </div>
    </>
  )
}