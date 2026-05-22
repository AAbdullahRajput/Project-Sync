import { Link } from 'react-router-dom'

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)

export default function NotFoundPage() {
  return (
    <div style={styles.page}>
      <div style={styles.glowOrb} />
      <div style={styles.card}>
        <div style={styles.codeWrapper}>
          <span style={styles.codeText}>404</span>
          <div style={styles.codeLine} />
        </div>
        <h2 style={styles.title}>Page Not Found</h2>
        <p style={styles.subtitle}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" style={styles.btn}>
          <HomeIcon />
          Back to Home
        </Link>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0f1117',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
  },
  glowOrb: {
    position: 'absolute',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
  },
  card: {
    background: '#1a1d2e',
    border: '1px solid #2d3148',
    borderRadius: '20px',
    padding: '60px 48px',
    textAlign: 'center',
    maxWidth: '480px',
    width: '100%',
    position: 'relative',
    zIndex: 1,
  },
  codeWrapper: {
    marginBottom: '28px',
    position: 'relative',
    display: 'inline-block',
  },
  codeText: {
    fontSize: '96px',
    fontWeight: '800',
    color: '#6366f1',
    lineHeight: 1,
    letterSpacing: '-4px',
    display: 'block',
    fontFamily: "'Segoe UI', sans-serif",
  },
  codeLine: {
    height: '3px',
    background: 'linear-gradient(90deg, transparent, #6366f1, transparent)',
    borderRadius: '2px',
    marginTop: '8px',
  },
  title: {
    color: '#f1f5f9',
    fontSize: '22px',
    fontWeight: '700',
    marginBottom: '12px',
  },
  subtitle: {
    color: '#64748b',
    fontSize: '15px',
    lineHeight: '1.6',
    marginBottom: '36px',
  },
  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 28px',
    background: '#6366f1',
    color: '#fff',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'background 0.2s',
  },
}