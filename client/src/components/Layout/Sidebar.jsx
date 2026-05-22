import { Link, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import Avatar from '../Shared/Avatar'

const navItems = [
  { path: '/dashboard', icon: '🏠', label: 'Dashboard' },
  { path: '/notifications', icon: '🔔', label: 'Notifications' },
  { path: '/profile', icon: '👤', label: 'Profile' },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const location = useLocation()

  return (
    <aside style={styles.sidebar}>
      <div style={styles.logo}>ProjectSync</div>
      <nav style={styles.nav}>
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              ...styles.navItem,
              background: location.pathname === item.path ? '#252840' : 'transparent',
              color: location.pathname === item.path ? '#e2e8f0' : '#94a3b8',
            }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div style={styles.bottom}>
        <div style={styles.userRow}>
          <Avatar name={user?.name} size={34} />
          <div style={styles.userText}>
            <p style={styles.userName}>{user?.name}</p>
            <p style={styles.userEmail}>{user?.email}</p>
          </div>
        </div>
        <button onClick={logout} style={styles.logoutBtn}>Logout</button>
      </div>
    </aside>
  )
}

const styles = {
  sidebar: {
    width: '240px', minWidth: '240px', background: '#1a1d2e',
    borderRight: '1px solid #2d3148', display: 'flex', flexDirection: 'column',
    padding: '24px 0', height: '100vh', position: 'sticky', top: 0,
  },
  logo: { color: '#6366f1', fontSize: '20px', fontWeight: '800', padding: '0 20px 28px', letterSpacing: '-0.5px' },
  nav: { display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 10px', flex: 1 },
  navItem: {
    display: 'flex', alignItems: 'center', gap: '10px',
    padding: '10px 12px', borderRadius: '8px', textDecoration: 'none',
    fontSize: '14px', fontWeight: '500', transition: 'all 0.15s',
  },
  bottom: { padding: '16px' },
  userRow: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' },
  userText: {},
  userName: { color: '#e2e8f0', fontSize: '13px', fontWeight: '600', margin: 0 },
  userEmail: { color: '#475569', fontSize: '11px', margin: 0 },
  logoutBtn: {
    width: '100%', background: 'transparent', border: '1px solid #2d3148',
    color: '#94a3b8', borderRadius: '8px', padding: '8px', fontSize: '13px', cursor: 'pointer',
  },
}