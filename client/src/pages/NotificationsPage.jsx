import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import toast from 'react-hot-toast'

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icons = {
  Bell: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  CheckAll: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Trash: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14H6L5 6"/>
      <path d="M10 11v6M14 11v6"/>
      <path d="M9 6V4h6v2"/>
    </svg>
  ),
  ArrowLeft: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
    </svg>
  ),
  Card: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
    </svg>
  ),
  Comment: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  UserPlus: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <line x1="19" y1="8" x2="19" y2="14"/>
      <line x1="22" y1="11" x2="16" y2="11"/>
    </svg>
  ),
  Move: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/>
      <polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
    </svg>
  ),
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
const Logo = () => (
  <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="8" fill="url(#npLogoGrad)"/>
    <path d="M8 14h12M14 8v12" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="14" cy="14" r="3" fill="white" fillOpacity="0.25"/>
    <defs>
      <linearGradient id="npLogoGrad" x1="0" y1="0" x2="28" y2="28">
        <stop stopColor="#6366f1"/><stop offset="1" stopColor="#8b5cf6"/>
      </linearGradient>
    </defs>
  </svg>
)

// ─── Type config ──────────────────────────────────────────────────────────────
const typeConfig = {
  card_assigned: { icon: <Icons.Card />,    color: '#818cf8', bg: 'rgba(99,102,241,0.14)',  label: 'Assigned' },
  comment_added: { icon: <Icons.Comment />, color: '#4ade80', bg: 'rgba(34,197,94,0.12)',   label: 'Comment'  },
  member_added:  { icon: <Icons.UserPlus />,color: '#fbbf24', bg: 'rgba(245,158,11,0.12)',  label: 'Member'   },
  card_moved:    { icon: <Icons.Move />,    color: '#60a5fa', bg: 'rgba(59,130,246,0.12)',  label: 'Moved'    },
}

// ─── timeAgo helper ───────────────────────────────────────────────────────────
function timeAgo(date) {
  const s = Math.floor((Date.now() - new Date(date)) / 1000)
  if (s < 60) return 'just now'
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // 'all' | 'unread'

  useEffect(() => {
    api.get('/notifications')
      .then(res => setNotifications(res.data))
      .catch(() => toast.error('Failed to load notifications'))
      .finally(() => setLoading(false))
  }, [])

  const markAllRead = async () => {
    await api.put('/notifications/read-all')
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
    toast.success('All marked as read')
  }

  const deleteNotif = async (id) => {
    await api.delete(`/notifications/${id}`)
    setNotifications(prev => prev.filter(n => n._id !== id))
  }

  const unreadCount = notifications.filter(n => !n.isRead).length
  const displayed = filter === 'unread'
    ? notifications.filter(n => !n.isRead)
    : notifications

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #080b14; }

        /* ── Page shell ── */
        .np-page {
          min-height: 100vh;
          background: #080b14;
          font-family: 'DM Sans', sans-serif;
          color: #e2e8f0;
          position: relative;
          overflow-x: hidden;
        }

        .np-glow1 {
          position: fixed; top: -180px; right: -120px;
          width: 560px; height: 560px;
          background: radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 65%);
          pointer-events: none; z-index: 0;
        }
        .np-glow2 {
          position: fixed; bottom: -200px; left: -100px;
          width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 65%);
          pointer-events: none; z-index: 0;
        }

        /* ── Inner ── */
        .np-inner {
          position: relative; z-index: 1;
          max-width: 740px;
          margin: 0 auto;
          padding: 0 20px 80px;
        }

        /* ── Header ── */
        .np-header {
          padding: 36px 0 28px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          margin-bottom: 28px;
        }

        .np-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .np-back {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #8892b4;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          padding: 6px 12px 6px 9px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.18s;
        }
        .np-back:hover {
          color: #e2e8f0;
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.14);
        }

        .np-logo-row {
          display: flex;
          align-items: center;
          gap: 9px;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
        }

        .np-title-block { margin-bottom: 20px; }

        .np-title {
          font-family: 'Syne', sans-serif;
          font-size: 26px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.5px;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 5px;
        }

        .np-unread-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 24px;
          height: 22px;
          background: #6366f1;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          border-radius: 100px;
          padding: 0 7px;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0;
        }

        .np-sub {
          font-size: 13.5px;
          color: #8892b4;
        }

        /* ── Controls row ── */
        .np-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }

        .np-filters {
          display: flex;
          gap: 4px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 9px;
          padding: 3px;
        }

        .np-filter-btn {
          background: transparent;
          border: none;
          color: #8892b4;
          font-size: 12.5px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          padding: 6px 14px;
          border-radius: 7px;
          cursor: pointer;
          transition: all 0.18s;
          white-space: nowrap;
        }

        .np-filter-btn.active {
          background: #0d1020;
          color: #e2e8f0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        .np-mark-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: #94a3c4;
          border-radius: 8px;
          padding: 8px 15px;
          font-size: 12.5px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.18s;
          white-space: nowrap;
        }

        .np-mark-btn:hover {
          border-color: rgba(99,102,241,0.4);
          color: #a5b4fc;
          background: rgba(99,102,241,0.07);
        }

        /* ── List ── */
        .np-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        /* ── Notification item ── */
        .np-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 18px;
          background: #0d1020;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 13px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.18s, transform 0.15s;
          animation: np-in 0.3s ease both;
        }

        @keyframes np-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .np-item.unread {
          background: #0f1228;
        }

        .np-item:hover {
          border-color: rgba(255,255,255,0.13);
          transform: translateY(-1px);
        }

        .np-item-accent {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          border-radius: 3px 0 0 3px;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .np-item.unread .np-item-accent { opacity: 1; }

        /* ── Type icon ── */
        .np-type-icon {
          width: 38px; height: 38px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        /* ── Body ── */
        .np-body { flex: 1; min-width: 0; }

        .np-msg {
          font-size: 13.5px;
          font-weight: 500;
          color: #e2e8f0;
          line-height: 1.45;
          margin-bottom: 7px;
        }

        .np-item:not(.unread) .np-msg { color: #94a3c4; }

        .np-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .np-type-pill {
          font-size: 10.5px;
          font-weight: 700;
          border-radius: 6px;
          padding: 2px 8px;
          letter-spacing: 0.3px;
        }

        .np-time {
          font-size: 11.5px;
          color: #4a5580;
          font-weight: 500;
        }

        .np-unread-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #6366f1;
          flex-shrink: 0;
          animation: np-pulse 2.2s ease-in-out infinite;
        }

        @keyframes np-pulse {
          0%, 100% { opacity: 1; } 50% { opacity: 0.3; }
        }

        /* ── Sender avatar ── */
        .np-sender {
          width: 30px; height: 30px;
          border-radius: 9px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 11px; font-weight: 700; color: #fff;
          flex-shrink: 0;
        }

        /* ── Delete btn ── */
        .np-del {
          width: 30px; height: 30px;
          display: flex; align-items: center; justify-content: center;
          background: transparent;
          border: 1px solid transparent;
          color: #2d3555;
          border-radius: 8px;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.18s;
        }

        .np-del:hover {
          color: #f87171;
          background: rgba(239,68,68,0.1);
          border-color: rgba(239,68,68,0.25);
        }

        /* ── Skeleton ── */
        .np-skeletons { display: flex; flex-direction: column; gap: 8px; }

        .np-sk-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 18px;
          background: #0d1020;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 13px;
        }

        .sk {
          background: linear-gradient(90deg, #141829 25%, #1c2035 50%, #141829 75%);
          background-size: 200% 100%;
          animation: shimmer 1.6s infinite;
          border-radius: 6px;
        }

        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ── Empty ── */
        .np-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 20px;
          text-align: center;
        }

        .np-empty-icon {
          width: 72px; height: 72px;
          border-radius: 20px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.2);
          display: flex; align-items: center; justify-content: center;
          color: #818cf8;
          margin-bottom: 22px;
        }

        .np-empty-title {
          font-family: 'Syne', sans-serif;
          font-size: 19px;
          font-weight: 700;
          color: #e2e8f0;
          margin-bottom: 8px;
        }

        .np-empty-sub {
          font-size: 13.5px;
          color: #8892b4;
          line-height: 1.65;
          max-width: 300px;
        }

        /* ── Responsive ── */
        @media (max-width: 560px) {
          .np-title { font-size: 22px; }
          .np-item { padding: 13px 14px; gap: 11px; }
          .np-controls { flex-direction: column; align-items: stretch; }
          .np-mark-btn { justify-content: center; }
          .np-sender { display: none; }
        }
      `}</style>

      <div className="np-page">
        <div className="np-glow1" /><div className="np-glow2" />

        <div className="np-inner">
          {/* ── Header ── */}
          <div className="np-header">
            <div className="np-top-row">
              <div className="np-logo-row">
                <Logo /> ProjectSync
              </div>
              <Link to="/dashboard" className="np-back">
                <Icons.ArrowLeft /> Dashboard
              </Link>
            </div>

            <div className="np-title-block">
              <div className="np-title">
                Notifications
                {unreadCount > 0 && (
                  <span className="np-unread-pill">{unreadCount}</span>
                )}
              </div>
              <div className="np-sub">
                {unreadCount > 0
                  ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`
                  : 'You\'re all caught up'}
              </div>
            </div>

            <div className="np-controls">
              <div className="np-filters">
                <button
                  className={`np-filter-btn${filter === 'all' ? ' active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All ({notifications.length})
                </button>
                <button
                  className={`np-filter-btn${filter === 'unread' ? ' active' : ''}`}
                  onClick={() => setFilter('unread')}
                >
                  Unread ({unreadCount})
                </button>
              </div>

              {notifications.length > 0 && (
                <button className="np-mark-btn" onClick={markAllRead}>
                  <Icons.CheckAll />
                  Mark all read
                </button>
              )}
            </div>
          </div>

          {/* ── Content ── */}
          {loading ? (
            <div className="np-skeletons">
              {[...Array(4)].map((_, i) => (
                <div className="np-sk-item" key={i}>
                  <div className="sk" style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div className="sk" style={{ height: 13, width: '65%', marginBottom: 8 }} />
                    <div className="sk" style={{ height: 10, width: '40%' }} />
                  </div>
                  <div className="sk" style={{ width: 30, height: 30, borderRadius: 9, flexShrink: 0 }} />
                </div>
              ))}
            </div>

          ) : displayed.length === 0 ? (
            <div className="np-empty">
              <div className="np-empty-icon">
                <Icons.Bell />
              </div>
              <div className="np-empty-title">
                {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
              </div>
              <div className="np-empty-sub">
                {filter === 'unread'
                  ? 'Switch to "All" to see your notification history.'
                  : 'Activity from your projects and team will appear here.'}
              </div>
            </div>

          ) : (
            <div className="np-list">
              {displayed.map((n, idx) => {
                const cfg = typeConfig[n.type] || typeConfig.card_assigned
                return (
                  <div
                    key={n._id}
                    className={`np-item${n.isRead ? '' : ' unread'}`}
                    style={{ animationDelay: `${idx * 0.04}s` }}
                  >
                    {/* Left accent bar */}
                    <div
                      className="np-item-accent"
                      style={{ background: cfg.color }}
                    />

                    {/* Type icon */}
                    <div
                      className="np-type-icon"
                      style={{ background: cfg.bg, color: cfg.color }}
                    >
                      {cfg.icon}
                    </div>

                    {/* Body */}
                    <div className="np-body">
                      <div className="np-msg">{n.message}</div>
                      <div className="np-meta">
                        <span
                          className="np-type-pill"
                          style={{ background: cfg.bg, color: cfg.color }}
                        >
                          {cfg.label}
                        </span>
                        <span className="np-time">{timeAgo(n.createdAt)}</span>
                        {!n.isRead && <span className="np-unread-dot" />}
                      </div>
                    </div>

                    {/* Sender avatar */}
                    {n.sender && (
                      <div className="np-sender" title={n.sender.name}>
                        {n.sender.name?.charAt(0).toUpperCase()}
                      </div>
                    )}

                    {/* Delete */}
                    <button
                      className="np-del"
                      onClick={() => deleteNotif(n._id)}
                      title="Dismiss"
                    >
                      <Icons.Trash />
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}