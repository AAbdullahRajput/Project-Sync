import { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import api from '../services/api'
import useAuth from '../hooks/useAuth'
import toast from 'react-hot-toast'

// ─── SVG Icon Components ──────────────────────────────────────────────────────
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
  LogOut: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Folder: () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  Users: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  Layers: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  Settings: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  Star: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  Activity: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  X: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Search: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  Menu: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  Close: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
}

// ─── Logo Component ───────────────────────────────────────────────────────────
const Logo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="8" fill="url(#logoGrad)"/>
    <path d="M8 14h12M14 8v12" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="14" cy="14" r="3" fill="white" fillOpacity="0.25"/>
    <defs>
      <linearGradient id="logoGrad" x1="0" y1="0" x2="28" y2="28">
        <stop stopColor="#6366f1"/>
        <stop offset="1" stopColor="#8b5cf6"/>
      </linearGradient>
    </defs>
  </svg>
)

// ─── Empty State Illustration ─────────────────────────────────────────────────
const EmptyIllustration = () => (
  <svg width="180" height="140" viewBox="0 0 180 140" fill="none">
    <rect x="20" y="30" width="140" height="90" rx="10" fill="#1e2235" stroke="#2d3148" strokeWidth="1.5"/>
    <rect x="32" y="44" width="50" height="6" rx="3" fill="#2d3148"/>
    <rect x="32" y="56" width="80" height="4" rx="2" fill="#2d3148" opacity="0.6"/>
    <rect x="32" y="66" width="60" height="4" rx="2" fill="#2d3148" opacity="0.4"/>
    <rect x="32" y="80" width="116" height="26" rx="6" fill="#2d3148" opacity="0.5"/>
    <rect x="40" y="88" width="30" height="4" rx="2" fill="#3d4268"/>
    <rect x="78" y="88" width="50" height="4" rx="2" fill="#3d4268"/>
    <circle cx="140" cy="36" r="18" fill="#6366f1" opacity="0.15" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="4 3"/>
    <path d="M133 36h14M140 29v14" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="40" cy="110" r="6" fill="#22c55e" opacity="0.2"/>
    <circle cx="40" cy="110" r="3" fill="#22c55e" opacity="0.5"/>
  </svg>
)

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: '', description: '', color: '#6366f1' })
  const [creating, setCreating] = useState(false)
  const [search, setSearch] = useState('')
  const [hoveredCard, setHoveredCard] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    api.get('/projects')
      .then(res => setProjects(res.data))
      .catch(() => toast.error('Failed to load projects'))
      .finally(() => setLoading(false))
  }, [])

  // Close sidebar when route changes (mobile)
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  const handleCreate = async (e) => {
    e.preventDefault()
    setCreating(true)
    try {
      const res = await api.post('/projects', form)
      setProjects([...projects, res.data])
      setShowModal(false)
      setForm({ name: '', description: '', color: '#6366f1' })
      toast.success('Project created!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create project')
    } finally {
      setCreating(false)
    }
  }

  const filtered = projects.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.description || '').toLowerCase().includes(search.toLowerCase())
  )

  const colors = [
    { hex: '#6366f1', name: 'Indigo' },
    { hex: '#ec4899', name: 'Pink' },
    { hex: '#f59e0b', name: 'Amber' },
    { hex: '#22c55e', name: 'Green' },
    { hex: '#3b82f6', name: 'Blue' },
    { hex: '#ef4444', name: 'Red' },
    { hex: '#8b5cf6', name: 'Violet' },
    { hex: '#06b6d4', name: 'Cyan' },
  ]

  const navLinks = [
    { to: '/dashboard', icon: <Icons.Dashboard />, label: 'Dashboard' },
    { to: '/notifications', icon: <Icons.Bell />, label: 'Notifications' },
    { to: '/profile', icon: <Icons.User />, label: 'Profile' },
    { to: '/settings', icon: <Icons.Settings />, label: 'Settings' },
  ]

  const totalMembers = projects.reduce((sum, p) => sum + (p.members?.length || 0), 0)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #080b14; color: #e2e8f0; }

        /* ══════════════════════════════════════
           PAGE LAYOUT
        ══════════════════════════════════════ */
        .dash-page {
          display: flex;
          min-height: 100vh;
          background: #080b14;
          font-family: 'DM Sans', sans-serif;
        }

        /* ══════════════════════════════════════
           SIDEBAR OVERLAY (mobile backdrop)
        ══════════════════════════════════════ */
        .sidebar-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.65);
          z-index: 98;
          backdrop-filter: blur(4px);
        }
        .sidebar-overlay.open { display: block; }

        /* ══════════════════════════════════════
           SIDEBAR
        ══════════════════════════════════════ */
        .sidebar {
          width: 248px;
          background: #0d1020;
          border-right: 1px solid rgba(255,255,255,0.08);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0; left: 0;
          height: 100vh;
          z-index: 100;
          transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
          overflow-y: auto;
          overflow-x: hidden;
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 24px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          flex-shrink: 0;
        }

        .sidebar-brand-text {
          font-family: 'Syne', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.3px;
        }

        .sidebar-brand-badge {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.8px;
          color: #a5b4fc;
          background: rgba(99,102,241,0.18);
          border: 1px solid rgba(99,102,241,0.35);
          border-radius: 4px;
          padding: 2px 5px;
          text-transform: uppercase;
        }

        .sidebar-section-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: #8892b4;
          padding: 20px 20px 8px;
        }

        .nav { display: flex; flex-direction: column; gap: 2px; padding: 0 10px; }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 9px;
          color: #94a3c4;
          font-size: 13.5px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.18s ease;
          position: relative;
        }

        .nav-item:hover {
          color: #e2e8f0;
          background: rgba(255,255,255,0.07);
        }

        .nav-item.active {
          color: #ffffff;
          background: rgba(99,102,241,0.16);
        }

        .nav-item.active::before {
          content: '';
          position: absolute;
          left: 0; top: 50%;
          transform: translateY(-50%);
          width: 3px; height: 18px;
          background: #6366f1;
          border-radius: 0 3px 3px 0;
        }

        .sidebar-bottom {
          margin-top: auto;
          padding: 16px 12px;
          border-top: 1px solid rgba(255,255,255,0.08);
          flex-shrink: 0;
        }

        .user-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          border-radius: 10px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          margin-bottom: 8px;
        }

        .user-avatar {
          width: 34px; height: 34px;
          border-radius: 10px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 14px; font-weight: 700; color: #fff;
          flex-shrink: 0;
        }

        .user-info { overflow: hidden; flex: 1; min-width: 0; }

        .user-name {
          font-size: 13px; font-weight: 600; color: #f1f5f9;
          line-height: 1;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .user-email {
          font-size: 11px; color: #8892b4;
          margin-top: 3px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: #94a3c4;
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 13px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.18s;
        }

        .logout-btn:hover {
          border-color: rgba(239,68,68,0.4);
          color: #fca5a5;
          background: rgba(239,68,68,0.08);
        }

        /* ══════════════════════════════════════
           MOBILE TOP BAR
        ══════════════════════════════════════ */
        .mobile-topbar {
          display: none;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          height: 56px;
          background: #0d1020;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          position: sticky;
          top: 0;
          z-index: 90;
          flex-shrink: 0;
        }

        .mobile-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Syne', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #ffffff;
        }

        .hamburger-btn {
          width: 38px; height: 38px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 9px;
          cursor: pointer;
          color: #e2e8f0;
          transition: background 0.18s;
          flex-shrink: 0;
        }

        .hamburger-btn:hover { background: rgba(255,255,255,0.09); }

        /* ══════════════════════════════════════
           MAIN CONTENT
        ══════════════════════════════════════ */
        .main {
          margin-left: 248px;
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          min-width: 0;
        }

        /* ── Desktop Top Bar ── */
        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 40px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          background: rgba(8,11,20,0.9);
          backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 50;
          gap: 16px;
          flex-shrink: 0;
        }

        .topbar-left { display: flex; flex-direction: column; min-width: 0; }

        .page-title {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.4px;
          line-height: 1;
        }

        .page-sub {
          font-size: 12.5px;
          color: #8892b4;
          margin-top: 5px;
          font-weight: 400;
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 9px;
          padding: 8px 14px;
          transition: border-color 0.18s, background 0.18s;
          color: #8892b4;
        }

        .search-box:focus-within {
          border-color: rgba(99,102,241,0.5);
          background: rgba(99,102,241,0.06);
          color: #a5b4fc;
        }

        .search-input {
          background: transparent;
          border: none;
          outline: none;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          color: #e2e8f0;
          width: 180px;
        }

        .search-input::placeholder { color: #4a5580; }

        .create-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          background: linear-gradient(135deg, #6366f1, #7c3aed);
          color: #ffffff;
          border: none;
          border-radius: 9px;
          padding: 9px 18px;
          font-size: 13.5px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: opacity 0.18s, transform 0.15s;
          box-shadow: 0 4px 18px rgba(99,102,241,0.38);
          white-space: nowrap;
        }

        .create-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .create-btn:active { transform: translateY(0); }

        /* ══════════════════════════════════════
           CONTENT AREA
        ══════════════════════════════════════ */
        .content { padding: 32px 40px; flex: 1; }

        /* ── Stats Row ── */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: #0d1020;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .stat-icon {
          width: 42px; height: 42px;
          border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .stat-label {
          font-size: 11.5px;
          font-weight: 500;
          color: #8892b4;
          letter-spacing: 0.3px;
          margin-bottom: 4px;
        }

        .stat-value {
          font-family: 'Syne', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1;
        }

        /* ── Section Header ── */
        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #e2e8f0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .section-count {
          font-size: 11px;
          font-weight: 600;
          color: #a5b4fc;
          background: rgba(99,102,241,0.18);
          border-radius: 20px;
          padding: 2px 8px;
        }

        /* ── Project Grid ── */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 18px;
        }

        /* ── Project Card ── */
        .project-card {
          background: #0d1020;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
          position: relative;
        }

        .project-card:hover {
          transform: translateY(-3px);
          border-color: rgba(255,255,255,0.14);
          box-shadow: 0 16px 40px rgba(0,0,0,0.5);
        }

        .card-accent { height: 5px; width: 100%; }

        .card-glow {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 80px;
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }

        .project-card:hover .card-glow { opacity: 1; }

        .card-body { padding: 20px; }

        .card-top-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .card-icon {
          width: 38px; height: 38px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
        }

        .card-arrow {
          color: #4a5580;
          transition: color 0.18s, transform 0.18s;
        }

        .project-card:hover .card-arrow {
          color: #cbd5e1;
          transform: translateX(3px);
        }

        .project-name {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 6px;
          letter-spacing: -0.2px;
        }

        .project-desc {
          font-size: 12.5px;
          color: #94a3c4;
          line-height: 1.6;
          margin-bottom: 18px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 14px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }

        .members-stack { display: flex; align-items: center; }

        .member-avatar {
          width: 26px; height: 26px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 10px; font-weight: 700; color: #fff;
          border: 2px solid #0d1020;
        }

        .member-count-pill {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11.5px;
          color: #94a3c4;
          font-weight: 500;
        }

        .card-tag {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 10.5px;
          font-weight: 600;
          color: #8892b4;
          letter-spacing: 0.2px;
        }

        /* ── Skeleton ── */
        .skeleton {
          background: linear-gradient(90deg, #0d1020 25%, #141829 50%, #0d1020 75%);
          background-size: 200% 100%;
          animation: shimmer 1.6s infinite;
          border-radius: 8px;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .skeleton-card {
          background: #0d1020;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 20px;
          overflow: hidden;
        }

        /* ── Empty State ── */
        .empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 20px;
          text-align: center;
        }

        .empty-title {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #e2e8f0;
          margin: 20px 0 8px;
        }

        .empty-sub {
          font-size: 14px;
          color: #8892b4;
          margin-bottom: 28px;
          max-width: 300px;
          line-height: 1.6;
        }

        /* ══════════════════════════════════════
           MODAL
        ══════════════════════════════════════ */
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.15s ease;
          padding: 16px;
        }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .modal {
          background: #0d1020;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 32px;
          width: 100%;
          max-width: 460px;
          animation: slideUp 0.22s ease;
          box-shadow: 0 40px 80px rgba(0,0,0,0.7);
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 28px;
          gap: 12px;
        }

        .modal-title {
          font-family: 'Syne', sans-serif;
          font-size: 19px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.3px;
        }

        .modal-sub {
          font-size: 12.5px;
          color: #8892b4;
          margin-top: 4px;
        }

        .close-btn {
          width: 32px; height: 32px;
          border-radius: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #94a3c4;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.15s;
          flex-shrink: 0;
        }

        .close-btn:hover { color: #f1f5f9; background: rgba(255,255,255,0.1); }

        .form { display: flex; flex-direction: column; gap: 20px; }
        .field { display: flex; flex-direction: column; gap: 7px; }

        .label {
          font-size: 12px;
          font-weight: 600;
          color: #c8d3e8;
          letter-spacing: 0.4px;
        }

        .input, .textarea {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 11px 14px;
          color: #f1f5f9;
          font-size: 13.5px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.18s, background 0.18s;
          width: 100%;
        }

        .input:focus, .textarea:focus {
          border-color: rgba(99,102,241,0.55);
          background: rgba(99,102,241,0.06);
        }

        .input::placeholder, .textarea::placeholder { color: #4a5580; }

        .textarea { resize: vertical; min-height: 80px; }

        .color-grid { display: flex; gap: 8px; flex-wrap: wrap; }

        .color-option {
          width: 32px; height: 32px;
          border-radius: 9px;
          cursor: pointer;
          transition: transform 0.15s;
          position: relative;
          outline: none;
        }

        .color-option:hover { transform: scale(1.12); }

        .color-check {
          position: absolute;
          inset: 0;
          display: flex; align-items: center; justify-content: center;
        }

        .modal-footer {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
          margin-top: 4px;
        }

        .cancel-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: #94a3c4;
          border-radius: 9px;
          padding: 10px 20px;
          font-size: 13.5px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.15s;
        }

        .cancel-btn:hover {
          border-color: rgba(255,255,255,0.2);
          color: #e2e8f0;
        }

        .submit-btn {
          background: linear-gradient(135deg, #6366f1, #7c3aed);
          color: #ffffff;
          border: none;
          border-radius: 9px;
          padding: 10px 24px;
          font-size: 13.5px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: opacity 0.15s;
          box-shadow: 0 4px 18px rgba(99,102,241,0.38);
        }

        .submit-btn:hover:not(:disabled) { opacity: 0.9; }
        .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .color-preview {
          height: 5px;
          border-radius: 3px;
          margin-top: 4px;
          transition: background 0.2s;
        }

        /* ══════════════════════════════════════
           RESPONSIVE — TABLET (640px – 1023px)
           Icon-only sidebar (64px)
        ══════════════════════════════════════ */
        @media (max-width: 1023px) and (min-width: 640px) {
          .sidebar {
            width: 64px;
          }

          .sidebar-brand-text,
          .sidebar-brand-badge,
          .sidebar-section-label,
          .nav-item-label,
          .user-info,
          .logout-btn-text { display: none; }

          .sidebar-brand { justify-content: center; padding: 20px 0; }
          .nav { padding: 0 8px; }
          .nav-item { justify-content: center; padding: 12px; gap: 0; }
          .nav-item.active::before { display: none; }
          .user-card { justify-content: center; padding: 10px; gap: 0; }
          .logout-btn { padding: 10px; justify-content: center; }
          .sidebar-bottom { padding: 12px 8px; }

          .main { margin-left: 64px; }

          .content { padding: 24px; }
          .topbar { padding: 16px 24px; }
          .search-input { width: 130px; }
          .grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }
          .stats-row { grid-template-columns: repeat(3, 1fr); }
        }

        /* ══════════════════════════════════════
           RESPONSIVE — MOBILE (< 640px)
           Hidden sidebar + top bar + bottom nav
        ══════════════════════════════════════ */
        @media (max-width: 639px) {
          .sidebar {
            transform: translateX(-100%);
            width: 260px;
            box-shadow: 4px 0 40px rgba(0,0,0,0.7);
          }

          .sidebar.mobile-open {
            transform: translateX(0);
          }

          .mobile-topbar { display: flex !important; }
          .topbar { display: none !important; }

          .main {
            margin-left: 0;
            padding-bottom: 66px;
          }

          .content { padding: 16px; }

          .stats-row {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .stats-row .stat-card:last-child {
            grid-column: 1 / -1;
          }

          .stat-card { padding: 14px 16px; gap: 12px; }
          .stat-value { font-size: 20px; }

          .grid { grid-template-columns: 1fr; gap: 14px; }

          .page-title { font-size: 18px; }
          .page-sub { font-size: 11.5px; }

          .modal { padding: 24px 20px; border-radius: 16px; }
          .modal-footer { flex-direction: column-reverse; }
          .cancel-btn, .submit-btn { width: 100%; text-align: center; justify-content: center; padding: 12px; }

          .bottom-nav { display: flex !important; }
        }

        /* ══════════════════════════════════════
           BOTTOM NAV (mobile only)
        ══════════════════════════════════════ */
        .bottom-nav {
          display: none;
          position: fixed;
          bottom: 0; left: 0; right: 0;
          height: 62px;
          background: #0d1020;
          border-top: 1px solid rgba(255,255,255,0.08);
          z-index: 95;
          align-items: center;
          justify-content: space-around;
          padding: 0 4px;
        }

        .bottom-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          padding: 6px 12px;
          border-radius: 8px;
          color: #4a5580;
          font-size: 10px;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.18s;
          letter-spacing: 0.3px;
        }

        .bottom-nav-item.active { color: #818cf8; }
        .bottom-nav-item:hover { color: #c8d3e8; }

        /* ══════════════════════════════════════
           SMALL DESKTOP (1024px – 1280px)
        ══════════════════════════════════════ */
        @media (max-width: 1280px) and (min-width: 1024px) {
          .search-input { width: 150px; }
          .grid { grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); }
          .content { padding: 28px 32px; }
          .topbar { padding: 18px 32px; }
        }
      `}</style>

      {/* Mobile sidebar backdrop */}
      <div
        className={`sidebar-overlay${sidebarOpen ? ' open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className="dash-page">
        {/* ══ SIDEBAR ══ */}
        <aside className={`sidebar${sidebarOpen ? ' mobile-open' : ''}`}>
          <div className="sidebar-brand">
            <Logo />
            <span className="sidebar-brand-text">ProjectSync</span>
            <span className="sidebar-brand-badge">Beta</span>
          </div>

          <div className="sidebar-section-label">Navigation</div>
          <nav className="nav">
            {navLinks.map(({ to, icon, label }) => (
              <Link
                key={to}
                to={to}
                className={`nav-item${location.pathname === to ? ' active' : ''}`}
              >
                {icon}
                <span className="nav-item-label">{label}</span>
              </Link>
            ))}
          </nav>

          <div className="sidebar-bottom">
            <div className="user-card">
              <div className="user-avatar">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="user-info">
                <div className="user-name">{user?.name}</div>
                <div className="user-email">{user?.email}</div>
              </div>
            </div>
            <button onClick={logout} className="logout-btn">
              <Icons.LogOut />
              <span className="logout-btn-text">Sign out</span>
            </button>
          </div>
        </aside>

        {/* ══ MAIN ══ */}
        <main className="main">

          {/* Mobile Top Bar */}
          <div className="mobile-topbar">
            <div className="mobile-brand">
              <Logo />
              ProjectSync
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button className="hamburger-btn" onClick={() => setShowModal(true)}>
                <Icons.Plus />
              </button>
              <button className="hamburger-btn" onClick={() => setSidebarOpen(true)}>
                <Icons.Menu />
              </button>
            </div>
          </div>

          {/* Desktop Top Bar */}
          <div className="topbar">
            <div className="topbar-left">
              <div className="page-title">My Projects</div>
              <div className="page-sub">
                Welcome back, {user?.name?.split(' ')[0]} — here's what's happening
              </div>
            </div>
            <div className="topbar-right">
              <div className="search-box">
                <Icons.Search />
                <input
                  className="search-input"
                  placeholder="Search projects..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <button className="create-btn" onClick={() => setShowModal(true)}>
                <Icons.Plus />
                New Project
              </button>
            </div>
          </div>

          <div className="content">

            {/* Mobile search (shown below topbar on mobile) */}
            <div style={{ marginBottom: 20, display: 'none' }} className="mobile-search-wrap">
              <div className="search-box" style={{ width: '100%' }}>
                <Icons.Search />
                <input
                  className="search-input"
                  style={{ width: '100%' }}
                  placeholder="Search projects..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(99,102,241,0.14)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" rx="1.5"/>
                    <rect x="14" y="3" width="7" height="7" rx="1.5"/>
                    <rect x="3" y="14" width="7" height="7" rx="1.5"/>
                    <rect x="14" y="14" width="7" height="7" rx="1.5"/>
                  </svg>
                </div>
                <div>
                  <div className="stat-label">Total Projects</div>
                  <div className="stat-value">{projects.length}</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(34,197,94,0.12)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div>
                  <div className="stat-label">Team Members</div>
                  <div className="stat-value">{totalMembers}</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'rgba(245,158,11,0.12)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                </div>
                <div>
                  <div className="stat-label">Active Today</div>
                  <div className="stat-value">—</div>
                </div>
              </div>
            </div>

            {/* Section Header */}
            <div className="section-header">
              <div className="section-title">
                <Icons.Layers />
                All Projects
                <span className="section-count">{filtered.length}</span>
              </div>
            </div>

            {/* Projects */}
            {loading ? (
              <div className="grid">
                {[...Array(6)].map((_, i) => (
                  <div className="skeleton-card" key={i}>
                    <div className="skeleton" style={{ height: 5, marginBottom: 20, borderRadius: 3 }} />
                    <div className="skeleton" style={{ height: 36, width: 36, borderRadius: 10, marginBottom: 14 }} />
                    <div className="skeleton" style={{ height: 14, width: '60%', marginBottom: 8 }} />
                    <div className="skeleton" style={{ height: 11, width: '85%', marginBottom: 5 }} />
                    <div className="skeleton" style={{ height: 11, width: '70%', marginBottom: 20 }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="skeleton" style={{ height: 22, width: 70 }} />
                      <div className="skeleton" style={{ height: 22, width: 50 }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 && search ? (
              <div className="empty">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3d4568" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <div className="empty-title">No results found</div>
                <div className="empty-sub">No projects match "{search}". Try a different keyword.</div>
              </div>
            ) : projects.length === 0 ? (
              <div className="empty">
                <EmptyIllustration />
                <div className="empty-title">No projects yet</div>
                <div className="empty-sub">Create your first project and start collaborating with your team in seconds.</div>
                <button className="create-btn" onClick={() => setShowModal(true)}>
                  <Icons.Plus />
                  Create First Project
                </button>
              </div>
            ) : (
              <div className="grid">
                {filtered.map(project => (
                  <div
                    key={project._id}
                    className="project-card"
                    onClick={() => navigate(`/board/${project._id}`)}
                    onMouseEnter={() => setHoveredCard(project._id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div
                      className="card-glow"
                      style={{ background: `radial-gradient(ellipse at top, ${project.color}22 0%, transparent 70%)` }}
                    />
                    <div className="card-accent" style={{ background: project.color }} />
                    <div className="card-body">
                      <div className="card-top-row">
                        <div className="card-icon" style={{ background: `${project.color}1a` }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={project.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                          </svg>
                        </div>
                        <div className="card-arrow">
                          <Icons.ChevronRight />
                        </div>
                      </div>

                      <div className="project-name">{project.name}</div>
                      <div className="project-desc">{project.description || 'No description provided for this project.'}</div>

                      <div className="card-footer">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div className="members-stack">
                            {project.members?.slice(0, 4).map((m, i) => (
                              <div
                                key={i}
                                className="member-avatar"
                                style={{
                                  background: colors[i % colors.length].hex,
                                  marginLeft: i > 0 ? '-6px' : 0,
                                  zIndex: 4 - i,
                                }}
                              >
                                {m.user?.name?.charAt(0).toUpperCase()}
                              </div>
                            ))}
                          </div>
                          <div className="member-count-pill">
                            <Icons.Users />
                            {project.members?.length} member{project.members?.length !== 1 ? 's' : ''}
                          </div>
                        </div>
                        <div className="card-tag">
                          <Icons.Activity />
                          Active
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* ══ BOTTOM NAV (mobile) ══ */}
        <nav className="bottom-nav">
          {navLinks.map(({ to, icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`bottom-nav-item${location.pathname === to ? ' active' : ''}`}
            >
              {icon}
              {label}
            </Link>
          ))}
        </nav>

        {/* ══ CREATE MODAL ══ */}
        {showModal && (
          <div className="overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <div className="modal-title">Create New Project</div>
                  <div className="modal-sub">Fill in the details below to get started</div>
                </div>
                <button className="close-btn" onClick={() => setShowModal(false)}>
                  <Icons.X />
                </button>
              </div>

              <div className="color-preview" style={{ background: form.color, marginBottom: 24 }} />

              <form className="form" onSubmit={handleCreate}>
                <div className="field">
                  <label className="label">PROJECT NAME</label>
                  <input
                    className="input"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Website Redesign"
                    required
                  />
                </div>

                <div className="field">
                  <label className="label">
                    DESCRIPTION <span style={{ color: '#4a5580', fontWeight: 400 }}>— OPTIONAL</span>
                  </label>
                  <textarea
                    className="textarea"
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    placeholder="What's this project about? Add a short description..."
                    rows={3}
                  />
                </div>

                <div className="field">
                  <label className="label">ACCENT COLOR</label>
                  <div className="color-grid">
                    {colors.map(({ hex, name }) => (
                      <div
                        key={hex}
                        className="color-option"
                        title={name}
                        style={{
                          background: hex,
                          outline: form.color === hex ? `3px solid rgba(255,255,255,0.45)` : '3px solid transparent',
                          outlineOffset: '2px',
                        }}
                        onClick={() => setForm({ ...form, color: hex })}
                      >
                        {form.color === hex && (
                          <div className="color-check">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn" disabled={creating || !form.name.trim()}>
                    {creating ? 'Creating...' : 'Create Project'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  )
}