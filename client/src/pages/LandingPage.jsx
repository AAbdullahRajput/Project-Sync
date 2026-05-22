import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Icons = {
  Kanban: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="5" height="18" rx="1"/>
      <rect x="10" y="3" width="5" height="12" rx="1"/>
      <rect x="17" y="3" width="4" height="8" rx="1"/>
    </svg>
  ),
  Team: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="3"/>
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
      <circle cx="19" cy="7" r="2"/>
      <path d="M21 21v-1a3 3 0 0 0-2-2.83"/>
    </svg>
  ),
  Bell: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      <circle cx="18" cy="5" r="3" fill="currentColor" stroke="none"/>
    </svg>
  ),
  Chart: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
      <line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Arrow: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  Star: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  Shield: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <polyline points="9 12 11 14 15 10"/>
    </svg>
  ),
  Zap: () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Github: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  ),
  Twitter: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Menu: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  Close: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
}

const stats = [
  { value: '10k+', label: 'Active users' },
  { value: '500+', label: 'Teams onboard' },
  { value: '2M+', label: 'Tasks completed' },
  { value: '99.9%', label: 'Uptime SLA' },
]

const features = [
  {
    Icon: Icons.Kanban,
    title: 'Visual Kanban Boards',
    desc: 'Drag and drop task cards across customizable columns. Build workflows that match exactly how your team works.',
    color: '#818cf8',
    bg: 'rgba(99,102,241,0.15)',
  },
  {
    Icon: Icons.Team,
    title: 'Team Collaboration',
    desc: 'Invite members by email, assign roles, and coordinate effortlessly. Everyone stays aligned automatically.',
    color: '#4ade80',
    bg: 'rgba(34,197,94,0.15)',
  },
  {
    Icon: Icons.Bell,
    title: 'Live Notifications',
    desc: 'Real-time alerts via WebSocket when cards move, comments land, or you get assigned to a task.',
    color: '#fbbf24',
    bg: 'rgba(245,158,11,0.15)',
  },
  {
    Icon: Icons.Chart,
    title: 'Priority & Progress',
    desc: 'Set task priorities, due dates, and checklists. Visual indicators keep your team focused on what ships next.',
    color: '#f472b6',
    bg: 'rgba(236,72,153,0.15)',
  },
  {
    Icon: Icons.Shield,
    title: 'Secure by Design',
    desc: 'JWT authentication, bcrypt password hashing, role-based access control — security at every layer.',
    color: '#22d3ee',
    bg: 'rgba(6,182,212,0.15)',
  },
  {
    Icon: Icons.Zap,
    title: 'Instant Setup',
    desc: 'Go from signup to your first project board in under 60 seconds. No configuration, no friction.',
    color: '#fb923c',
    bg: 'rgba(249,115,22,0.15)',
  },
]

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    desc: 'Perfect for individuals and small teams getting started.',
    cta: 'Start free',
    ctaLink: '/register',
    primary: false,
    perks: ['3 active projects', '5 team members', 'Kanban boards', 'Basic notifications', '100MB storage'],
  },
  {
    name: 'Pro',
    price: '$12',
    period: 'per seat / month',
    desc: 'For growing teams that need more power and collaboration.',
    cta: 'Start Pro trial',
    ctaLink: '/register',
    primary: true,
    badge: 'Most popular',
    perks: ['Unlimited projects', 'Unlimited members', 'Real-time sync', 'Priority support', 'Advanced analytics', '10GB storage'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    desc: 'Dedicated support, SSO, and compliance for large orgs.',
    cta: 'Contact sales',
    ctaLink: '/register',
    primary: false,
    perks: ['Everything in Pro', 'SSO / SAML', 'Audit logs', 'SLA guarantee', 'Dedicated manager', 'Custom storage'],
  },
]

const testimonials = [
  {
    text: 'ProjectSync replaced three tools we were using. Our sprint planning went from 2 hours to 20 minutes.',
    name: 'Sarah Chen',
    role: 'Engineering Lead, Stripe',
    initials: 'SC',
    color: '#818cf8',
    bg: 'rgba(99,102,241,0.2)',
  },
  {
    text: 'The real-time board updates are a game changer. Our remote team finally feels in sync.',
    name: 'Marcus Webb',
    role: 'Product Manager, Notion',
    initials: 'MW',
    color: '#4ade80',
    bg: 'rgba(34,197,94,0.2)',
  },
  {
    text: 'Clean, fast, and intuitive. Exactly what project management software should feel like.',
    name: 'Priya Nair',
    role: 'CTO, YC-backed startup',
    initials: 'PN',
    color: '#f472b6',
    bg: 'rgba(236,72,153,0.2)',
  },
]

const faqs = [
  { q: 'Is there a free plan?', a: 'Yes — ProjectSync is free forever for individuals and small teams up to 5 members, with up to 3 active projects.' },
  { q: 'How does real-time collaboration work?', a: 'We use Socket.io WebSockets so all board members see card moves, new comments, and status changes instantly without refreshing.' },
  { q: 'Can I import from Trello or Jira?', a: 'CSV import from Trello is supported. Jira import via API is on the roadmap for Q3 2026.' },
  { q: 'Is my data secure?', a: 'All data is encrypted at rest and in transit. Passwords are hashed with bcrypt. We use JWT with short expiry windows and refresh token rotation.' },
]

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hoveredFeature, setHoveredFeature] = useState(null)
  const [hoveredPricing, setHoveredPricing] = useState(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={s.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: #080b14; }
        html { scroll-behavior: smooth; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .hero-anim   { animation: fadeUp 0.7s ease both; }
        .hero-anim-2 { animation: fadeUp 0.7s 0.15s ease both; }
        .hero-anim-3 { animation: fadeUp 0.7s 0.3s ease both; }
        .hero-anim-4 { animation: fadeUp 0.7s 0.45s ease both; }
        .float       { animation: float 4s ease-in-out infinite; }

        .feature-card {
          transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
          cursor: default;
        }
        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .pricing-card { transition: transform 0.25s, box-shadow 0.25s; }
        .pricing-card:hover { transform: translateY(-6px); box-shadow: 0 24px 48px rgba(0,0,0,0.5); }

        .nav-link     { transition: color 0.15s; }
        .nav-link:hover { color: #ffffff !important; }

        .faq-item { transition: background 0.15s; cursor: pointer; }
        .faq-item:hover { background: rgba(255,255,255,0.05) !important; }

        .cta-primary  { transition: background 0.15s, transform 0.1s, box-shadow 0.15s; }
        .cta-primary:hover  { background: #4f52e8 !important; box-shadow: 0 8px 24px rgba(99,102,241,0.4); }
        .cta-primary:active { transform: scale(0.97); }

        .cta-ghost  { transition: background 0.15s, border-color 0.15s; }
        .cta-ghost:hover { background: rgba(255,255,255,0.08) !important; border-color: rgba(255,255,255,0.25) !important; }

        .stat-item { transition: transform 0.2s; }
        .stat-item:hover { transform: translateY(-3px); }

        .testimonial-card { transition: transform 0.2s, border-color 0.2s; }
        .testimonial-card:hover { transform: translateY(-4px); border-color: rgba(99,102,241,0.3) !important; }

        .footer-link { transition: color 0.15s !important; }
        .footer-link:hover { color: #e2e8f0 !important; }

        .social-link { transition: color 0.15s, transform 0.15s; }
        .social-link:hover { color: #e2e8f0 !important; transform: translateY(-2px); }

        .mobile-menu-link { transition: background 0.15s; }
        .mobile-menu-link:hover { background: rgba(255,255,255,0.06) !important; }

        .badge-link { transition: gap 0.15s; }
        .badge-link:hover { gap: 8px !important; }

        @media (max-width: 768px) {
          .hero-title    { font-size: 38px !important; letter-spacing: -1.5px !important; }
          .hero-sub      { font-size: 16px !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .pricing-grid  { grid-template-columns: 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
          .stats-grid    { grid-template-columns: repeat(2, 1fr) !important; }
          .nav-links     { display: none !important; }
          .hero-visual   { display: none !important; }
          .hero-btns     { flex-direction: column !important; align-items: stretch !important; }
          .hero-btns a   { text-align: center !important; }
          .section-pad   { padding: 60px 20px !important; }
          .steps-grid    { grid-template-columns: 1fr 1fr !important; }
          .footer-grid   { grid-template-columns: 1fr 1fr !important; }
          .footer-brand  { grid-column: 1 / -1 !important; }
          .footer-bottom { flex-direction: column !important; text-align: center !important; }
          .hero-section  { padding-top: 100px !important; padding-left: 20px !important; padding-right: 20px !important; }
          .cta-banner-title { font-size: 28px !important; }
          .section-title { font-size: 28px !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .steps-grid    { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 769px) {
          .mobile-nav-btn { display: none !important; }
          .mobile-menu    { display: none !important; }
        }
      `}</style>

      {/* ── Navbar ── */}
      <nav style={{
        ...s.nav,
        background: scrolled ? 'rgba(8,11,20,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
      }}>
        <div style={s.navInner}>
          {/* Logo */}
          <Link to="/" style={s.navLogo}>
            <div style={s.logoMark}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="5" height="14" rx="1.5" fill="#818cf8"/>
                <rect x="10" y="3" width="5" height="9" rx="1.5" fill="#a5b4fc"/>
                <rect x="17" y="3" width="4" height="6" rx="1.5" fill="#c7d2fe"/>
              </svg>
            </div>
            <span style={s.logoText}>ProjectSync</span>
          </Link>

          {/* Desktop Links */}
          <div style={s.navLinks} className="nav-links">
            {[['Features', '#features'], ['Pricing', '#pricing'], ['FAQ', '#faq']].map(([label, href]) => (
              <a key={label} href={href} style={s.navLink} className="nav-link">{label}</a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div style={s.navActions}>
            <Link to="/login" style={s.navSignIn} className="nav-link">Sign in</Link>
            <Link to="/register" style={s.navCta} className="cta-primary">Get started free</Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="mobile-nav-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={s.mobileMenuBtn}
          >
            {mobileMenuOpen ? <Icons.Close /> : <Icons.Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={s.mobileMenu} className="mobile-menu">
            {[['Features', '#features'], ['Pricing', '#pricing'], ['FAQ', '#faq']].map(([label, href]) => (
              <a
                key={label}
                href={href}
                style={s.mobileMenuLink}
                className="mobile-menu-link"
                onClick={() => setMobileMenuOpen(false)}
              >{label}</a>
            ))}
            <div style={s.mobileMenuDivider} />
            <Link to="/login" style={s.mobileMenuLink} className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Sign in</Link>
            <Link to="/register" style={{ ...s.mobileMenuLink, color: '#818cf8', fontWeight: '600' }} className="mobile-menu-link" onClick={() => setMobileMenuOpen(false)}>Get started free</Link>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section style={s.hero} className="hero-section">
        {/* Badge */}
        <div style={s.heroBadge} className="hero-anim">
          <span style={s.badgeDot} />
          <span style={s.badgeText}>Now with real-time collaboration</span>
          <Link to="/register" style={s.badgeLink} className="badge-link">
            Try it free
            <Icons.Arrow />
          </Link>
        </div>

        {/* Title */}
        <h1 style={s.heroTitle} className="hero-anim-2 hero-title">
          Ship projects faster.<br />
          <span style={s.heroGradient}>Stay in sync, always.</span>
        </h1>

        {/* Subtitle */}
        <p style={s.heroSub} className="hero-anim-3 hero-sub">
          A Kanban-style project management platform built for modern teams.
          Create boards, track priorities, comment in context — all updating live for every member.
        </p>

        {/* Buttons */}
        <div style={s.heroBtns} className="hero-anim-4 hero-btns">
          <Link to="/register" style={s.primaryBtn} className="cta-primary">Start for free — no card needed</Link>
          <Link to="/login"    style={s.ghostBtn}   className="cta-ghost">Sign in to your account</Link>
        </div>

        {/* Social proof */}
        <div style={s.socialProof} className="hero-anim-4">
          <div style={s.socialStars}>
            {[...Array(5)].map((_, i) => (
              <span key={i} style={{ color: '#fbbf24' }}><Icons.Star /></span>
            ))}
          </div>
          <span style={s.socialProofText}>Trusted by <strong style={{ color: '#e2e8f0' }}>10,000+</strong> teams worldwide</span>
        </div>

        {/* Board Preview */}
        <div style={s.heroVisual} className="float hero-visual">
          <div style={s.boardPreviewWrapper}>
            <div style={s.boardPreviewLabel}>Live board preview</div>
            <div style={s.boardPreview}>
              {[
                { name: 'Backlog', color: '#818cf8', cards: ['Set up CI/CD pipeline', 'Write API docs'], count: 2 },
                { name: 'In Progress', color: '#fbbf24', cards: ['Auth module', 'Dashboard UI'], count: 2 },
                { name: 'Done', color: '#4ade80', cards: ['DB schema', 'User model'], count: 2 },
              ].map(col => (
                <div key={col.name} style={s.previewCol}>
                  <div style={{ ...s.previewColHeader, borderTop: `3px solid ${col.color}` }}>
                    <span style={s.previewColName}>{col.name}</span>
                    <span style={{ ...s.previewColCount, background: col.color + '22', color: col.color }}>{col.count}</span>
                  </div>
                  {col.cards.map(card => (
                    <div key={card} style={s.previewCard}>
                      <div style={{ ...s.previewCardBar, background: col.color }} />
                      <p style={s.previewCardTitle}>{card}</p>
                      <div style={s.previewCardMeta}>
                        <div style={{ ...s.previewAvatar, background: col.color }} />
                        <span style={s.previewPriority}>medium</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={s.statsSection}>
        <div style={s.statsInner} className="stats-grid">
          {stats.map(({ value, label }) => (
            <div key={label} style={s.statItem} className="stat-item">
              <div style={s.statValue}>{value}</div>
              <div style={s.statLabel}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" style={s.section} className="section-pad">
        <div style={s.sectionHeader}>
          <div style={s.pill}>Features</div>
          <h2 style={s.sectionTitle} className="section-title">Everything your team needs</h2>
          <p style={s.sectionSub}>Built from scratch with the tools that actually move projects forward.</p>
        </div>
        <div style={s.featuresGrid} className="features-grid">
          {features.map(({ Icon, title, desc, color, bg }, i) => (
            <div
              key={title}
              style={{
                ...s.featureCard,
                borderColor: hoveredFeature === i ? color + '55' : 'rgba(255,255,255,0.07)',
              }}
              className="feature-card"
              onMouseEnter={() => setHoveredFeature(i)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div style={{ ...s.featureIcon, color, background: bg }}>
                <Icon />
              </div>
              <h3 style={s.featureTitle}>{title}</h3>
              <p style={s.featureDesc}>{desc}</p>
              <div style={{ ...s.featureArrow, color, opacity: hoveredFeature === i ? 1 : 0 }}>
                Learn more <Icons.Arrow />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section style={{ ...s.section, background: 'rgba(99,102,241,0.04)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }} className="section-pad">
        <div style={s.sectionHeader}>
          <div style={s.pill}>How it works</div>
          <h2 style={s.sectionTitle} className="section-title">Up and running in minutes</h2>
          <p style={s.sectionSub}>Four simple steps from signup to shipping with your team.</p>
        </div>
        <div style={s.stepsGrid} className="steps-grid">
          {[
            { step: '01', title: 'Create your workspace', desc: 'Register and set up your first project with a name, color, and description.' },
            { step: '02', title: 'Invite your team', desc: 'Add members by email and assign roles — admin, member, or viewer.' },
            { step: '03', title: 'Build your board', desc: 'Add columns that match your workflow. Drag cards as work progresses.' },
            { step: '04', title: 'Ship together', desc: 'Comment, assign tasks, track priorities — all syncing live for every member.' },
          ].map(({ step, title, desc }) => (
            <div key={step} style={s.stepItem}>
              <div style={s.stepNumber}>{step}</div>
              <h3 style={s.stepTitle}>{title}</h3>
              <p style={s.stepDesc}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={s.section} className="section-pad">
        <div style={s.sectionHeader}>
          <div style={s.pill}>Testimonials</div>
          <h2 style={s.sectionTitle} className="section-title">Teams love ProjectSync</h2>
          <p style={s.sectionSub}>Real feedback from real teams using ProjectSync every day.</p>
        </div>
        <div style={s.testimonialsGrid} className="testimonials-grid">
          {testimonials.map(({ text, name, role, initials, color, bg }) => (
            <div key={name} style={s.testimonialCard} className="testimonial-card">
              <div style={s.stars}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: '#fbbf24' }}><Icons.Star /></span>
                ))}
              </div>
              <p style={s.testimonialText}>"{text}"</p>
              <div style={s.testimonialAuthor}>
                <div style={{ ...s.testimonialAvatar, background: bg, color }}>
                  {initials}
                </div>
                <div>
                  <div style={s.testimonialName}>{name}</div>
                  <div style={s.testimonialRole}>{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" style={{ ...s.section, background: 'rgba(99,102,241,0.04)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }} className="section-pad">
        <div style={s.sectionHeader}>
          <div style={s.pill}>Pricing</div>
          <h2 style={s.sectionTitle} className="section-title">Simple, transparent pricing</h2>
          <p style={s.sectionSub}>Start free, scale when you need to. No hidden fees, no surprises.</p>
        </div>
        <div style={s.pricingGrid} className="pricing-grid">
          {pricingPlans.map(({ name, price, period, desc, cta, ctaLink, primary, badge, perks }, i) => (
            <div
              key={name}
              style={{
                ...s.pricingCard,
                ...(primary ? s.pricingCardPrimary : {}),
              }}
              className="pricing-card"
              onMouseEnter={() => setHoveredPricing(i)}
              onMouseLeave={() => setHoveredPricing(null)}
            >
              {badge && <div style={s.pricingBadge}>{badge}</div>}
              <div style={s.pricingName}>{name}</div>
              <div style={s.pricingPrice}>
                {price}
                {price !== 'Custom' && <span style={s.pricingPeriodInline}>/mo</span>}
              </div>
              <p style={s.pricingPeriodText}>{period}</p>
              <p style={s.pricingDesc}>{desc}</p>
              <div style={s.pricingDivider} />
              <div style={s.pricingPerks}>
                {perks.map(p => (
                  <div key={p} style={s.pricingPerk}>
                    <span style={{ color: '#4ade80', display: 'flex', flexShrink: 0 }}><Icons.Check /></span>
                    <span style={s.pricingPerkText}>{p}</span>
                  </div>
                ))}
              </div>
              <Link
                to={ctaLink}
                style={primary ? s.pricingCtaPrimary : s.pricingCtaGhost}
                className={primary ? 'cta-primary' : 'cta-ghost'}
              >
                {cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={s.section} className="section-pad">
        <div style={s.sectionHeader}>
          <div style={s.pill}>FAQ</div>
          <h2 style={s.sectionTitle} className="section-title">Common questions</h2>
          <p style={s.sectionSub}>Everything you need to know about ProjectSync.</p>
        </div>
        <div style={s.faqList}>
          {faqs.map(({ q, a }, i) => (
            <div
              key={i}
              style={{
                ...s.faqItem,
                background: openFaq === i ? 'rgba(99,102,241,0.06)' : 'transparent',
                borderColor: openFaq === i ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.07)',
              }}
              className="faq-item"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div style={s.faqQuestion}>
                <span style={s.faqQ}>{q}</span>
                <span style={{
                  ...s.faqIcon,
                  transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                  color: openFaq === i ? '#818cf8' : '#475569',
                }}>+</span>
              </div>
              {openFaq === i && <p style={s.faqAnswer}>{a}</p>}
            </div>
          ))}
        </div>
        <div style={s.faqCta}>
          <span style={s.faqCtaText}>Still have questions?</span>
          <Link to="/register" style={s.faqCtaLink} className="cta-primary">Get in touch</Link>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={s.ctaBanner}>
        <div style={s.ctaBannerInner}>
          <div style={s.ctaBannerBadge}>Free forever on the base plan</div>
          <h2 style={s.ctaBannerTitle} className="cta-banner-title">Start building today.</h2>
          <p style={s.ctaBannerSub}>No credit card required. Set up your first board in under 2 minutes.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" style={s.ctaBannerBtn} className="cta-primary">Create free account</Link>
            <Link to="/login"    style={s.ctaBannerGhost} className="cta-ghost">Sign in instead</Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={s.footer}>
        <div style={s.footerGrid} className="footer-grid">
          <div className="footer-brand">
            <Link to="/" style={s.footerLogoRow}>
              <div style={s.logoMark}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="5" height="14" rx="1.5" fill="#818cf8"/>
                  <rect x="10" y="3" width="5" height="9" rx="1.5" fill="#a5b4fc"/>
                  <rect x="17" y="3" width="4" height="6" rx="1.5" fill="#c7d2fe"/>
                </svg>
              </div>
              <span style={s.logoText}>ProjectSync</span>
            </Link>
            <p style={s.footerTagline}>Project management for teams who want to ship, not manage tools.</p>
            <div style={s.footerSocials}>
              <a href="https://github.com" style={s.socialLink} className="social-link" title="GitHub"><Icons.Github /></a>
              <a href="https://twitter.com" style={s.socialLink} className="social-link" title="Twitter / X"><Icons.Twitter /></a>
            </div>
          </div>
          <div>
            <div style={s.footerColTitle}>Product</div>
            {[['Features', '#features'], ['Pricing', '#pricing'], ['Changelog', '#'], ['Roadmap', '#']].map(([label, href]) => (
              <a key={label} href={href} style={s.footerLink} className="footer-link">{label}</a>
            ))}
          </div>
          <div>
            <div style={s.footerColTitle}>Company</div>
            {[['About', '#'], ['Blog', '#'], ['Careers', '#'], ['Press', '#']].map(([label, href]) => (
              <a key={label} href={href} style={s.footerLink} className="footer-link">{label}</a>
            ))}
          </div>
          <div>
            <div style={s.footerColTitle}>Legal</div>
            {[['Privacy Policy', '#'], ['Terms of Service', '#'], ['Cookie Policy', '#']].map(([label, href]) => (
              <a key={label} href={href} style={s.footerLink} className="footer-link">{label}</a>
            ))}
          </div>
        </div>
        <div style={s.footerBottom} className="footer-bottom">
          <span style={{ color: '#334155' }}>© 2026 ProjectSync. Built for CodeAlpha internship.</span>
          <span style={{ color: '#1e293b' }}>All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}

const s = {
  page: {
    minHeight: '100vh',
    background: '#080b14',
    color: '#e2e8f0',
    fontFamily: "'Inter', sans-serif",
    overflowX: 'hidden',
  },

  // ── Navbar ──
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    transition: 'background 0.3s, border-color 0.3s',
  },
  navInner: {
    maxWidth: '1200px', margin: '0 auto', padding: '0 24px',
    height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  navLogo: {
    display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none',
  },
  logoMark: {
    width: '32px', height: '32px', background: 'rgba(99,102,241,0.15)',
    borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  logoText: {
    fontSize: '18px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.4px',
  },
  navLinks: { display: 'flex', gap: '32px' },
  navLink: {
    color: '#94a3b8', fontSize: '14px', fontWeight: '500',
    textDecoration: 'none', letterSpacing: '0.1px',
  },
  navActions: { display: 'flex', alignItems: 'center', gap: '12px' },
  navSignIn: {
    color: '#cbd5e1', fontSize: '14px', fontWeight: '500',
    textDecoration: 'none', padding: '8px 14px',
  },
  navCta: {
    background: '#6366f1', color: '#ffffff', fontSize: '14px', fontWeight: '600',
    padding: '8px 18px', borderRadius: '8px', textDecoration: 'none',
  },
  mobileMenuBtn: {
    background: 'transparent', border: 'none', color: '#e2e8f0',
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '4px',
  },
  mobileMenu: {
    background: 'rgba(8,11,20,0.98)', borderTop: '1px solid rgba(255,255,255,0.08)',
    padding: '8px 0', backdropFilter: 'blur(16px)',
  },
  mobileMenuLink: {
    display: 'block', padding: '14px 24px', color: '#e2e8f0',
    fontSize: '15px', fontWeight: '500', textDecoration: 'none',
  },
  mobileMenuDivider: { height: '1px', background: 'rgba(255,255,255,0.07)', margin: '8px 0' },

  // ── Hero ──
  hero: {
    paddingTop: '140px', paddingBottom: '80px',
    paddingLeft: '24px', paddingRight: '24px',
    textAlign: 'center', maxWidth: '960px', margin: '0 auto',
  },
  heroBadge: {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)',
    borderRadius: '100px', padding: '6px 14px 6px 10px', marginBottom: '32px',
  },
  badgeDot: {
    width: '7px', height: '7px', borderRadius: '50%', background: '#818cf8',
    animation: 'pulse 2s infinite', display: 'inline-block',
  },
  badgeText: { fontSize: '13px', color: '#c7d2fe', fontWeight: '500' },
  badgeLink: {
    fontSize: '13px', color: '#818cf8', fontWeight: '700',
    textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px',
    transition: 'gap 0.15s',
  },
  heroTitle: {
    fontSize: '60px', fontWeight: '900', lineHeight: '1.08',
    letterSpacing: '-2.5px', color: '#f8fafc', marginBottom: '22px',
  },
  heroGradient: {
    background: 'linear-gradient(135deg, #818cf8, #a78bfa, #ec4899)',
    backgroundSize: '200% 200%',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: 'gradientShift 4s ease infinite',
  },
  heroSub: {
    fontSize: '18px', lineHeight: '1.75', color: '#94a3b8',
    marginBottom: '36px', maxWidth: '580px', marginLeft: 'auto', marginRight: 'auto',
  },
  heroBtns: { display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '28px' },
  primaryBtn: {
    background: '#6366f1', color: '#ffffff', padding: '14px 28px',
    borderRadius: '10px', fontSize: '15px', fontWeight: '700',
    textDecoration: 'none', display: 'inline-block', letterSpacing: '-0.2px',
  },
  ghostBtn: {
    color: '#cbd5e1', padding: '14px 28px', borderRadius: '10px',
    fontSize: '15px', fontWeight: '500', textDecoration: 'none',
    border: '1px solid rgba(255,255,255,0.12)', display: 'inline-block',
  },
  socialProof: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '60px' },
  socialStars: { display: 'flex', gap: '2px' },
  socialProofText: { fontSize: '13px', color: '#64748b', fontWeight: '500' },

  // Board preview
  heroVisual: { marginTop: '20px', display: 'flex', justifyContent: 'center' },
  boardPreviewWrapper: { position: 'relative' },
  boardPreviewLabel: {
    fontSize: '11px', fontWeight: '600', color: '#475569',
    textTransform: 'uppercase', letterSpacing: '1px',
    textAlign: 'center', marginBottom: '12px',
  },
  boardPreview: {
    display: 'flex', gap: '12px',
    background: 'rgba(17,24,39,0.9)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px', padding: '20px',
    maxWidth: '700px', width: '100%',
    boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
  },
  previewCol: {
    flex: 1, background: '#1a1d2e', borderRadius: '10px',
    padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px',
  },
  previewColHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    paddingTop: '8px', marginBottom: '6px',
  },
  previewColName: {
    fontSize: '10px', fontWeight: '700', color: '#94a3b8',
    textTransform: 'uppercase', letterSpacing: '0.8px',
  },
  previewColCount: {
    fontSize: '10px', fontWeight: '700', padding: '2px 7px', borderRadius: '12px',
  },
  previewCard: {
    background: '#252840', borderRadius: '8px', padding: '10px',
    position: 'relative', overflow: 'hidden',
  },
  previewCardBar: { position: 'absolute', top: 0, left: 0, right: 0, height: '2px' },
  previewCardTitle: {
    fontSize: '11px', color: '#e2e8f0', fontWeight: '500',
    marginBottom: '8px', paddingTop: '3px', lineHeight: '1.4',
  },
  previewCardMeta: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  previewAvatar: { width: '18px', height: '18px', borderRadius: '50%' },
  previewPriority: { fontSize: '9px', color: '#fbbf24', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.4px' },

  // ── Stats ──
  statsSection: {
    borderTop: '1px solid rgba(255,255,255,0.05)',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    background: 'rgba(255,255,255,0.02)',
  },
  statsInner: {
    maxWidth: '900px', margin: '0 auto', padding: '48px 24px',
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px', textAlign: 'center',
  },
  statItem: {},
  statValue: {
    fontSize: '38px', fontWeight: '900', color: '#ffffff',
    letterSpacing: '-2px', lineHeight: 1,
  },
  statLabel: { fontSize: '13px', color: '#475569', marginTop: '8px', fontWeight: '500' },

  // ── Sections ──
  section: { padding: '100px 24px' },
  sectionHeader: { textAlign: 'center', maxWidth: '600px', margin: '0 auto 56px' },
  pill: {
    display: 'inline-flex', alignItems: 'center',
    background: 'rgba(99,102,241,0.12)', color: '#a5b4fc',
    fontSize: '11px', fontWeight: '700', padding: '4px 12px',
    borderRadius: '100px', marginBottom: '16px',
    textTransform: 'uppercase', letterSpacing: '1px',
  },
  sectionTitle: {
    fontSize: '38px', fontWeight: '800', color: '#f8fafc',
    letterSpacing: '-1.2px', marginBottom: '16px', lineHeight: '1.15',
  },
  sectionSub: { fontSize: '16px', color: '#64748b', lineHeight: '1.7' },

  // ── Features ──
  featuresGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px', maxWidth: '1100px', margin: '0 auto',
  },
  featureCard: {
    background: '#0d1117', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '14px', padding: '28px 24px', position: 'relative', overflow: 'hidden',
  },
  featureIcon: {
    width: '52px', height: '52px', borderRadius: '12px',
    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px',
  },
  featureTitle: {
    color: '#f1f5f9', fontSize: '16px', fontWeight: '700',
    marginBottom: '10px', letterSpacing: '-0.3px',
  },
  featureDesc: { color: '#64748b', fontSize: '14px', lineHeight: '1.7', marginBottom: '16px' },
  featureArrow: {
    display: 'flex', alignItems: 'center', gap: '6px',
    fontSize: '13px', fontWeight: '600', transition: 'opacity 0.2s',
  },

  // ── Steps ──
  stepsGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px', maxWidth: '1100px', margin: '0 auto',
  },
  stepItem: { textAlign: 'center', padding: '24px 16px' },
  stepNumber: {
    fontSize: '40px', fontWeight: '900', color: 'rgba(129,140,248,0.25)',
    marginBottom: '16px', letterSpacing: '-2px',
  },
  stepTitle: {
    fontSize: '15px', fontWeight: '700', color: '#f1f5f9',
    marginBottom: '10px', letterSpacing: '-0.2px',
  },
  stepDesc: { fontSize: '13px', color: '#64748b', lineHeight: '1.65' },

  // ── Testimonials ──
  testimonialsGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px', maxWidth: '1100px', margin: '0 auto',
  },
  testimonialCard: {
    background: '#0d1117', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '14px', padding: '28px 24px',
    display: 'flex', flexDirection: 'column', gap: '16px',
  },
  stars: { display: 'flex', gap: '3px' },
  testimonialText: { color: '#94a3b8', fontSize: '14px', lineHeight: '1.8', flex: 1 },
  testimonialAuthor: { display: 'flex', alignItems: 'center', gap: '12px' },
  testimonialAvatar: {
    width: '42px', height: '42px', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '14px', fontWeight: '800', flexShrink: 0,
  },
  testimonialName: { fontSize: '14px', fontWeight: '700', color: '#f1f5f9' },
  testimonialRole: { fontSize: '12px', color: '#475569', marginTop: '2px' },

  // ── Pricing ──
  pricingGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px', maxWidth: '1000px', margin: '0 auto',
  },
  pricingCard: {
    background: '#0d1117', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '16px', padding: '32px 28px',
    position: 'relative', display: 'flex', flexDirection: 'column',
  },
  pricingCardPrimary: {
    border: '1px solid rgba(99,102,241,0.5)',
    background: 'linear-gradient(160deg, rgba(99,102,241,0.08) 0%, #0d1117 60%)',
  },
  pricingBadge: {
    position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
    background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', color: '#fff',
    fontSize: '11px', fontWeight: '700', padding: '4px 16px',
    borderRadius: '100px', whiteSpace: 'nowrap', letterSpacing: '0.5px',
  },
  pricingName: {
    fontSize: '12px', fontWeight: '700', color: '#818cf8',
    textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px',
  },
  pricingPrice: {
    fontSize: '46px', fontWeight: '900', color: '#f8fafc',
    letterSpacing: '-2px', lineHeight: 1, marginBottom: '4px',
  },
  pricingPeriodInline: { fontSize: '20px', fontWeight: '500', color: '#475569' },
  pricingPeriodText: { fontSize: '12px', color: '#475569', marginBottom: '14px', fontWeight: '500' },
  pricingDesc: { fontSize: '13px', color: '#64748b', lineHeight: '1.65', marginBottom: '20px' },
  pricingDivider: { height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '20px' },
  pricingPerks: {
    display: 'flex', flexDirection: 'column', gap: '12px',
    flex: 1, marginBottom: '28px',
  },
  pricingPerk: { display: 'flex', alignItems: 'center', gap: '10px' },
  pricingPerkText: { fontSize: '13px', color: '#cbd5e1', fontWeight: '500' },
  pricingCtaPrimary: {
    background: '#6366f1', color: '#fff', padding: '13px 20px',
    borderRadius: '10px', fontSize: '14px', fontWeight: '700',
    textDecoration: 'none', textAlign: 'center', display: 'block',
  },
  pricingCtaGhost: {
    background: 'transparent', color: '#e2e8f0', padding: '13px 20px',
    borderRadius: '10px', fontSize: '14px', fontWeight: '600',
    textDecoration: 'none', textAlign: 'center', display: 'block',
    border: '1px solid rgba(255,255,255,0.12)',
  },

  // ── FAQ ──
  faqList: {
    maxWidth: '680px', margin: '0 auto 40px',
    display: 'flex', flexDirection: 'column', gap: '6px',
  },
  faqItem: {
    borderRadius: '12px', padding: '20px 24px',
    border: '1px solid rgba(255,255,255,0.07)', transition: 'all 0.15s',
  },
  faqQuestion: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' },
  faqQ: { fontSize: '15px', fontWeight: '600', color: '#f1f5f9', letterSpacing: '-0.2px' },
  faqIcon: {
    fontSize: '24px', fontWeight: '300', lineHeight: 1,
    display: 'inline-block', flexShrink: 0,
  },
  faqAnswer: { fontSize: '14px', color: '#94a3b8', lineHeight: '1.75', marginTop: '14px' },
  faqCta: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: '14px', marginTop: '12px',
  },
  faqCtaText: { fontSize: '15px', color: '#64748b' },
  faqCtaLink: {
    background: 'transparent', color: '#818cf8', fontSize: '14px', fontWeight: '600',
    textDecoration: 'none', padding: '8px 16px', borderRadius: '8px',
    border: '1px solid rgba(99,102,241,0.3)',
  },

  // ── CTA Banner ──
  ctaBanner: {
    background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(168,85,247,0.08))',
    borderTop: '1px solid rgba(99,102,241,0.2)',
    borderBottom: '1px solid rgba(99,102,241,0.2)',
    padding: '80px 24px',
  },
  ctaBannerInner: { textAlign: 'center', maxWidth: '560px', margin: '0 auto' },
  ctaBannerBadge: {
    display: 'inline-block', background: 'rgba(99,102,241,0.15)',
    color: '#a5b4fc', fontSize: '12px', fontWeight: '600',
    padding: '4px 14px', borderRadius: '100px', marginBottom: '20px',
    letterSpacing: '0.5px', border: '1px solid rgba(99,102,241,0.25)',
  },
  ctaBannerTitle: {
    fontSize: '42px', fontWeight: '900', color: '#f8fafc',
    letterSpacing: '-1.8px', marginBottom: '14px', lineHeight: '1.1',
  },
  ctaBannerSub: {
    fontSize: '16px', color: '#94a3b8', marginBottom: '32px', lineHeight: '1.65',
  },
  ctaBannerBtn: {
    background: '#6366f1', color: '#fff', padding: '14px 28px',
    borderRadius: '10px', fontSize: '15px', fontWeight: '700',
    textDecoration: 'none', display: 'inline-block', letterSpacing: '-0.2px',
  },
  ctaBannerGhost: {
    color: '#cbd5e1', padding: '14px 24px', borderRadius: '10px',
    fontSize: '15px', fontWeight: '500', textDecoration: 'none',
    display: 'inline-block', border: '1px solid rgba(255,255,255,0.1)',
  },

  // ── Footer ──
  footer: {
    background: '#060811',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    padding: '64px 24px 32px',
  },
  footerGrid: {
    display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: '40px', maxWidth: '1100px', margin: '0 auto',
    paddingBottom: '48px', borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  footerLogoRow: {
    display: 'flex', alignItems: 'center', gap: '10px',
    textDecoration: 'none', marginBottom: '16px',
  },
  footerTagline: {
    fontSize: '13px', color: '#475569', lineHeight: '1.7',
    maxWidth: '280px', marginBottom: '20px',
  },
  footerSocials: { display: 'flex', gap: '14px' },
  socialLink: {
    color: '#475569', textDecoration: 'none',
    display: 'flex', alignItems: 'center',
  },
  footerColTitle: {
    fontSize: '11px', fontWeight: '700', color: '#64748b',
    textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px',
  },
  footerLink: {
    display: 'block', fontSize: '13px', color: '#475569',
    textDecoration: 'none', marginBottom: '12px', fontWeight: '500',
  },
  footerBottom: {
    maxWidth: '1100px', margin: '32px auto 0',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    fontSize: '12px', flexWrap: 'wrap', gap: '8px',
  },
}