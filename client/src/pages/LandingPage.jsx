import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div style={styles.page}>
      <nav style={styles.nav}>
        <span style={styles.logo}>ProjectSync</span>
        <div style={styles.navLinks}>
          <Link to="/login" style={styles.navBtn}>Sign In</Link>
          <Link to="/register" style={styles.navBtnPrimary}>Get Started</Link>
        </div>
      </nav>

      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Manage projects.<br />Ship faster.</h1>
        <p style={styles.heroSub}>
          A Kanban-style project management tool for teams. Create boards, assign tasks, track progress — all in real time.
        </p>
        <div style={styles.heroBtns}>
          <Link to="/register" style={styles.primaryBtn}>Start for Free</Link>
          <Link to="/login" style={styles.ghostBtn}>Sign In</Link>
        </div>
      </section>

      <section style={styles.features}>
        {[
          { icon: '📋', title: 'Kanban Boards', desc: 'Drag and drop cards across columns to track your workflow visually.' },
          { icon: '👥', title: 'Team Collaboration', desc: 'Invite members, assign tasks, and work together in real time.' },
          { icon: '🔔', title: 'Live Notifications', desc: 'Get instant updates when cards are moved, assigned or commented on.' },
          { icon: '📊', title: 'Priority Tracking', desc: 'Set priorities and due dates to keep your team focused on what matters.' },
        ].map((f) => (
          <div key={f.title} style={styles.featureCard}>
            <span style={styles.featureIcon}>{f.icon}</span>
            <h3 style={styles.featureTitle}>{f.title}</h3>
            <p style={styles.featureDesc}>{f.desc}</p>
          </div>
        ))}
      </section>

      <footer style={styles.footer}>
        <p>© 2026 ProjectSync. Built for CodeAlpha internship.</p>
      </footer>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: '#0f1117', color: '#e2e8f0' },
  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '20px 40px', borderBottom: '1px solid #2d3148',
  },
  logo: { color: '#6366f1', fontSize: '22px', fontWeight: '700' },
  navLinks: { display: 'flex', gap: '12px' },
  navBtn: {
    padding: '8px 18px', borderRadius: '8px', border: '1px solid #2d3148',
    color: '#e2e8f0', fontSize: '14px', fontWeight: '500',
  },
  navBtnPrimary: {
    padding: '8px 18px', borderRadius: '8px', background: '#6366f1',
    color: '#fff', fontSize: '14px', fontWeight: '600',
  },
  hero: {
    textAlign: 'center', padding: '100px 20px 80px',
    maxWidth: '700px', margin: '0 auto',
  },
  heroTitle: {
    fontSize: '56px', fontWeight: '800', lineHeight: '1.1',
    marginBottom: '20px', color: '#f1f5f9',
  },
  heroSub: {
    fontSize: '18px', color: '#94a3b8', lineHeight: '1.6', marginBottom: '36px',
  },
  heroBtns: { display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' },
  primaryBtn: {
    padding: '14px 32px', background: '#6366f1', color: '#fff',
    borderRadius: '10px', fontSize: '16px', fontWeight: '600',
  },
  ghostBtn: {
    padding: '14px 32px', border: '1px solid #2d3148', color: '#e2e8f0',
    borderRadius: '10px', fontSize: '16px', fontWeight: '500',
  },
  features: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px', padding: '40px', maxWidth: '1000px', margin: '0 auto',
  },
  featureCard: {
    background: '#1a1d2e', border: '1px solid #2d3148',
    borderRadius: '12px', padding: '28px 24px',
  },
  featureIcon: { fontSize: '32px', display: 'block', marginBottom: '14px' },
  featureTitle: { color: '#f1f5f9', fontSize: '17px', fontWeight: '600', marginBottom: '8px' },
  featureDesc: { color: '#94a3b8', fontSize: '14px', lineHeight: '1.6' },
  footer: {
    textAlign: 'center', padding: '30px', color: '#475569',
    borderTop: '1px solid #2d3148', fontSize: '13px',
  },
}