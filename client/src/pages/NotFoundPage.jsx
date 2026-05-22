import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div style={styles.page}>
      <h1 style={styles.code}>404</h1>
      <p style={styles.msg}>Page not found</p>
      <Link to="/" style={styles.btn}>Go Home</Link>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh', background: '#0f1117', display: 'flex',
    flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px',
  },
  code: { fontSize: '80px', fontWeight: '800', color: '#6366f1' },
  msg: { color: '#94a3b8', fontSize: '18px' },
  btn: {
    padding: '10px 24px', background: '#6366f1', color: '#fff',
    borderRadius: '8px', fontSize: '15px', fontWeight: '600',
  },
}