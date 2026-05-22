import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import toast from 'react-hot-toast'

// SVG Icons
const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
)
const CheckAllIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/><polyline points="20 6 13 13"/>
  </svg>
)
const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
)
const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
)
const CardIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
)
const CommentIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
)
const UserPlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
  </svg>
)
const MoveIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/>
  </svg>
)

const typeConfig = {
  card_assigned: { icon: <CardIcon />, color: '#6366f1', bg: 'rgba(99,102,241,0.15)', label: 'Assigned' },
  comment_added: { icon: <CommentIcon />, color: '#22c55e', bg: 'rgba(34,197,94,0.15)', label: 'Comment' },
  member_added:  { icon: <UserPlusIcon />, color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', label: 'Member' },
  card_moved:    { icon: <MoveIcon />, color: '#3b82f6', bg: 'rgba(59,130,246,0.15)', label: 'Moved' },
}

function timeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date)) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/notifications')
      .then(res => setNotifications(res.data))
      .catch(() => toast.error('Failed to load notifications'))
      .finally(() => setLoading(false))
  }, [])

  const markAllRead = async () => {
    await api.put('/notifications/read-all')
    setNotifications(notifications.map(n => ({ ...n, isRead: true })))
    toast.success('All marked as read')
  }

  const deleteNotif = async (id) => {
    await api.delete(`/notifications/${id}`)
    setNotifications(notifications.filter(n => n._id !== id))
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.logo}>ProjectSync</div>
        <nav style={styles.nav}>
          <Link to="/dashboard" style={styles.navItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
            Dashboard
          </Link>
          <div style={styles.navItemActive}>
            <BellIcon />
            Notifications
            {unreadCount > 0 && <span style={styles.badge}>{unreadCount}</span>}
          </div>
          <Link to="/profile" style={styles.navItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            Profile
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main style={styles.main}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <Link to="/dashboard" style={styles.backLink}>
              <BackIcon />
              Dashboard
            </Link>
            <div>
              <h1 style={styles.title}>Notifications</h1>
              <p style={styles.subtitle}>
                {unreadCount > 0
                  ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`
                  : 'You\'re all caught up'}
              </p>
            </div>
          </div>
          {notifications.length > 0 && (
            <button onClick={markAllRead} style={styles.markBtn}>
              <CheckAllIcon />
              Mark all read
            </button>
          )}
        </div>

        {/* Content */}
        <div style={styles.content}>
          {loading ? (
            <div style={styles.loadingWrapper}>
              {[1,2,3].map(i => (
                <div key={i} style={styles.skeletonItem}>
                  <div style={styles.skeletonIcon} />
                  <div style={styles.skeletonText}>
                    <div style={{ ...styles.skeletonLine, width: '60%' }} />
                    <div style={{ ...styles.skeletonLine, width: '40%', marginTop: '6px', height: '10px' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : notifications.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>
                <BellIcon />
              </div>
              <h3 style={styles.emptyTitle}>No notifications</h3>
              <p style={styles.emptyText}>
                You'll see activity here when team members interact with your projects.
              </p>
            </div>
          ) : (
            <div style={styles.list}>
              {notifications.map((n, idx) => {
                const config = typeConfig[n.type] || typeConfig.card_assigned
                return (
                  <div
                    key={n._id}
                    style={{
                      ...styles.item,
                      background: n.isRead ? '#1a1d2e' : '#1c2040',
                      borderLeft: n.isRead ? '3px solid transparent' : `3px solid ${config.color}`,
                    }}
                  >
                    {/* Type icon */}
                    <div style={{ ...styles.typeIcon, background: config.bg, color: config.color }}>
                      {config.icon}
                    </div>

                    {/* Message + meta */}
                    <div style={styles.itemBody}>
                      <p style={styles.itemMsg}>{n.message}</p>
                      <div style={styles.itemMeta}>
                        <span style={{ ...styles.typePill, background: config.bg, color: config.color }}>
                          {config.label}
                        </span>
                        <span style={styles.timeText}>
                          {timeAgo(n.createdAt)}
                        </span>
                        {!n.isRead && <span style={styles.unreadDot} />}
                      </div>
                    </div>

                    {/* Sender avatar */}
                    {n.sender && (
                      <div style={styles.senderAvatar} title={n.sender.name}>
                        {n.sender.name?.charAt(0).toUpperCase()}
                      </div>
                    )}

                    {/* Delete */}
                    <button
                      onClick={() => deleteNotif(n._id)}
                      style={styles.deleteBtn}
                      title="Dismiss"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

const styles = {
  page: {
    display: 'flex',
    minHeight: '100vh',
    background: '#0f1117',
    fontFamily: "'Segoe UI', sans-serif",
  },

  // Sidebar
  sidebar: {
    width: '240px',
    minWidth: '240px',
    background: '#1a1d2e',
    borderRight: '1px solid #2d3148',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 0',
    position: 'sticky',
    top: 0,
    height: '100vh',
  },
  logo: {
    color: '#6366f1',
    fontSize: '20px',
    fontWeight: '700',
    padding: '0 24px 28px',
    letterSpacing: '-0.3px',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    padding: '0 12px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 12px',
    borderRadius: '8px',
    color: '#64748b',
    fontSize: '14px',
    fontWeight: '500',
    textDecoration: 'none',
    transition: 'all 0.15s',
  },
  navItemActive: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 12px',
    borderRadius: '8px',
    color: '#f1f5f9',
    fontSize: '14px',
    fontWeight: '600',
    background: 'rgba(99,102,241,0.12)',
  },
  badge: {
    marginLeft: 'auto',
    background: '#6366f1',
    color: '#fff',
    borderRadius: '10px',
    padding: '1px 7px',
    fontSize: '11px',
    fontWeight: '700',
  },

  // Main area
  main: {
    flex: 1,
    padding: '40px',
    maxWidth: '860px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '32px',
    gap: '16px',
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    color: '#475569',
    fontSize: '13px',
    fontWeight: '500',
    textDecoration: 'none',
    marginBottom: '4px',
  },
  title: {
    color: '#f1f5f9',
    fontSize: '28px',
    fontWeight: '700',
    letterSpacing: '-0.5px',
    margin: 0,
  },
  subtitle: {
    color: '#475569',
    fontSize: '14px',
    margin: 0,
    marginTop: '4px',
  },
  markBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    background: 'transparent',
    border: '1px solid #2d3148',
    color: '#94a3b8',
    borderRadius: '8px',
    padding: '9px 16px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    flexShrink: 0,
    marginTop: '28px',
  },

  // Content
  content: { width: '100%' },

  // Loading skeletons
  loadingWrapper: { display: 'flex', flexDirection: 'column', gap: '10px' },
  skeletonItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '18px',
    background: '#1a1d2e',
    borderRadius: '12px',
    border: '1px solid #2d3148',
    animation: 'pulse 1.5s infinite',
  },
  skeletonIcon: {
    width: '38px', height: '38px', borderRadius: '10px',
    background: '#252840', flexShrink: 0,
  },
  skeletonText: { flex: 1 },
  skeletonLine: {
    height: '13px', background: '#252840', borderRadius: '6px',
  },

  // Empty state
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 20px',
    textAlign: 'center',
  },
  emptyIcon: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    background: 'rgba(99,102,241,0.12)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6366f1',
    marginBottom: '20px',
    transform: 'scale(1.5)',
  },
  emptyTitle: {
    color: '#f1f5f9',
    fontSize: '20px',
    fontWeight: '700',
    margin: '0 0 10px',
  },
  emptyText: {
    color: '#475569',
    fontSize: '14px',
    lineHeight: '1.6',
    maxWidth: '320px',
  },

  // Notification list
  list: { display: 'flex', flexDirection: 'column', gap: '8px' },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '16px 18px',
    borderRadius: '12px',
    border: '1px solid #2d3148',
    transition: 'background 0.15s',
    position: 'relative',
  },
  typeIcon: {
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  itemBody: { flex: 1, minWidth: 0 },
  itemMsg: {
    color: '#e2e8f0',
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '1.4',
    margin: '0 0 6px',
  },
  itemMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },
  typePill: {
    borderRadius: '6px',
    padding: '2px 8px',
    fontSize: '11px',
    fontWeight: '600',
    letterSpacing: '0.3px',
  },
  timeText: {
    color: '#475569',
    fontSize: '12px',
  },
  unreadDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#6366f1',
    flexShrink: 0,
  },
  senderAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '13px',
    fontWeight: '700',
    flexShrink: 0,
  },
  deleteBtn: {
    background: 'transparent',
    border: 'none',
    color: '#334155',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px',
    borderRadius: '6px',
    flexShrink: 0,
    transition: 'color 0.15s',
  },
}