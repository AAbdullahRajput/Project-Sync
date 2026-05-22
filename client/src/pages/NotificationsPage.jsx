import { useEffect, useState } from 'react'
import api from '../services/api'
import toast from 'react-hot-toast'

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

  if (loading) return <div style={styles.center}>Loading...</div>

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>Notifications</h2>
        {notifications.length > 0 && (
          <button onClick={markAllRead} style={styles.markBtn}>Mark all read</button>
        )}
      </div>

      {notifications.length === 0 ? (
        <p style={styles.empty}>No notifications yet</p>
      ) : (
        <div style={styles.list}>
          {notifications.map(n => (
            <div key={n._id} style={{ ...styles.item, background: n.isRead ? '#1a1d2e' : '#1e2240' }}>
              <div style={styles.dot(n.isRead)} />
              <p style={styles.msg}>{n.message}</p>
              <button onClick={() => deleteNotif(n._id)} style={styles.delBtn}>✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: '#0f1117', padding: '40px 20px', maxWidth: '700px', margin: '0 auto' },
  center: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f1117', color: '#94a3b8' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  title: { color: '#f1f5f9', fontSize: '24px', fontWeight: '700' },
  markBtn: { background: 'transparent', border: '1px solid #2d3148', color: '#94a3b8', borderRadius: '8px', padding: '8px 14px', fontSize: '13px' },
  empty: { color: '#94a3b8', textAlign: 'center', marginTop: '60px' },
  list: { display: 'flex', flexDirection: 'column', gap: '10px' },
  item: {
    display: 'flex', alignItems: 'center', gap: '12px',
    padding: '16px', borderRadius: '10px', border: '1px solid #2d3148',
  },
  dot: (isRead) => ({
    width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
    background: isRead ? '#2d3148' : '#6366f1',
  }),
  msg: { color: '#e2e8f0', fontSize: '14px', flex: 1 },
  delBtn: { background: 'transparent', border: 'none', color: '#475569', fontSize: '16px' },
}