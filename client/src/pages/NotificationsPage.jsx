import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import api from '../services/api'
import useAuth from '../hooks/useAuth'
import toast from 'react-hot-toast'

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icons = {
  Dashboard: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5"/>
      <rect x="14" y="3" width="7" height="7" rx="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5"/>
      <rect x="14" y="14" width="7" height="7" rx="1.5"/>
    </svg>
  ),
  Bell: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  User: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Settings: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  LogOut: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  Menu: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
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
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
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

function timeAgo(date) {
  const s = Math.floor((Date.now() - new Date(date)) / 1000)
  if (s < 60) return 'just now'
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export default function NotificationsPage() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    api.get('/notifications')
      .then(res => setNotifications(res.data))
      .catch(() => toast.error('Failed to load notifications'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { setSidebarOpen(false) }, [location.pathname])

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
  const displayed = filter === 'unread' ? notifications.filter(n => !n.isRead) : notifications

  const navLinks = [
    { to: '/dashboard', icon: <Icons.Dashboard />, label: 'Dashboard' },
    { to: '/notifications', icon: <Icons.Bell />, label: 'Notifications' },
    { to: '/profile', icon: <Icons.User />, label: 'Profile' },
    { to: '/settings', icon: <Icons.Settings />, label: 'Settings' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #080b14; color: #e2e8f0; }

        .np-page { display: flex; min-height: 100vh; background: #080b14; font-family: 'DM Sans', sans-serif; }

        /* ── Sidebar overlay (mobile) ── */
        .np-overlay {
          display: none; position: fixed; inset: 0;
          background: rgba(0,0,0,0.65); z-index: 98; backdrop-filter: blur(4px);
        }
        .np-overlay.open { display: block; }

        /* ── Sidebar ── */
        .np-sidebar {
          width: 248px; background: #0d1020;
          border-right: 1px solid rgba(255,255,255,0.08);
          display: flex; flex-direction: column;
          position: fixed; top: 0; left: 0; height: 100vh;
          z-index: 100; transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
          overflow-y: auto; overflow-x: hidden;
        }
        .np-sidebar-brand {
          display: flex; align-items: center; gap: 10px;
          padding: 24px 20px; border-bottom: 1px solid rgba(255,255,255,0.08); flex-shrink: 0;
        }
        .np-brand-text { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 700; color: #ffffff; letter-spacing: -0.3px; }
        .np-brand-badge {
          font-size: 9px; font-weight: 600; letter-spacing: 0.8px; color: #a5b4fc;
          background: rgba(99,102,241,0.18); border: 1px solid rgba(99,102,241,0.35);
          border-radius: 4px; padding: 2px 5px; text-transform: uppercase;
        }
        .np-section-label {
          font-size: 10px; font-weight: 600; letter-spacing: 1.2px;
          text-transform: uppercase; color: #8892b4; padding: 20px 20px 8px;
        }
        .np-nav { display: flex; flex-direction: column; gap: 2px; padding: 0 10px; }
        .np-nav-item {
          display: flex; align-items: center; gap: 10px; padding: 10px 12px;
          border-radius: 9px; color: #94a3c4; font-size: 13.5px; font-weight: 500;
          text-decoration: none; transition: all 0.18s ease; position: relative;
        }
        .np-nav-item:hover { color: #e2e8f0; background: rgba(255,255,255,0.07); }
        .np-nav-item.active { color: #ffffff; background: rgba(99,102,241,0.16); }
        .np-nav-item.active::before {
          content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%);
          width: 3px; height: 18px; background: #6366f1; border-radius: 0 3px 3px 0;
        }
        .np-sidebar-bottom {
          margin-top: auto; padding: 16px 12px;
          border-top: 1px solid rgba(255,255,255,0.08); flex-shrink: 0;
        }
        .np-user-card {
          display: flex; align-items: center; gap: 10px; padding: 10px;
          border-radius: 10px; background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09); margin-bottom: 8px;
        }
        .np-user-avatar {
          width: 34px; height: 34px; border-radius: 10px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; color: #fff; flex-shrink: 0;
        }
        .np-user-info { overflow: hidden; flex: 1; min-width: 0; }
        .np-user-name { font-size: 13px; font-weight: 600; color: #f1f5f9; line-height: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .np-user-email { font-size: 11px; color: #8892b4; margin-top: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .np-logout-btn {
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 7px;
          background: transparent; border: 1px solid rgba(255,255,255,0.1);
          color: #94a3c4; border-radius: 8px; padding: 8px 12px;
          font-size: 13px; font-weight: 500; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.18s;
        }
        .np-logout-btn:hover { border-color: rgba(239,68,68,0.4); color: #fca5a5; background: rgba(239,68,68,0.08); }

        /* ── Mobile top bar ── */
        .np-mobile-topbar {
          display: none; align-items: center; justify-content: space-between;
          padding: 0 16px; height: 56px; background: #0d1020;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          position: sticky; top: 0; z-index: 90; flex-shrink: 0;
        }
        .np-mobile-brand {
          display: flex; align-items: center; gap: 8px;
          font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; color: #ffffff;
        }
        .np-hamburger {
          width: 38px; height: 38px; display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 9px; cursor: pointer; color: #e2e8f0; transition: background 0.18s;
        }
        .np-hamburger:hover { background: rgba(255,255,255,0.09); }

        /* ── Main ── */
        .np-main { margin-left: 248px; flex: 1; display: flex; flex-direction: column; min-height: 100vh; min-width: 0; }

        /* ── Desktop topbar ── */
        .np-topbar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 40px; border-bottom: 1px solid rgba(255,255,255,0.08);
          background: rgba(8,11,20,0.9); backdrop-filter: blur(12px);
          position: sticky; top: 0; z-index: 50; flex-shrink: 0;
        }
        .np-topbar-left { display: flex; flex-direction: column; min-width: 0; }
        .np-page-title { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.4px; line-height: 1; display: flex; align-items: center; gap: 12px; }
        .np-page-sub { font-size: 12.5px; color: #8892b4; margin-top: 5px; }
        .np-unread-pill {
          display: inline-flex; align-items: center; justify-content: center;
          min-width: 24px; height: 22px; background: #6366f1; color: #fff;
          font-size: 11px; font-weight: 700; border-radius: 100px; padding: 0 7px;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Content ── */
        .np-content { padding: 32px 40px; flex: 1; max-width: 800px; }

        /* ── Controls ── */
        .np-controls {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; flex-wrap: wrap; margin-bottom: 24px;
        }
        .np-filters {
          display: flex; gap: 4px; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08); border-radius: 9px; padding: 3px;
        }
        .np-filter-btn {
          background: transparent; border: none; color: #8892b4;
          font-size: 12.5px; font-weight: 500; font-family: 'DM Sans', sans-serif;
          padding: 6px 14px; border-radius: 7px; cursor: pointer; transition: all 0.18s; white-space: nowrap;
        }
        .np-filter-btn.active { background: #0d1020; color: #e2e8f0; box-shadow: 0 2px 8px rgba(0,0,0,0.3); }
        .np-mark-btn {
          display: flex; align-items: center; gap: 7px; background: transparent;
          border: 1px solid rgba(255,255,255,0.1); color: #94a3c4;
          border-radius: 8px; padding: 8px 15px; font-size: 12.5px; font-weight: 500;
          font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.18s; white-space: nowrap;
        }
        .np-mark-btn:hover { border-color: rgba(99,102,241,0.4); color: #a5b4fc; background: rgba(99,102,241,0.07); }

        /* ── List ── */
        .np-list { display: flex; flex-direction: column; gap: 8px; }
        .np-item {
          display: flex; align-items: center; gap: 14px; padding: 16px 18px;
          background: #0d1020; border: 1px solid rgba(255,255,255,0.08);
          border-radius: 13px; position: relative; overflow: hidden;
          transition: border-color 0.18s, transform 0.15s;
          animation: np-in 0.3s ease both;
        }
        @keyframes np-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .np-item.unread { background: #0f1228; }
        .np-item:hover { border-color: rgba(255,255,255,0.13); transform: translateY(-1px); }
        .np-item-accent {
          position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
          border-radius: 3px 0 0 3px; opacity: 0; transition: opacity 0.2s;
        }
        .np-item.unread .np-item-accent { opacity: 1; }
        .np-type-icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .np-body { flex: 1; min-width: 0; }
        .np-msg { font-size: 13.5px; font-weight: 500; color: #e2e8f0; line-height: 1.45; margin-bottom: 7px; }
        .np-item:not(.unread) .np-msg { color: #94a3c4; }
        .np-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .np-type-pill { font-size: 10.5px; font-weight: 700; border-radius: 6px; padding: 2px 8px; letter-spacing: 0.3px; }
        .np-time { font-size: 11.5px; color: #4a5580; font-weight: 500; }
        .np-unread-dot { width: 6px; height: 6px; border-radius: 50%; background: #6366f1; flex-shrink: 0; animation: np-pulse 2.2s ease-in-out infinite; }
        @keyframes np-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .np-sender {
          width: 30px; height: 30px; border-radius: 9px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700; color: #fff; flex-shrink: 0;
        }
        .np-del {
          width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;
          background: transparent; border: 1px solid transparent; color: #2d3555;
          border-radius: 8px; cursor: pointer; flex-shrink: 0; transition: all 0.18s;
        }
        .np-del:hover { color: #f87171; background: rgba(239,68,68,0.1); border-color: rgba(239,68,68,0.25); }

        /* ── Skeletons ── */
        .np-sk-item {
          display: flex; align-items: center; gap: 14px; padding: 16px 18px;
          background: #0d1020; border: 1px solid rgba(255,255,255,0.07); border-radius: 13px;
          margin-bottom: 8px;
        }
        .sk {
          background: linear-gradient(90deg, #141829 25%, #1c2035 50%, #141829 75%);
          background-size: 200% 100%; animation: shimmer 1.6s infinite; border-radius: 6px;
        }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

        /* ── Empty ── */
        .np-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 20px; text-align: center; }
        .np-empty-icon {
          width: 72px; height: 72px; border-radius: 20px; background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.2); display: flex; align-items: center; justify-content: center;
          color: #818cf8; margin-bottom: 22px;
        }
        .np-empty-title { font-family: 'Syne', sans-serif; font-size: 19px; font-weight: 700; color: #e2e8f0; margin-bottom: 8px; }
        .np-empty-sub { font-size: 13.5px; color: #8892b4; line-height: 1.65; max-width: 300px; }

        /* ── Bottom nav (mobile only) ── */
        .np-bottom-nav {
          display: none; position: fixed; bottom: 0; left: 0; right: 0;
          height: 62px; background: #0d1020; border-top: 1px solid rgba(255,255,255,0.08);
          z-index: 95; align-items: center; justify-content: space-around; padding: 0 4px;
        }
        .np-bottom-nav-item {
          display: flex; flex-direction: column; align-items: center; gap: 3px;
          padding: 6px 12px; border-radius: 8px; color: #4a5580;
          font-size: 10px; font-weight: 600; text-decoration: none; transition: color 0.18s; letter-spacing: 0.3px;
        }
        .np-bottom-nav-item.active { color: #818cf8; }
        .np-bottom-nav-item:hover { color: #c8d3e8; }

        /* ── Tablet (640–1023px): icon-only sidebar ── */
        @media (max-width: 1023px) and (min-width: 640px) {
          .np-sidebar { width: 64px; }
          .np-brand-text, .np-brand-badge, .np-section-label, .np-nav-item-label,
          .np-user-info, .np-logout-btn-text { display: none; }
          .np-sidebar-brand { justify-content: center; padding: 20px 0; }
          .np-nav { padding: 0 8px; }
          .np-nav-item { justify-content: center; padding: 12px; gap: 0; }
          .np-nav-item.active::before { display: none; }
          .np-user-card { justify-content: center; padding: 10px; gap: 0; }
          .np-logout-btn { padding: 10px; justify-content: center; }
          .np-sidebar-bottom { padding: 12px 8px; }
          .np-main { margin-left: 64px; }
          .np-content { padding: 24px; }
          .np-topbar { padding: 16px 24px; }
        }

        /* ── Mobile (< 640px): slide-in sidebar ── */
        @media (max-width: 639px) {
          .np-sidebar { transform: translateX(-100%); width: 260px; box-shadow: 4px 0 40px rgba(0,0,0,0.7); }
          .np-sidebar.mobile-open { transform: translateX(0); }
          .np-mobile-topbar { display: flex !important; }
          .np-topbar { display: none !important; }
          .np-main { margin-left: 0; padding-bottom: 66px; }
          .np-content { padding: 16px; }
          .np-bottom-nav { display: flex !important; }
          .np-controls { flex-direction: column; align-items: stretch; }
          .np-mark-btn { justify-content: center; }
          .np-item { padding: 13px 14px; gap: 11px; }
          .np-sender { display: none; }
        }

        /* ── Small desktop (1024–1280px) ── */
        @media (max-width: 1280px) and (min-width: 1024px) {
          .np-content { padding: 28px 32px; }
          .np-topbar { padding: 18px 32px; }
        }
      `}</style>

      {/* Mobile sidebar backdrop */}
      <div className={`np-overlay${sidebarOpen ? ' open' : ''}`} onClick={() => setSidebarOpen(false)} />

      <div className="np-page">

        {/* ══ SIDEBAR ══ */}
        <aside className={`np-sidebar${sidebarOpen ? ' mobile-open' : ''}`}>
          <div className="np-sidebar-brand">
            <Logo />
            <span className="np-brand-text">ProjectSync</span>
            <span className="np-brand-badge">Beta</span>
          </div>

          <div className="np-section-label">Navigation</div>
          <nav className="np-nav">
            {navLinks.map(({ to, icon, label }) => (
              <Link
                key={to}
                to={to}
                className={`np-nav-item${location.pathname === to ? ' active' : ''}`}
              >
                {icon}
                <span className="np-nav-item-label">{label}</span>
              </Link>
            ))}
          </nav>

          <div className="np-sidebar-bottom">
            <div className="np-user-card">
              <div className="np-user-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
              <div className="np-user-info">
                <div className="np-user-name">{user?.name}</div>
                <div className="np-user-email">{user?.email}</div>
              </div>
            </div>
            <button onClick={logout} className="np-logout-btn">
              <Icons.LogOut />
              <span className="np-logout-btn-text">Sign out</span>
            </button>
          </div>
        </aside>

        {/* ══ MAIN ══ */}
        <main className="np-main">

          {/* Mobile Top Bar */}
          <div className="np-mobile-topbar">
            <div className="np-mobile-brand"><Logo /> ProjectSync</div>
            <button className="np-hamburger" onClick={() => setSidebarOpen(true)}><Icons.Menu /></button>
          </div>

          {/* Desktop Top Bar */}
          <div className="np-topbar">
            <div className="np-topbar-left">
              <div className="np-page-title">
                Notifications
                {unreadCount > 0 && <span className="np-unread-pill">{unreadCount}</span>}
              </div>
              <div className="np-page-sub">
                {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : "You're all caught up"}
              </div>
            </div>
            {notifications.length > 0 && (
              <button className="np-mark-btn" onClick={markAllRead}>
                <Icons.CheckAll /> Mark all read
              </button>
            )}
          </div>

          {/* Content */}
          <div className="np-content">
            {/* Filter controls */}
            <div className="np-controls">
              <div className="np-filters">
                <button className={`np-filter-btn${filter === 'all' ? ' active' : ''}`} onClick={() => setFilter('all')}>
                  All ({notifications.length})
                </button>
                <button className={`np-filter-btn${filter === 'unread' ? ' active' : ''}`} onClick={() => setFilter('unread')}>
                  Unread ({unreadCount})
                </button>
              </div>
            </div>

            {/* Notification list */}
            {loading ? (
              <div>
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
                <div className="np-empty-icon"><Icons.Bell /></div>
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
                      <div className="np-item-accent" style={{ background: cfg.color }} />
                      <div className="np-type-icon" style={{ background: cfg.bg, color: cfg.color }}>{cfg.icon}</div>
                      <div className="np-body">
                        <div className="np-msg">{n.message}</div>
                        <div className="np-meta">
                          <span className="np-type-pill" style={{ background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                          <span className="np-time">{timeAgo(n.createdAt)}</span>
                          {!n.isRead && <span className="np-unread-dot" />}
                        </div>
                      </div>
                      {n.sender && (
                        <div className="np-sender" title={n.sender.name}>
                          {n.sender.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <button className="np-del" onClick={() => deleteNotif(n._id)} title="Dismiss">
                        <Icons.Trash />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </main>

        {/* ══ BOTTOM NAV (mobile) ══ */}
        <nav className="np-bottom-nav">
          {navLinks.map(({ to, icon, label }) => (
            <Link key={to} to={to} className={`np-bottom-nav-item${location.pathname === to ? ' active' : ''}`}>
              {icon}
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}