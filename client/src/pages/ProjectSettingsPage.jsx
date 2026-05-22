import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'
import api from '../services/api'
import useAuth from '../hooks/useAuth'
import toast from 'react-hot-toast'

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const Icons = {
  Back: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 5l-7 7 7 7"/>
    </svg>
  ),
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
  Edit: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  Users: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  UserPlus: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="8.5" cy="7" r="4"/>
      <line x1="20" y1="8" x2="20" y2="14"/>
      <line x1="23" y1="11" x2="17" y2="11"/>
    </svg>
  ),
  Trash: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
      <path d="M10 11v6M14 11v6"/>
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
  ),
  Palette: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  ),
  Archive: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="21 8 21 21 3 21 3 8"/>
      <rect x="1" y="3" width="22" height="5"/>
      <line x1="10" y1="12" x2="14" y2="12"/>
    </svg>
  ),
  Crown: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 19h20M4 15l4-8 4 5 4-5 4 8"/>
    </svg>
  ),
  Shield: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Eye: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Check: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  AlertTriangle: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  Copy: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  ),
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
const Logo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="8" fill="url(#lgPS)"/>
    <path d="M8 14h12M14 8v12" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="14" cy="14" r="3" fill="white" fillOpacity="0.25"/>
    <defs>
      <linearGradient id="lgPS" x1="0" y1="0" x2="28" y2="28">
        <stop stopColor="#6366f1"/><stop offset="1" stopColor="#8b5cf6"/>
      </linearGradient>
    </defs>
  </svg>
)

// ─── Tabs ─────────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'general',  label: 'General',     icon: <Icons.Edit /> },
  { id: 'members',  label: 'Members',     icon: <Icons.Users /> },
  { id: 'appearance', label: 'Appearance', icon: <Icons.Palette /> },
  { id: 'danger',   label: 'Danger Zone', icon: <Icons.AlertTriangle /> },
]

const ROLE_META = {
  admin:  { label: 'Admin',  color: '#a5b4fc', bg: 'rgba(99,102,241,0.15)',  icon: <Icons.Crown /> },
  member: { label: 'Member', color: '#86efac', bg: 'rgba(34,197,94,0.12)',   icon: <Icons.Shield /> },
  viewer: { label: 'Viewer', color: '#94a3b8', bg: 'rgba(148,163,184,0.1)',  icon: <Icons.Eye /> },
}

const COLOR_PRESETS = [
  '#6366f1','#8b5cf6','#ec4899','#f43f5e',
  '#f59e0b','#10b981','#3b82f6','#06b6d4',
  '#84cc16','#f97316','#a855f7','#14b8a6',
]

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ProjectSettingsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()

  const [project, setProject]   = useState(null)
  const [loading, setLoading]   = useState(true)
  const [activeTab, setActiveTab] = useState('general')

  // General tab state
  const [name, setName]               = useState('')
  const [description, setDescription] = useState('')
  const [savingGeneral, setSavingGeneral] = useState(false)

  // Appearance
  const [color, setColor]   = useState('#6366f1')
  const [customColor, setCustomColor] = useState('#6366f1')
  const [savingAppearance, setSavingAppearance] = useState(false)

  // Members tab
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole]   = useState('member')
  const [inviting, setInviting]       = useState(false)
  const [members, setMembers]         = useState([])
  const [removingId, setRemovingId]   = useState(null)

  // Danger zone
  const [deleteConfirm, setDeleteConfirm] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [archiving, setArchiving] = useState(false)

  const navLinks = [
    { to: '/dashboard',    icon: <Icons.Dashboard />, label: 'Dashboard' },
    { to: '/notifications', icon: <Icons.Bell />,     label: 'Notifications' },
    { to: '/profile',      icon: <Icons.User />,      label: 'Profile' },
  ]

  useEffect(() => {
    api.get(`/projects/${id}`)
      .then(res => {
        const p = res.data
        setProject(p)
        setName(p.name || '')
        setDescription(p.description || '')
        setColor(p.color || '#6366f1')
        setCustomColor(p.color || '#6366f1')
        setMembers(p.members || [])
      })
      .catch(() => { toast.error('Failed to load project'); navigate('/dashboard') })
      .finally(() => setLoading(false))
  }, [id])

  const handleSaveGeneral = async (e) => {
    e.preventDefault()
    if (!name.trim()) { toast.error('Project name is required'); return }
    setSavingGeneral(true)
    try {
      const res = await api.put(`/projects/${id}`, { name, description })
      setProject(res.data)
      toast.success('Project updated!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed')
    } finally {
      setSavingGeneral(false)
    }
  }

  const handleSaveAppearance = async () => {
    setSavingAppearance(true)
    try {
      await api.put(`/projects/${id}`, { color })
      toast.success('Appearance saved!')
    } catch {
      toast.error('Failed to save appearance')
    } finally {
      setSavingAppearance(false)
    }
  }

  const handleInvite = async (e) => {
    e.preventDefault()
    if (!inviteEmail.trim()) return
    setInviting(true)
    try {
      const res = await api.post(`/projects/${id}/invite`, { email: inviteEmail, role: inviteRole })
      setMembers(res.data.project?.members || members)
      setInviteEmail('')
      toast.success('Member invited!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to invite member')
    } finally {
      setInviting(false)
    }
  }

  const handleRemoveMember = async (userId) => {
    setRemovingId(userId)
    try {
      await api.delete(`/projects/${id}/members/${userId}`)
      setMembers(members.filter(m => (m.user?._id || m.user) !== userId))
      toast.success('Member removed')
    } catch {
      toast.error('Failed to remove member')
    } finally {
      setRemovingId(null)
    }
  }

  const handleArchive = async () => {
    setArchiving(true)
    try {
      await api.put(`/projects/${id}`, { isArchived: true })
      toast.success('Project archived')
      navigate('/dashboard')
    } catch {
      toast.error('Failed to archive project')
    } finally {
      setArchiving(false)
    }
  }

  const handleDelete = async () => {
    if (deleteConfirm !== project?.name) { toast.error('Project name does not match'); return }
    setDeleting(true)
    try {
      await api.delete(`/projects/${id}`)
      toast.success('Project deleted')
      navigate('/dashboard')
    } catch {
      toast.error('Failed to delete project')
    } finally {
      setDeleting(false)
    }
  }

  const copyProjectId = () => {
    navigator.clipboard.writeText(id)
    toast.success('Project ID copied!')
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#080b14', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#8892b4', fontSize: 14 }}>Loading project...</div>
      </div>
    )
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #080b14; color: #e2e8f0; }

        .ps-page {
          display: flex;
          min-height: 100vh;
          background: #080b14;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Sidebar ── */
        .ps-sidebar {
          width: 248px;
          background: #0d1020;
          border-right: 1px solid rgba(255,255,255,0.08);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0; left: 0;
          height: 100vh;
          z-index: 100;
          overflow-y: auto;
        }

        .ps-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 24px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          flex-shrink: 0;
        }
        .ps-brand-text { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 700; color: #ffffff; letter-spacing: -0.3px; }
        .ps-brand-badge { font-size: 9px; font-weight: 600; letter-spacing: 0.8px; color: #a5b4fc; background: rgba(99,102,241,0.18); border: 1px solid rgba(99,102,241,0.35); border-radius: 4px; padding: 2px 5px; text-transform: uppercase; }

        .ps-section-label { font-size: 10px; font-weight: 600; letter-spacing: 1.2px; text-transform: uppercase; color: #8892b4; padding: 20px 20px 8px; }

        .ps-nav { display: flex; flex-direction: column; gap: 2px; padding: 0 10px; }

        .ps-nav-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; border-radius: 9px;
          color: #94a3c4; font-size: 13.5px; font-weight: 500;
          text-decoration: none; transition: all 0.18s;
          position: relative;
        }
        .ps-nav-item:hover { color: #e2e8f0; background: rgba(255,255,255,0.07); }
        .ps-nav-item.active { color: #ffffff; background: rgba(99,102,241,0.16); }
        .ps-nav-item.active::before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 3px; height: 18px; background: #6366f1; border-radius: 0 3px 3px 0; }

        .ps-sidebar-bottom { margin-top: auto; padding: 16px 12px; border-top: 1px solid rgba(255,255,255,0.08); flex-shrink: 0; }
        .ps-user-card { display: flex; align-items: center; gap: 10px; padding: 10px; border-radius: 10px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09); margin-bottom: 8px; }
        .ps-avatar-sm { width: 34px; height: 34px; border-radius: 10px; background: linear-gradient(135deg, #6366f1, #8b5cf6); display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; color: #fff; flex-shrink: 0; }
        .ps-user-info { overflow: hidden; flex: 1; min-width: 0; }
        .ps-user-name { font-size: 13px; font-weight: 600; color: #f1f5f9; line-height: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .ps-user-email { font-size: 11px; color: #8892b4; margin-top: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .ps-logout-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 7px; background: transparent; border: 1px solid rgba(255,255,255,0.1); color: #94a3c4; border-radius: 8px; padding: 8px 12px; font-size: 13px; font-weight: 500; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.18s; }
        .ps-logout-btn:hover { border-color: rgba(239,68,68,0.4); color: #fca5a5; background: rgba(239,68,68,0.08); }

        /* ── Main ── */
        .ps-main { margin-left: 248px; flex: 1; display: flex; flex-direction: column; min-height: 100vh; min-width: 0; }

        .ps-topbar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 40px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          background: rgba(8,11,20,0.9);
          backdrop-filter: blur(12px);
          position: sticky; top: 0; z-index: 50; flex-shrink: 0;
        }
        .ps-topbar-left { display: flex; align-items: center; gap: 14px; }
        .ps-back-btn { display: flex; align-items: center; gap: 6px; color: #8892b4; font-size: 13px; font-weight: 500; text-decoration: none; transition: color 0.15s; padding: 6px 10px; border-radius: 7px; border: 1px solid rgba(255,255,255,0.08); background: transparent; cursor: pointer; font-family: 'DM Sans', sans-serif; }
        .ps-back-btn:hover { color: #e2e8f0; border-color: rgba(255,255,255,0.18); }
        .ps-topbar-divider { width: 1px; height: 20px; background: rgba(255,255,255,0.1); }
        .ps-page-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; color: #ffffff; letter-spacing: -0.3px; }
        .ps-page-sub { font-size: 12px; color: #8892b4; margin-top: 3px; }

        /* ── Project Hero Banner ── */
        .ps-hero {
          background: #0d1020;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 28px 40px;
          display: flex;
          align-items: center;
          gap: 20px;
          flex-shrink: 0;
        }
        .ps-hero-color-dot {
          width: 52px; height: 52px;
          border-radius: 14px;
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: white;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }
        .ps-hero-info { flex: 1; min-width: 0; }
        .ps-hero-name { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .ps-hero-desc { font-size: 13px; color: #8892b4; margin-top: 4px; line-height: 1.5; }
        .ps-hero-meta { display: flex; align-items: center; gap: 16px; margin-top: 10px; }
        .ps-hero-stat { display: flex; align-items: center; gap: 5px; font-size: 12px; color: #8892b4; }
        .ps-hero-stat-val { font-weight: 600; color: #c8d3e8; }
        .ps-id-row { display: flex; align-items: center; gap: 6px; margin-top: 8px; }
        .ps-id-label { font-size: 11px; color: #4a5580; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .ps-id-value { font-size: 11px; color: #6b7db3; font-family: monospace; }
        .ps-copy-btn { display: flex; align-items: center; gap: 4px; background: transparent; border: none; color: #4a5580; cursor: pointer; padding: 2px 6px; border-radius: 4px; font-size: 11px; transition: color 0.15s; }
        .ps-copy-btn:hover { color: #8892b4; }

        /* ── Content Layout ── */
        .ps-content { display: flex; flex: 1; min-height: 0; overflow: hidden; }

        /* ── Tab sidebar ── */
        .ps-tab-sidebar {
          width: 200px;
          border-right: 1px solid rgba(255,255,255,0.07);
          padding: 24px 12px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .ps-tab-btn {
          display: flex; align-items: center; gap: 9px;
          padding: 10px 12px; border-radius: 9px;
          background: transparent; border: none;
          color: #8892b4; font-size: 13px; font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer; text-align: left;
          transition: all 0.18s; width: 100%;
          white-space: nowrap;
        }
        .ps-tab-btn:hover { color: #e2e8f0; background: rgba(255,255,255,0.06); }
        .ps-tab-btn.active { color: #ffffff; background: rgba(99,102,241,0.16); }
        .ps-tab-btn.danger { color: #f87171; }
        .ps-tab-btn.danger:hover { background: rgba(239,68,68,0.08); }
        .ps-tab-btn.danger.active { background: rgba(239,68,68,0.12); color: #fca5a5; }

        /* ── Tab panel ── */
        .ps-panel { flex: 1; padding: 32px 40px; overflow-y: auto; display: flex; flex-direction: column; gap: 24px; }

        /* ── Section Card ── */
        .ps-card {
          background: #0d1020;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          overflow: hidden;
        }
        .ps-card-head { padding: 18px 22px; border-bottom: 1px solid rgba(255,255,255,0.07); }
        .ps-card-title { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; color: #e2e8f0; display: flex; align-items: center; gap: 8px; }
        .ps-card-sub { font-size: 12px; color: #8892b4; margin-top: 3px; }
        .ps-card-body { padding: 22px; }

        /* ── Form ── */
        .ps-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .ps-form-full { grid-column: 1 / -1; }
        .ps-field { display: flex; flex-direction: column; gap: 7px; }
        .ps-label { font-size: 11.5px; font-weight: 600; color: #c8d3e8; letter-spacing: 0.5px; text-transform: uppercase; }
        .ps-input, .ps-textarea, .ps-select {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; padding: 10px 14px;
          color: #f1f5f9; font-size: 13.5px;
          font-family: 'DM Sans', sans-serif;
          outline: none; transition: border-color 0.18s, background 0.18s;
          width: 100%;
        }
        .ps-input:focus, .ps-textarea:focus, .ps-select:focus { border-color: rgba(99,102,241,0.55); background: rgba(99,102,241,0.05); }
        .ps-input::placeholder, .ps-textarea::placeholder { color: #4a5580; }
        .ps-textarea { resize: vertical; min-height: 90px; line-height: 1.6; }
        .ps-select { cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238892b4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 38px; }
        .ps-select option { background: #0d1020; color: #f1f5f9; }
        .ps-char-counter { font-size: 11px; color: #4a5580; text-align: right; margin-top: 3px; }

        /* ── Action row ── */
        .ps-action-row { display: flex; align-items: center; justify-content: flex-end; gap: 10px; padding-top: 18px; border-top: 1px solid rgba(255,255,255,0.07); margin-top: 4px; }

        /* ── Buttons ── */
        .ps-btn-primary { display: flex; align-items: center; gap: 7px; background: linear-gradient(135deg, #6366f1, #7c3aed); color: #fff; border: none; border-radius: 9px; padding: 10px 22px; font-size: 13.5px; font-weight: 600; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: opacity 0.15s, transform 0.15s; box-shadow: 0 4px 18px rgba(99,102,241,0.3); }
        .ps-btn-primary:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
        .ps-btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
        .ps-btn-secondary { background: transparent; border: 1px solid rgba(255,255,255,0.12); color: #94a3c4; border-radius: 9px; padding: 10px 18px; font-size: 13.5px; font-weight: 500; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.15s; }
        .ps-btn-secondary:hover { border-color: rgba(255,255,255,0.22); color: #e2e8f0; }
        .ps-btn-danger { display: flex; align-items: center; gap: 7px; background: transparent; border: 1px solid rgba(239,68,68,0.35); color: #f87171; border-radius: 9px; padding: 10px 18px; font-size: 13.5px; font-weight: 500; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.15s; }
        .ps-btn-danger:hover { background: rgba(239,68,68,0.1); border-color: rgba(239,68,68,0.6); }
        .ps-btn-danger:disabled { opacity: 0.5; cursor: not-allowed; }
        .ps-btn-outline { display: flex; align-items: center; gap: 7px; background: transparent; border: 1px solid rgba(255,255,255,0.1); color: #8892b4; border-radius: 8px; padding: 8px 14px; font-size: 12.5px; font-weight: 500; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.15s; }
        .ps-btn-outline:hover { border-color: rgba(255,255,255,0.2); color: #e2e8f0; }

        /* ── Color Palette ── */
        .ps-color-grid { display: flex; flex-wrap: wrap; gap: 10px; }
        .ps-color-swatch {
          width: 34px; height: 34px; border-radius: 9px;
          cursor: pointer; position: relative;
          transition: transform 0.15s, box-shadow 0.15s;
          border: 2px solid transparent;
          flex-shrink: 0;
        }
        .ps-color-swatch:hover { transform: scale(1.12); }
        .ps-color-swatch.selected { border-color: rgba(255,255,255,0.8); box-shadow: 0 0 0 3px rgba(255,255,255,0.15); }
        .ps-color-swatch-check { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: white; }
        .ps-color-custom-row { display: flex; align-items: center; gap: 12px; margin-top: 8px; }
        .ps-color-picker { width: 40px; height: 40px; border-radius: 9px; border: 1px solid rgba(255,255,255,0.15); cursor: pointer; overflow: hidden; padding: 0; background: none; }
        .ps-color-picker::-webkit-color-swatch-wrapper { padding: 0; }
        .ps-color-picker::-webkit-color-swatch { border: none; border-radius: 7px; }
        .ps-color-preview-label { font-size: 12px; color: #8892b4; }
        .ps-color-preview-val { font-size: 12px; color: #c8d3e8; font-family: monospace; margin-top: 2px; }

        /* ── Members list ── */
        .ps-member-item {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .ps-member-item:last-child { border-bottom: none; padding-bottom: 0; }
        .ps-member-avatar { width: 38px; height: 38px; border-radius: 10px; background: linear-gradient(135deg, #4f46e5, #7c3aed); display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; color: #fff; flex-shrink: 0; }
        .ps-member-info { flex: 1; min-width: 0; }
        .ps-member-name { font-size: 13.5px; font-weight: 600; color: #f1f5f9; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .ps-member-email { font-size: 12px; color: #8892b4; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .ps-role-badge { display: flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 600; padding: 4px 9px; border-radius: 20px; flex-shrink: 0; }
        .ps-member-remove { display: flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 7px; background: transparent; border: 1px solid rgba(239,68,68,0.2); color: #f87171; cursor: pointer; transition: all 0.15s; flex-shrink: 0; font-family: 'DM Sans', sans-serif; }
        .ps-member-remove:hover { background: rgba(239,68,68,0.12); border-color: rgba(239,68,68,0.5); }
        .ps-member-remove:disabled { opacity: 0.4; cursor: not-allowed; }
        .ps-owner-badge { font-size: 10px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; color: #fcd34d; background: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.25); border-radius: 20px; padding: 2px 8px; flex-shrink: 0; }

        /* ── Invite form ── */
        .ps-invite-row { display: flex; gap: 10px; align-items: flex-end; }
        .ps-invite-email { flex: 1; }

        /* ── Danger zone ── */
        .ps-danger-item { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .ps-danger-item:last-child { border-bottom: none; padding-bottom: 0; }
        .ps-danger-title { font-size: 14px; font-weight: 600; color: #f1f5f9; }
        .ps-danger-desc { font-size: 12.5px; color: #8892b4; margin-top: 4px; line-height: 1.5; max-width: 420px; }

        /* ── Delete modal ── */
        .ps-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 16px; animation: psFadeIn 0.15s ease; }
        @keyframes psFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes psSlideUp { from { opacity: 0; transform: translateY(20px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes psSpin { to { transform: rotate(360deg); } }

        .ps-delete-modal { background: #0d1020; border: 1px solid rgba(239,68,68,0.25); border-radius: 18px; padding: 28px; width: 100%; max-width: 420px; animation: psSlideUp 0.2s ease; box-shadow: 0 40px 80px rgba(0,0,0,0.7); }
        .ps-delete-icon { width: 48px; height: 48px; border-radius: 14px; background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.25); display: flex; align-items: center; justify-content: center; color: #f87171; margin-bottom: 16px; }
        .ps-delete-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; color: #f1f5f9; margin-bottom: 8px; }
        .ps-delete-desc { font-size: 13px; color: #8892b4; line-height: 1.6; margin-bottom: 20px; }
        .ps-delete-confirm-label { font-size: 12px; font-weight: 600; color: #c8d3e8; letter-spacing: 0.4px; text-transform: uppercase; margin-bottom: 7px; }
        .ps-delete-actions { display: flex; gap: 10px; margin-top: 20px; }
        .ps-btn-delete-confirm { flex: 1; background: #ef4444; color: #fff; border: none; border-radius: 9px; padding: 11px; font-size: 13.5px; font-weight: 600; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: opacity 0.15s; }
        .ps-btn-delete-confirm:hover:not(:disabled) { opacity: 0.9; }
        .ps-btn-delete-confirm:disabled { opacity: 0.4; cursor: not-allowed; }

        /* ── Mobile top nav ── */
        .ps-mobile-topnav { display: none; align-items: center; gap: 10px; padding: 14px 16px; background: #0d1020; border-bottom: 1px solid rgba(255,255,255,0.08); position: sticky; top: 0; z-index: 100; }
        .ps-mobile-tab-row { display: none; gap: 0; overflow-x: auto; background: #0d1020; border-bottom: 1px solid rgba(255,255,255,0.08); scrollbar-width: none; }
        .ps-mobile-tab-row::-webkit-scrollbar { display: none; }
        .ps-mobile-tab-btn { display: flex; align-items: center; gap: 6px; padding: 12px 16px; background: transparent; border: none; border-bottom: 2px solid transparent; color: #8892b4; font-size: 13px; font-weight: 500; font-family: 'DM Sans', sans-serif; cursor: pointer; white-space: nowrap; transition: all 0.15s; flex-shrink: 0; }
        .ps-mobile-tab-btn:hover { color: #e2e8f0; }
        .ps-mobile-tab-btn.active { color: #a5b4fc; border-bottom-color: #6366f1; }

        /* ── Responsive ── */
        @media (max-width: 1023px) and (min-width: 640px) {
          .ps-sidebar { width: 64px; }
          .ps-brand-text, .ps-brand-badge, .ps-section-label, .ps-nav-item-label, .ps-user-info, .ps-logout-btn-text { display: none; }
          .ps-brand { justify-content: center; padding: 20px 0; }
          .ps-nav { padding: 0 8px; }
          .ps-nav-item { justify-content: center; padding: 12px; gap: 0; }
          .ps-nav-item.active::before { display: none; }
          .ps-user-card { justify-content: center; padding: 10px; gap: 0; }
          .ps-logout-btn { padding: 10px; justify-content: center; }
          .ps-sidebar-bottom { padding: 12px 8px; }
          .ps-main { margin-left: 64px; }
          .ps-topbar { padding: 16px 20px; }
          .ps-hero { padding: 20px; }
          .ps-panel { padding: 24px 20px; }
          .ps-form-grid { grid-template-columns: 1fr; }
          .ps-tab-sidebar { width: 56px; padding: 16px 8px; }
          .ps-tab-btn-label { display: none; }
          .ps-tab-btn { justify-content: center; gap: 0; padding: 12px; }
          .ps-danger-item { flex-direction: column; gap: 12px; }
        }

        @media (max-width: 639px) {
          .ps-sidebar { display: none; }
          .ps-main { margin-left: 0; }
          .ps-topbar { display: none; }
          .ps-mobile-topnav { display: flex; }
          .ps-mobile-tab-row { display: flex; }
          .ps-hero { padding: 16px; flex-direction: column; align-items: flex-start; gap: 14px; }
          .ps-content { flex-direction: column; overflow: visible; }
          .ps-tab-sidebar { display: none; }
          .ps-panel { padding: 16px; gap: 16px; }
          .ps-form-grid { grid-template-columns: 1fr; }
          .ps-action-row { flex-direction: column-reverse; }
          .ps-btn-primary, .ps-btn-secondary { width: 100%; justify-content: center; }
          .ps-danger-item { flex-direction: column; gap: 12px; }
          .ps-btn-danger { width: 100%; justify-content: center; }
          .ps-invite-row { flex-direction: column; }
          .ps-invite-row .ps-btn-primary { width: 100%; justify-content: center; }
          .ps-hero-meta { flex-wrap: wrap; gap: 10px; }
        }
      `}</style>

      <div className="ps-page">
        {/* ══ SIDEBAR ══ */}
        <aside className="ps-sidebar">
          <div className="ps-brand">
            <Logo />
            <span className="ps-brand-text">ProjectSync</span>
            <span className="ps-brand-badge">Beta</span>
          </div>
          <div className="ps-section-label">Navigation</div>
          <nav className="ps-nav">
            {navLinks.map(({ to, icon, label }) => (
              <Link key={to} to={to} className={`ps-nav-item${location.pathname === to ? ' active' : ''}`}>
                {icon}
                <span className="ps-nav-item-label">{label}</span>
              </Link>
            ))}
          </nav>
          <div className="ps-sidebar-bottom">
            <div className="ps-user-card">
              <div className="ps-avatar-sm">{user?.name?.charAt(0).toUpperCase()}</div>
              <div className="ps-user-info">
                <div className="ps-user-name">{user?.name}</div>
                <div className="ps-user-email">{user?.email}</div>
              </div>
            </div>
            <button onClick={logout} className="ps-logout-btn">
              <Icons.LogOut />
              <span className="ps-logout-btn-text">Sign out</span>
            </button>
          </div>
        </aside>

        {/* ══ MAIN ══ */}
        <main className="ps-main">
          {/* Mobile top nav */}
          <div className="ps-mobile-topnav">
            <button className="ps-back-btn" onClick={() => navigate('/dashboard')}>
              <Icons.Back /> Dashboard
            </button>
            <span style={{ color: '#f1f5f9', fontSize: 15, fontWeight: 700, fontFamily: 'Syne, sans-serif', flex: 1 }}>
              {project?.name || 'Settings'}
            </span>
          </div>

          {/* Mobile tab row */}
          <div className="ps-mobile-tab-row">
            {TABS.map(t => (
              <button
                key={t.id}
                className={`ps-mobile-tab-btn${activeTab === t.id ? ' active' : ''}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.icon}{t.label}
              </button>
            ))}
          </div>

          {/* Desktop topbar */}
          <div className="ps-topbar">
            <div className="ps-topbar-left">
              <button className="ps-back-btn" onClick={() => navigate('/dashboard')}>
                <Icons.Back /> Dashboard
              </button>
              <div className="ps-topbar-divider" />
              <div>
                <div className="ps-page-title">Project Settings</div>
                <div className="ps-page-sub">Manage your project configuration</div>
              </div>
            </div>
          </div>

          {/* Project Hero */}
          <div className="ps-hero">
            <div
              className="ps-hero-color-dot"
              style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
            >
              {project?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="ps-hero-info">
              <div className="ps-hero-name">{project?.name}</div>
              {project?.description && (
                <div className="ps-hero-desc">{project.description}</div>
              )}
              <div className="ps-hero-meta">
                <div className="ps-hero-stat">
                  <Icons.Users />
                  <span className="ps-hero-stat-val">{members.length}</span>
                  <span>member{members.length !== 1 ? 's' : ''}</span>
                </div>
                <div className="ps-hero-stat">
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
                  <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#6b7db3' }}>{color}</span>
                </div>
              </div>
              <div className="ps-id-row">
                <span className="ps-id-label">ID</span>
                <span className="ps-id-value">{id}</span>
                <button className="ps-copy-btn" onClick={copyProjectId}>
                  <Icons.Copy /> copy
                </button>
              </div>
            </div>
          </div>

          {/* Content: tab sidebar + panel */}
          <div className="ps-content">
            {/* Vertical tab sidebar */}
            <div className="ps-tab-sidebar">
              {TABS.map(t => (
                <button
                  key={t.id}
                  className={`ps-tab-btn${t.id === 'danger' ? ' danger' : ''}${activeTab === t.id ? ' active' : ''}`}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.icon}
                  <span className="ps-tab-btn-label">{t.label}</span>
                </button>
              ))}
            </div>

            {/* Panel */}
            <div className="ps-panel">

              {/* ══ GENERAL ══ */}
              {activeTab === 'general' && (
                <>
                  <div className="ps-card">
                    <div className="ps-card-head">
                      <div className="ps-card-title"><Icons.Edit />Project Details</div>
                      <div className="ps-card-sub">Update your project name and description</div>
                    </div>
                    <div className="ps-card-body">
                      <form onSubmit={handleSaveGeneral}>
                        <div className="ps-form-grid">
                          <div className="ps-field ps-form-full">
                            <label className="ps-label">Project Name</label>
                            <input
                              className="ps-input"
                              value={name}
                              onChange={e => setName(e.target.value)}
                              placeholder="My Awesome Project"
                              required
                            />
                          </div>
                          <div className="ps-field ps-form-full">
                            <label className="ps-label">Description</label>
                            <textarea
                              className="ps-textarea"
                              value={description}
                              onChange={e => setDescription(e.target.value)}
                              maxLength={280}
                              placeholder="What is this project about? What's the goal?"
                            />
                            <div className="ps-char-counter">{description.length}/280</div>
                          </div>
                        </div>
                        <div className="ps-action-row">
                          <button type="submit" className="ps-btn-primary" disabled={savingGeneral}>
                            {savingGeneral
                              ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'psSpin 0.8s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Saving...</>
                              : <><Icons.Check />Save Changes</>}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* Project Info card */}
                  <div className="ps-card">
                    <div className="ps-card-head">
                      <div className="ps-card-title"><Icons.Shield />Project Information</div>
                      <div className="ps-card-sub">Read-only project metadata</div>
                    </div>
                    <div className="ps-card-body">
                      {[
                        { label: 'Project ID', value: id, mono: true },
                        { label: 'Owner', value: project?.owner?.name || 'You' },
                        { label: 'Created', value: project?.createdAt ? new Date(project.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—' },
                        { label: 'Members', value: `${members.length} member${members.length !== 1 ? 's' : ''}` },
                        { label: 'Status', value: project?.isArchived ? 'Archived' : 'Active' },
                      ].map(({ label, value, mono }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <span style={{ fontSize: 13, color: '#8892b4' }}>{label}</span>
                          <span style={{ fontSize: 13, color: '#e2e8f0', fontFamily: mono ? 'monospace' : 'inherit', fontWeight: 500 }}>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* ══ MEMBERS ══ */}
              {activeTab === 'members' && (
                <>
                  {/* Invite */}
                  <div className="ps-card">
                    <div className="ps-card-head">
                      <div className="ps-card-title"><Icons.UserPlus />Invite Member</div>
                      <div className="ps-card-sub">Add a team member by their registered email address</div>
                    </div>
                    <div className="ps-card-body">
                      <form onSubmit={handleInvite}>
                        <div className="ps-invite-row">
                          <div className="ps-field ps-invite-email">
                            <label className="ps-label">Email Address</label>
                            <input
                              className="ps-input"
                              type="email"
                              value={inviteEmail}
                              onChange={e => setInviteEmail(e.target.value)}
                              placeholder="teammate@company.com"
                            />
                          </div>
                          <div className="ps-field" style={{ minWidth: 130 }}>
                            <label className="ps-label">Role</label>
                            <select className="ps-select" value={inviteRole} onChange={e => setInviteRole(e.target.value)}>
                              <option value="admin">Admin</option>
                              <option value="member">Member</option>
                              <option value="viewer">Viewer</option>
                            </select>
                          </div>
                          <div className="ps-field" style={{ justifyContent: 'flex-end' }}>
                            <button type="submit" className="ps-btn-primary" disabled={inviting || !inviteEmail.trim()}>
                              {inviting
                                ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'psSpin 0.8s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Inviting...</>
                                : <><Icons.UserPlus />Invite</>}
                            </button>
                          </div>
                        </div>

                        {/* Role descriptions */}
                        <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
                          {Object.entries(ROLE_META).map(([role, meta]) => (
                            <div key={role} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '7px 11px' }}>
                              <span style={{ color: meta.color }}>{meta.icon}</span>
                              <span style={{ fontSize: 12, color: '#c8d3e8', fontWeight: 600 }}>{meta.label}</span>
                              <span style={{ fontSize: 11, color: '#4a5580' }}>
                                {role === 'admin' ? '— full access' : role === 'member' ? '— can edit' : '— read only'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* Members list */}
                  <div className="ps-card">
                    <div className="ps-card-head">
                      <div className="ps-card-title">
                        <Icons.Users />
                        Team Members
                        <span style={{ fontSize: 11, fontWeight: 600, color: '#8892b4', background: 'rgba(255,255,255,0.06)', borderRadius: 20, padding: '2px 8px', marginLeft: 4 }}>
                          {members.length}
                        </span>
                      </div>
                      <div className="ps-card-sub">Current project members and their roles</div>
                    </div>
                    <div className="ps-card-body">
                      {members.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '32px 0', color: '#4a5580' }}>
                          <Icons.Users />
                          <p style={{ marginTop: 10, fontSize: 13 }}>No members yet — invite someone above</p>
                        </div>
                      ) : (
                        members.map((m) => {
                          const memberId = m.user?._id || m.user
                          const memberName = m.user?.name || 'Unknown'
                          const memberEmail = m.user?.email || ''
                          const isOwner = project?.owner?._id === memberId || project?.owner === memberId
                          const roleMeta = ROLE_META[m.role] || ROLE_META.member
                          return (
                            <div className="ps-member-item" key={memberId}>
                              <div className="ps-member-avatar">{memberName.charAt(0).toUpperCase()}</div>
                              <div className="ps-member-info">
                                <div className="ps-member-name">{memberName}</div>
                                <div className="ps-member-email">{memberEmail}</div>
                              </div>
                              {isOwner ? (
                                <span className="ps-owner-badge">Owner</span>
                              ) : (
                                <span className="ps-role-badge" style={{ color: roleMeta.color, background: roleMeta.bg }}>
                                  {roleMeta.icon}{roleMeta.label}
                                </span>
                              )}
                              {!isOwner && (
                                <button
                                  className="ps-member-remove"
                                  onClick={() => handleRemoveMember(memberId)}
                                  disabled={removingId === memberId}
                                  title="Remove member"
                                >
                                  <Icons.Trash />
                                </button>
                              )}
                            </div>
                          )
                        })
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* ══ APPEARANCE ══ */}
              {activeTab === 'appearance' && (
                <div className="ps-card">
                  <div className="ps-card-head">
                    <div className="ps-card-title"><Icons.Palette />Project Color</div>
                    <div className="ps-card-sub">Choose a color to identify this project across your dashboard</div>
                  </div>
                  <div className="ps-card-body">
                    {/* Preview */}
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: 16, marginBottom: 22, display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 12, background: `linear-gradient(135deg, ${color}, ${color}99)`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 20 }}>
                        {project?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9', fontFamily: 'Syne, sans-serif' }}>{project?.name}</div>
                        <div style={{ fontSize: 12, color: '#8892b4', marginTop: 3 }}>Project card preview</div>
                        <div style={{ width: 80, height: 3, borderRadius: 2, background: color, marginTop: 6 }} />
                      </div>
                    </div>

                    <div className="ps-field">
                      <label className="ps-label">Select a color</label>
                      <div className="ps-color-grid">
                        {COLOR_PRESETS.map(c => (
                          <div
                            key={c}
                            className={`ps-color-swatch${color === c ? ' selected' : ''}`}
                            style={{ background: c }}
                            onClick={() => setColor(c)}
                          >
                            {color === c && (
                              <div className="ps-color-swatch-check"><Icons.Check /></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="ps-color-custom-row">
                      <input
                        type="color"
                        className="ps-color-picker"
                        value={customColor}
                        onChange={e => { setCustomColor(e.target.value); setColor(e.target.value) }}
                      />
                      <div>
                        <div className="ps-color-preview-label">Custom color</div>
                        <div className="ps-color-preview-val">{color}</div>
                      </div>
                    </div>

                    <div className="ps-action-row">
                      <button className="ps-btn-primary" onClick={handleSaveAppearance} disabled={savingAppearance}>
                        {savingAppearance
                          ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'psSpin 0.8s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Saving...</>
                          : <><Icons.Check />Save Appearance</>}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ══ DANGER ZONE ══ */}
              {activeTab === 'danger' && (
                <div className="ps-card" style={{ borderColor: 'rgba(239,68,68,0.2)' }}>
                  <div className="ps-card-head" style={{ borderColor: 'rgba(239,68,68,0.15)' }}>
                    <div className="ps-card-title" style={{ color: '#f87171' }}><Icons.AlertTriangle />Danger Zone</div>
                    <div className="ps-card-sub">These actions are irreversible — proceed with caution</div>
                  </div>
                  <div className="ps-card-body">
                    <div className="ps-danger-item">
                      <div>
                        <div className="ps-danger-title">Archive Project</div>
                        <div className="ps-danger-desc">Hide this project from your dashboard. Archived projects are not deleted and can be restored at any time from your account settings.</div>
                      </div>
                      <button className="ps-btn-outline" onClick={handleArchive} disabled={archiving} style={{ flexShrink: 0 }}>
                        <Icons.Archive />{archiving ? 'Archiving...' : 'Archive'}
                      </button>
                    </div>
                    <div className="ps-danger-item">
                      <div>
                        <div className="ps-danger-title">Leave Project</div>
                        <div className="ps-danger-desc">Remove yourself from this project. You will lose access unless re-invited by the project owner or an admin member.</div>
                      </div>
                      <button className="ps-btn-danger" onClick={() => toast.error('Cannot leave — you are the project owner')} style={{ flexShrink: 0 }}>
                        <Icons.LogOut />Leave Project
                      </button>
                    </div>
                    <div className="ps-danger-item">
                      <div>
                        <div className="ps-danger-title">Delete Project</div>
                        <div className="ps-danger-desc">Permanently delete this project and all its boards, cards, comments, and member data. <strong style={{ color: '#fca5a5' }}>This cannot be undone.</strong></div>
                      </div>
                      <button className="ps-btn-danger" onClick={() => setShowDeleteModal(true)} style={{ flexShrink: 0 }}>
                        <Icons.Trash />Delete Project
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>{/* end panel */}
          </div>{/* end content */}
        </main>
      </div>

      {/* ══ DELETE MODAL ══ */}
      {showDeleteModal && (
        <div className="ps-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="ps-delete-modal" onClick={e => e.stopPropagation()}>
            <div className="ps-delete-icon"><Icons.Trash /></div>
            <div className="ps-delete-title">Delete Project</div>
            <div className="ps-delete-desc">
              This will permanently delete <strong style={{ color: '#f1f5f9' }}>{project?.name}</strong>, all its boards, cards, and comments. <strong style={{ color: '#fca5a5' }}>This cannot be undone.</strong>
            </div>
            <div className="ps-delete-confirm-label">
              Type <strong style={{ color: '#e2e8f0' }}>{project?.name}</strong> to confirm
            </div>
            <input
              className="ps-input"
              value={deleteConfirm}
              onChange={e => setDeleteConfirm(e.target.value)}
              placeholder={project?.name}
              autoFocus
            />
            <div className="ps-delete-actions">
              <button className="ps-btn-secondary" onClick={() => { setShowDeleteModal(false); setDeleteConfirm('') }}>
                Cancel
              </button>
              <button
                className="ps-btn-delete-confirm"
                disabled={deleteConfirm !== project?.name || deleting}
                onClick={handleDelete}
              >
                {deleting ? 'Deleting...' : 'Delete Project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}