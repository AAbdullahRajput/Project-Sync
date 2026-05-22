import { Link, useLocation } from 'react-router-dom'

const items = [
  { path: '/dashboard', icon: '🏠', label: 'Home' },
  { path: '/notifications', icon: '🔔', label: 'Alerts' },
  { path: '/profile', icon: '👤', label: 'Profile' },
]

export default function BottomNav() {
  const location = useLocation()

  return (
    <>
      <nav style={styles.nav}>
        {items.map(item => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              ...styles.item,
              color: location.pathname === item.path ? '#6366f1' : '#475569',
            }}
          >
            <span style={styles.icon}>{item.icon}</span>
            <span style={styles.label}>{item.label}</span>
          </Link>
        ))}
      </nav>
      <style>{`
        @media (min-width: 768px) { .bottom-nav { display: none !important; } }
      `}</style>
    </>
  )
}

const styles = {
  nav: {
    position: 'fixed', bottom: 0, left: 0, right: 0,
    background: '#1a1d2e', borderTop: '1px solid #2d3148',
    display: 'flex', justifyContent: 'space-around', alignItems: 'center',
    height: '60px', zIndex: 100,
  },
  item: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', textDecoration: 'none' },
  icon: { fontSize: '20px' },
  label: { fontSize: '10px', fontWeight: '600' },
}