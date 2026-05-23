import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import toast from 'react-hot-toast'

const LogoMark = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <defs>
      <linearGradient id="lg1" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6366f1"/><stop offset="1" stopColor="#8b5cf6"/>
      </linearGradient>
    </defs>
    <rect width="36" height="36" rx="10" fill="url(#lg1)"/>
    <rect x="8.5" y="8.5" width="8" height="8" rx="2" fill="white"/>
    <rect x="19.5" y="8.5" width="8" height="8" rx="2" fill="white" opacity="0.55"/>
    <rect x="8.5" y="19.5" width="8" height="8" rx="2" fill="white" opacity="0.55"/>
    <rect x="19.5" y="19.5" width="8" height="8" rx="2" fill="white" opacity="0.25"/>
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
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
)
const ShieldIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)
const CheckFeatIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const BoardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
)
const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

const features = [
  'Drag-and-drop Kanban boards',
  'Real-time team collaboration',
  'Priority tracking & due dates',
  'Comments & activity history',
]

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [focused, setFocused] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setTimeout(() => setMounted(true), 50) }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(form.email, form.password)
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid email or password')
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

        .lp {
          min-height:100vh;
          display:grid;
          grid-template-columns:1fr 480px;
          background:#0b0e1a;
          position:relative;
          overflow:hidden;
        }

        .lp-glow1 { position:fixed;top:-200px;left:-150px;width:700px;height:700px;background:radial-gradient(circle,rgba(99,102,241,0.14) 0%,transparent 68%);pointer-events:none;z-index:0; }
        .lp-glow2 { position:fixed;bottom:-200px;right:-100px;width:600px;height:600px;background:radial-gradient(circle,rgba(139,92,246,0.10) 0%,transparent 68%);pointer-events:none;z-index:0; }
        .lp-glow3 { position:fixed;top:50%;left:40%;transform:translateY(-50%);width:400px;height:400px;background:radial-gradient(circle,rgba(99,102,241,0.06) 0%,transparent 70%);pointer-events:none;z-index:0; }

        .lp-left {
          display:flex;flex-direction:column;justify-content:center;
          padding:60px 64px;
          position:relative;z-index:1;
          border-right:1px solid rgba(255,255,255,0.06);
        }

        .lp-brand {
          display:flex;align-items:center;gap:12px;margin-bottom:56px;
          opacity:0;transform:translateY(20px);
          transition:opacity .6s ease,transform .6s ease;
        }
        .lp-brand.in{opacity:1;transform:translateY(0);}
        .lp-brand-name{font-family:'Syne',sans-serif;font-size:20px;font-weight:700;color:#fff;letter-spacing:-0.3px;}

        .lp-pill{
          display:inline-flex;align-items:center;gap:8px;width:fit-content;
          background:rgba(99,102,241,0.14);border:1px solid rgba(99,102,241,0.30);
          border-radius:100px;padding:6px 16px 6px 10px;
          font-size:11px;font-weight:600;color:#a5b4fc;letter-spacing:0.8px;text-transform:uppercase;
          margin-bottom:24px;
          opacity:0;transform:translateY(20px);
          transition:opacity .6s ease .1s,transform .6s ease .1s;
        }
        .lp-pill.in{opacity:1;transform:translateY(0);}
        .lp-dot{width:7px;height:7px;border-radius:50%;background:#6366f1;animation:lp-pulse 2.2s ease-in-out infinite;flex-shrink:0;}
        @keyframes lp-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.7)}}

        .lp-h1{
          font-family:'Syne',sans-serif;
          font-size:clamp(36px,4vw,52px);font-weight:800;line-height:1.05;letter-spacing:-2.5px;
          color:#fff;margin-bottom:18px;
          opacity:0;transform:translateY(24px);
          transition:opacity .7s ease .2s,transform .7s ease .2s;
        }
        .lp-h1.in{opacity:1;transform:translateY(0);}
        .lp-h1 .grad{background:linear-gradient(135deg,#818cf8,#6366f1,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}

        .lp-sub{
          font-size:15px;color:#94a3b8;line-height:1.75;margin-bottom:40px;max-width:420px;
          opacity:0;transform:translateY(20px);
          transition:opacity .6s ease .3s,transform .6s ease .3s;
        }
        .lp-sub.in{opacity:1;transform:translateY(0);}

        .lp-feats{
          display:flex;flex-direction:column;gap:13px;margin-bottom:44px;
          opacity:0;transform:translateY(20px);
          transition:opacity .6s ease .4s,transform .6s ease .4s;
        }
        .lp-feats.in{opacity:1;transform:translateY(0);}
        .lp-feat{display:flex;align-items:center;gap:12px;font-size:14px;color:#cbd5e1;}
        .lp-ck{width:24px;height:24px;border-radius:7px;background:rgba(99,102,241,0.18);border:1px solid rgba(99,102,241,0.32);display:flex;align-items:center;justify-content:center;color:#818cf8;flex-shrink:0;}

        .lp-card{
          display:flex;gap:14px;align-items:flex-start;
          background:rgba(255,255,255,0.035);border:1px solid rgba(255,255,255,0.08);
          border-radius:16px;padding:20px 22px;max-width:420px;
          position:relative;overflow:hidden;
          opacity:0;transform:translateY(20px);
          transition:opacity .6s ease .5s,transform .6s ease .5s;
        }
        .lp-card.in{opacity:1;transform:translateY(0);}
        .lp-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(99,102,241,0.5),transparent);}
        .lp-card-icon{width:40px;height:40px;border-radius:11px;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 16px rgba(99,102,241,0.35);}
        .lp-card-body h4{font-size:13px;font-weight:600;color:#fff;margin-bottom:4px;}
        .lp-card-body p{font-size:12px;color:#64748b;line-height:1.5;}
        .lp-card-row{display:flex;align-items:center;gap:8px;margin-top:10px;}
        .lp-avs{display:flex;}
        .lp-av{width:25px;height:25px;border-radius:50%;border:2px solid #0b0e1a;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:white;margin-left:-7px;}
        .lp-av:first-child{margin-left:0;background:#6366f1;}
        .lp-av:nth-child(2){background:#ec4899;}
        .lp-av:nth-child(3){background:#f59e0b;}
        .lp-live{font-size:10px;font-weight:600;color:#22c55e;background:rgba(34,197,94,0.12);border:1px solid rgba(34,197,94,0.25);border-radius:20px;padding:3px 10px;}

        .lp-right{
          display:flex;flex-direction:column;justify-content:center;
          padding:48px 52px;
          position:relative;z-index:1;
          background:rgba(255,255,255,0.02);
          overflow-y:auto;
        }

        .lp-fhead{
          margin-bottom:28px;
          opacity:0;transform:translateX(20px);
          transition:opacity .6s ease .1s,transform .6s ease .1s;
        }
        .lp-fhead.in{opacity:1;transform:translateX(0);}
        .lp-ftitle{font-family:'Syne',sans-serif;font-size:28px;font-weight:700;color:#fff;letter-spacing:-1px;margin-bottom:6px;}
        .lp-fsub{font-size:14px;color:#94a3b8;}
        .lp-fsub a{color:#818cf8;text-decoration:none;font-weight:500;transition:color .2s;}
        .lp-fsub a:hover{color:#a5b4fc;}

        .lp-div{height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent);margin-bottom:24px;}

        .lp-form-body{
          opacity:0;transform:translateX(20px);
          transition:opacity .6s ease .2s,transform .6s ease .2s;
        }
        .lp-form-body.in{opacity:1;transform:translateX(0);}

        .lp-fields{display:flex;flex-direction:column;gap:18px;}
        .lp-field{display:flex;flex-direction:column;gap:6px;}
        .lp-lbl{font-size:11px;font-weight:600;color:#cbd5e1;letter-spacing:0.7px;text-transform:uppercase;}

        .lp-wrap{position:relative;display:flex;align-items:center;}
        .lp-ico{position:absolute;left:14px;color:#475569;display:flex;align-items:center;pointer-events:none;transition:color .2s;}
        .lp-wrap.focused .lp-ico{color:#6366f1;}
        .lp-inp{
          width:100%;background:rgba(255,255,255,0.05);
          border:1px solid rgba(255,255,255,0.10);border-radius:11px;
          padding:13px 14px 13px 44px;color:#fff;font-size:14px;
          font-family:'DM Sans',sans-serif;outline:none;
          transition:border-color .2s,background .2s,box-shadow .2s;
        }
        .lp-inp::placeholder{color:#475569;}
        .lp-inp:focus{border-color:rgba(99,102,241,0.55);background:rgba(99,102,241,0.06);box-shadow:0 0 0 3px rgba(99,102,241,0.10);}

        .lp-eye{position:absolute;right:12px;background:none;border:none;color:#475569;cursor:pointer;display:flex;align-items:center;padding:5px;border-radius:5px;transition:color .2s;}
        .lp-eye:hover{color:#94a3b8;}

        .lp-forgot{text-align:right;}
        .lp-forgot a{font-size:12px;color:#818cf8;text-decoration:none;font-weight:500;}
        .lp-forgot a:hover{color:#a5b4fc;}

        .lp-btn{
          width:100%;background:linear-gradient(135deg,#6366f1 0%,#7c3aed 100%);
          color:#fff;border:none;border-radius:11px;padding:14px;
          font-size:15px;font-weight:600;font-family:'DM Sans',sans-serif;
          cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;
          margin-top:24px;letter-spacing:0.2px;position:relative;overflow:hidden;
          transition:transform .15s,box-shadow .2s,opacity .2s;
        }
        .lp-btn::after{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.13),transparent);transition:left .55s;}
        .lp-btn:hover::after{left:100%;}
        .lp-btn:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 10px 30px rgba(99,102,241,0.45);}
        .lp-btn:active:not(:disabled){transform:translateY(0);}
        .lp-btn:disabled{opacity:.5;cursor:not-allowed;}

        .lp-spin{width:16px;height:16px;border:2px solid rgba(255,255,255,0.3);border-top-color:white;border-radius:50%;animation:spin .7s linear infinite;}
        @keyframes spin{to{transform:rotate(360deg)}}

        .lp-proof{
          display:flex;align-items:center;gap:14px;
          background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);
          border-radius:14px;padding:16px 18px;margin-top:20px;
          position:relative;overflow:hidden;
        }
        .lp-proof::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(99,102,241,0.4),transparent);}
        .lp-pavs{display:flex;}
        .lp-pav{width:30px;height:30px;border-radius:50%;border:2px solid #0b0e1a;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:white;margin-left:-8px;}
        .lp-pav:first-child{margin-left:0;background:linear-gradient(135deg,#6366f1,#8b5cf6);}
        .lp-pav:nth-child(2){background:linear-gradient(135deg,#ec4899,#f43f5e);}
        .lp-pav:nth-child(3){background:linear-gradient(135deg,#f59e0b,#fb923c);}
        .lp-pav:nth-child(4){background:linear-gradient(135deg,#10b981,#06b6d4);}
        .lp-proof-stars{display:flex;gap:2px;margin-bottom:3px;}
        .lp-proof-text h4{font-size:12px;font-weight:600;color:#fff;}
        .lp-proof-text p{font-size:11px;color:#64748b;}

        .lp-register{text-align:center;margin-top:18px;font-size:13px;color:#94a3b8;}
        .lp-register a{color:#818cf8;text-decoration:none;font-weight:600;}
        .lp-register a:hover{color:#a5b4fc;}

        .lp-sec{display:flex;align-items:center;justify-content:center;gap:7px;margin-top:20px;padding-top:18px;border-top:1px solid rgba(255,255,255,0.06);font-size:11px;color:#475569;}

        @media(max-width:1100px){
          .lp{grid-template-columns:1fr;}
          .lp-left{border-right:none;border-bottom:1px solid rgba(255,255,255,0.06);padding:48px 40px;align-items:center;text-align:center;}
          .lp-brand{justify-content:center;}
          .lp-feats{align-items:center;}
          .lp-card{max-width:460px;}
          .lp-right{padding:48px 40px;}
          .lp-fhead{opacity:1;transform:none;}
          .lp-form-body{opacity:1;transform:none;}
        }
        @media(max-width:700px){
          .lp-left{padding:32px 20px 28px;}
          .lp-h1{font-size:32px;letter-spacing:-1.5px;}
          .lp-right{padding:32px 20px 40px;}
          .lp-ftitle{font-size:24px;}
        }
        @media(max-width:400px){
          .lp-left{padding:28px 16px 24px;}
          .lp-h1{font-size:27px;}
          .lp-right{padding:24px 16px 36px;}
        }
      `}</style>

      <div className="lp">
        <div className="lp-glow1"/><div className="lp-glow2"/><div className="lp-glow3"/>

        {/* LEFT */}
        <div className="lp-left">
          <div className={`lp-brand ${mounted?'in':''}`}>
            <LogoMark/>
            <span className="lp-brand-name">ProjectSync</span>
          </div>

          <span className={`lp-pill ${mounted?'in':''}`}>
            <span className="lp-dot"/>
            Project Management
          </span>

          <h1 className={`lp-h1 ${mounted?'in':''}`}>
            Welcome<br/>
            <span className="grad">back.</span>
          </h1>

          <p className={`lp-sub ${mounted?'in':''}`}>
            Sign in to your workspace and pick up right where you left off.
            Your team is waiting.
          </p>

          <div className={`lp-feats ${mounted?'in':''}`}>
            {features.map(f => (
              <div className="lp-feat" key={f}>
                <div className="lp-ck"><CheckFeatIcon/></div>
                {f}
              </div>
            ))}
          </div>

          <div className={`lp-card ${mounted?'in':''}`}>
            <div className="lp-card-icon"><BoardIcon/></div>
            <div className="lp-card-body">
              <h4>Sprint Dashboard</h4>
              <p>3 active sprints · 12 tasks in review</p>
              <div className="lp-card-row">
                <div className="lp-avs">
                  <div className="lp-av">A</div>
                  <div className="lp-av">S</div>
                  <div className="lp-av">R</div>
                </div>
                <span className="lp-live">Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lp-right">
          <div className={`lp-fhead ${mounted?'in':''}`}>
            <h2 className="lp-ftitle">Sign in</h2>
            <p className="lp-fsub">New here? <Link to="/register">Create a free account</Link></p>
          </div>

          <div className="lp-div"/>

          <div className={`lp-form-body ${mounted?'in':''}`}>
            <form onSubmit={handleSubmit}>
              <div className="lp-fields">
                <div className="lp-field">
                  <label className="lp-lbl">Email</label>
                  <div className={`lp-wrap ${focused==='email'?'focused':''}`}>
                    <span className="lp-ico"><MailIcon/></span>
                    <input name="email" type="email" className="lp-inp"
                      value={form.email} onChange={handleChange}
                      placeholder="you@company.com" required autoComplete="email"
                      onFocus={()=>setFocused('email')} onBlur={()=>setFocused('')}/>
                  </div>
                </div>

                <div className="lp-field">
                  <label className="lp-lbl">Password</label>
                  <div className={`lp-wrap ${focused==='password'?'focused':''}`}>
                    <span className="lp-ico"><LockIcon/></span>
                    <input name="password" type={showPassword?'text':'password'} className="lp-inp"
                      value={form.password} onChange={handleChange}
                      placeholder="••••••••" required
                      onFocus={()=>setFocused('password')} onBlur={()=>setFocused('')}/>
                    <button type="button" className="lp-eye"
                      onClick={()=>setShowPassword(v=>!v)}>
                      {showPassword?<EyeOffIcon/>:<EyeIcon/>}
                    </button>
                  </div>
                  <div className="lp-forgot"><a href="#">Forgot password?</a></div>
                </div>
              </div>

              <button type="submit" className="lp-btn" disabled={loading}>
                {loading
                  ? <><span className="lp-spin"/> Signing in...</>
                  : <>Sign In <ArrowIcon/></>
                }
              </button>
            </form>

            <div className="lp-proof">
              <div className="lp-pavs">
                <div className="lp-pav">A</div>
                <div className="lp-pav">M</div>
                <div className="lp-pav">K</div>
                <div className="lp-pav">+</div>
              </div>
              <div className="lp-proof-text">
                <div className="lp-proof-stars">
                  {[0,1,2,3,4].map(i=><StarIcon key={i}/>)}
                </div>
                <h4>50,000+ teams already onboard</h4>
                <p>Rated 4.9 / 5 across 12,000+ reviews</p>
              </div>
            </div>

            <p className="lp-register">
              Don't have an account? <Link to="/register">Sign up free</Link>
            </p>

            <div className="lp-sec">
              <ShieldIcon/>
              256-bit encrypted · No credit card required · Free forever
            </div>
          </div>
        </div>
      </div>
    </>
  )
}