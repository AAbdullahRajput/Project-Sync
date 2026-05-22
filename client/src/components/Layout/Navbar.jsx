import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

export default function Navbar({ projectName, projectColor, projectId }) {
  const { user, logout } = useAuth()

  return (
    <header style={{ ...styles.navbar, borderBottom: `3px solid ${projectColor || '#6366f1'}` }}>
      <div style={styles.left}>
        <Link to="/dashboard" style={styles.back}>← Dashboard</Link>
        {projectName && <h1 style={styles.name}>{projectName}</h1>}
      </div>
      <div style={styles.right}>
        {projectId && (
          <Link to={`/projects/${projectId}/settings`} style={styles.link}>⚙ Settings</Link>
        )}
        <Link to="/notifications" style={styles.link}>🔔</Link>
        <Link to="/profile" style={styles.link}>👤 {user?.name?.split(' ')[0]}</Link>
        <button onClick={logout} style={styles.logoutBtn}>Logout</button>
      </div>
    </header>
  )
}

const styles = {
  navbar: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '0 24px', height: '56px', background: '#1a1d2e', flexShrink: 0,
  },
  left: { display: 'flex', alignItems: 'center', gap: '16px' },
  back: { color: '#94a3b8', fontSize: '13px', textDecoration: 'none', fontWeight: '500' },
  name: { color: '#f1f5f9', fontSize: '17px', fontWeight: '700', margin: 0 },
  right: { display: 'flex', alignItems: 'center', gap: '12px' },
  link: { color: '#94a3b8', fontSize: '13px', textDecoration: 'none', fontWeight: '500' },
  logoutBtn: {
    background: 'transparent', border: '1px solid #2d3148',
    color: '#94a3b8', borderRadius: '6px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer',
  },
}