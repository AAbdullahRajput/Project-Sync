import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import api from '../services/api'
import toast from 'react-hot-toast'

// ─── Icons ────────────────────────────────────────────────────────────────────
const Icons = {
  Dashboard: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
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
  Shield: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Eye: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  EyeOff: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ),
  Check: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Trash: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14H6L5 6"/>
      <path d="M10 11v6M14 11v6"/>
      <path d="M9 6V4h6v2"/>
    </svg>
  ),
  Globe: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  Moon: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  ),
  Link: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  ),
}

const Logo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="8" fill="url(#spLogoGrad)"/>
    <path d="M8 14h12M14 8v12" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="14" cy="14" r="3" fill="white" fillOpacity="0.25"/>
    <defs>
      <linearGradient id="spLogoGrad" x1="0" y1="0" x2="28" y2="28">
        <stop stopColor="#6366f1"/><stop offset="1" stopColor="#8b5cf6"/>
      </linearGradient>
    </defs>
  </svg>
)

const TABS = [
  { id: 'appearance', label: 'Appearance', icon: <Icons.Moon /> },
  { id: 'security', label: 'Security', icon: <Icons.Shield /> },
  { id: 'notifications', label: 'Notifications', icon: <Icons.Bell /> },
  { id: 'integrations', label: 'Integrations', icon: <Icons.Link /> },
  { id: 'danger', label: 'Danger Zone', icon: <Icons.Trash />, danger: true },
]

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('appearance')

  // Security form
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' })
  const [showPw, setShowPw] = useState({ current: false, newPass: false, confirm: false })
  const [savingPw, setSavingPw] = useState(false)

  // Appearance
  const [theme, setTheme] = useState('dark')
  const [accentColor, setAccentColor] = useState('#6366f1')

  // Notification prefs
  const [notifPrefs, setNotifPrefs] = useState({
    cardAssigned: true,
    commentAdded: true,
    cardMoved: false,
    memberAdded: true,
    emailDigest: false,
  })

  // Danger zone
  const [deleteConfirm, setDeleteConfirm] = useState('')

  useEffect(() => { setSidebarOpen(false) }, [location.pathname])

  const navLinks = [
    { to: '/dashboard', icon: <Icons.Dashboard />, label: 'Dashboard' },
    { to: '/notifications', icon: <Icons.Bell />, label: 'Notifications' },
    { to: '/profile', icon: <Icons.User />, label: 'Profile' },
    { to: '/settings', icon: <Icons.Settings />, label: 'Settings' },
  ]

  const accentColors = ['#6366f1','#ec4899','#f59e0b','#22c55e','#3b82f6','#ef4444','#8b5cf6','#06b6d4']

  const handlePasswordSave = async (e) => {
    e.preventDefault()
    if (passwords.newPass !== passwords.confirm) {
      toast.error('New passwords do not match')
      return
    }
    if (passwords.newPass.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    setSavingPw(true)
    try {
      await api.put('/auth/profile', { password: passwords.newPass })
      toast.success('Password updated!')
      setPasswords({ current: '', newPass: '', confirm: '' })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update password')
    } finally {
      setSavingPw(false)
    }
  }

  const toggleNotif = (key) => setNotifPrefs(prev => ({ ...prev, [key]: !prev[key] }))

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #080b14; color: #e2e8f0; }

        .sp-page { display: flex; min-height: 100vh; background: #080b14; font-family: 'DM Sans', sans-serif; }

        /* ── Sidebar overlay ── */
        .sp-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.65); z-index: 98; backdrop-filter: blur(4px); }
        .sp-overlay.open { display: block; }

        /* ── Sidebar ── */
        .sp-sidebar {
          width: 248px; background: #0d1020; border-right: 1px solid rgba(255,255,255,0.08);
          display: flex; flex-direction: column; position: fixed; top: 0; left: 0;
          height: 100vh; z-index: 100; transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
          overflow-y: auto; overflow-x: hidden;
        }
        .sp-brand { display: flex; align-items: center; gap: 10px; padding: 24px 20px; border-bottom: 1px solid rgba(255,255,255,0.08); flex-shrink: 0; }
        .sp-brand-text { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 700; color: #ffffff; letter-spacing: -0.3px; }
        .sp-brand-badge { font-size: 9px; font-weight: 600; letter-spacing: 0.8px; color: #a5b4fc; background: rgba(99,102,241,0.18); border: 1px solid rgba(99,102,241,0.35); border-radius: 4px; padding: 2px 5px; text-transform: uppercase; }
        .sp-section-label { font-size: 10px; font-weight: 600; letter-spacing: 1.2px; text-transform: uppercase; color: #8892b4; padding: 20px 20px 8px; }
        .sp-nav { display: flex; flex-direction: column; gap: 2px; padding: 0 10px; }
        .sp-nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 9px; color: #94a3c4; font-size: 13.5px; font-weight: 500; text-decoration: none; transition: all 0.18s ease; position: relative; }
        .sp-nav-item:hover { color: #e2e8f0; background: rgba(255,255,255,0.07); }
        .sp-nav-item.active { color: #ffffff; background: rgba(99,102,241,0.16); }
        .sp-nav-item.active::before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 3px; height: 18px; background: #6366f1; border-radius: 0 3px 3px 0; }
        .sp-sidebar-bottom { margin-top: auto; padding: 16px 12px; border-top: 1px solid rgba(255,255,255,0.08); flex-shrink: 0; }
        .sp-user-card { display: flex; align-items: center; gap: 10px; padding: 10px; border-radius: 10px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09); margin-bottom: 8px; }
        .sp-user-avatar { width: 34px; height: 34px; border-radius: 10px; background: linear-gradient(135deg, #6366f1, #8b5cf6); display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; color: #fff; flex-shrink: 0; }
        .sp-user-info { overflow: hidden; flex: 1; min-width: 0; }
        .sp-user-name { font-size: 13px; font-weight: 600; color: #f1f5f9; line-height: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .sp-user-email { font-size: 11px; color: #8892b4; margin-top: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .sp-logout-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 7px; background: transparent; border: 1px solid rgba(255,255,255,0.1); color: #94a3c4; border-radius: 8px; padding: 8px 12px; font-size: 13px; font-weight: 500; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.18s; }
        .sp-logout-btn:hover { border-color: rgba(239,68,68,0.4); color: #fca5a5; background: rgba(239,68,68,0.08); }

        /* ── Mobile top bar ── */
        .sp-mobile-topbar { display: none; align-items: center; justify-content: space-between; padding: 0 16px; height: 56px; background: #0d1020; border-bottom: 1px solid rgba(255,255,255,0.08); position: sticky; top: 0; z-index: 90; flex-shrink: 0; }
        .sp-mobile-brand { display: flex; align-items: center; gap: 8px; font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; color: #ffffff; }
        .sp-hamburger { width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 9px; cursor: pointer; color: #e2e8f0; transition: background 0.18s; }
        .sp-hamburger:hover { background: rgba(255,255,255,0.09); }

        /* ── Main ── */
        .sp-main { margin-left: 248px; flex: 1; display: flex; flex-direction: column; min-height: 100vh; min-width: 0; }

        /* ── Desktop topbar ── */
        .sp-topbar { display: flex; align-items: center; padding: 20px 40px; border-bottom: 1px solid rgba(255,255,255,0.08); background: rgba(8,11,20,0.9); backdrop-filter: blur(12px); position: sticky; top: 0; z-index: 50; flex-shrink: 0; }
        .sp-page-title { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.4px; line-height: 1; }
        .sp-page-sub { font-size: 12.5px; color: #8892b4; margin-top: 5px; }

        /* ── Content layout ── */
        .sp-content { display: flex; gap: 0; flex: 1; }

        /* ── Settings tabs (left column) ── */
        .sp-tabs { width: 220px; min-width: 220px; border-right: 1px solid rgba(255,255,255,0.08); padding: 28px 12px; display: flex; flex-direction: column; gap: 2px; }
        .sp-tab { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 9px; color: #94a3c4; font-size: 13.5px; font-weight: 500; cursor: pointer; border: none; background: transparent; font-family: 'DM Sans', sans-serif; transition: all 0.18s; width: 100%; text-align: left; }
        .sp-tab:hover { color: #e2e8f0; background: rgba(255,255,255,0.07); }
        .sp-tab.active { color: #ffffff; background: rgba(99,102,241,0.16); }
        .sp-tab.danger { color: #f87171; }
        .sp-tab.danger:hover { background: rgba(239,68,68,0.1); }
        .sp-tab.danger.active { background: rgba(239,68,68,0.14); color: #fca5a5; }

        /* ── Settings panel (right column) ── */
        .sp-panel { flex: 1; padding: 32px 40px; overflow-y: auto; }

        /* ── Section card ── */
        .sp-card { background: #0d1020; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 28px; margin-bottom: 20px; }
        .sp-card-title { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; color: #ffffff; margin-bottom: 4px; }
        .sp-card-sub { font-size: 12.5px; color: #8892b4; margin-bottom: 24px; line-height: 1.5; }
        .sp-divider { height: 1px; background: rgba(255,255,255,0.07); margin: 20px 0; }

        /* ── Form fields ── */
        .sp-field { display: flex; flex-direction: column; gap: 7px; margin-bottom: 18px; }
        .sp-label { font-size: 12px; font-weight: 600; color: #c8d3e8; letter-spacing: 0.4px; text-transform: uppercase; }
        .sp-input-wrap { position: relative; }
        .sp-input {
          width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; padding: 11px 14px; color: #f1f5f9; font-size: 13.5px;
          font-family: 'DM Sans', sans-serif; outline: none; transition: border-color 0.18s, background 0.18s;
        }
        .sp-input:focus { border-color: rgba(99,102,241,0.55); background: rgba(99,102,241,0.06); }
        .sp-input::placeholder { color: #4a5580; }
        .sp-input.has-icon { padding-right: 42px; }
        .sp-eye-btn { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: transparent; border: none; color: #4a5580; cursor: pointer; display: flex; align-items: center; transition: color 0.15s; }
        .sp-eye-btn:hover { color: #94a3c4; }

        /* ── Save button ── */
        .sp-save-btn { display: flex; align-items: center; gap: 7px; background: linear-gradient(135deg, #6366f1, #7c3aed); color: #ffffff; border: none; border-radius: 9px; padding: 10px 22px; font-size: 13.5px; font-weight: 600; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: opacity 0.15s; box-shadow: 0 4px 18px rgba(99,102,241,0.35); }
        .sp-save-btn:hover:not(:disabled) { opacity: 0.9; }
        .sp-save-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        /* ── Toggle switch ── */
        .sp-toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .sp-toggle-row:last-child { border-bottom: none; }
        .sp-toggle-info {}
        .sp-toggle-label { font-size: 13.5px; font-weight: 500; color: #e2e8f0; margin-bottom: 3px; }
        .sp-toggle-desc { font-size: 12px; color: #8892b4; }
        .sp-switch { position: relative; width: 40px; height: 22px; flex-shrink: 0; }
        .sp-switch input { opacity: 0; width: 0; height: 0; }
        .sp-switch-track { position: absolute; inset: 0; background: rgba(255,255,255,0.1); border-radius: 11px; cursor: pointer; transition: background 0.2s; border: 1px solid rgba(255,255,255,0.12); }
        .sp-switch input:checked + .sp-switch-track { background: #6366f1; border-color: #6366f1; }
        .sp-switch-track::after { content: ''; position: absolute; left: 3px; top: 50%; transform: translateY(-50%); width: 14px; height: 14px; background: #fff; border-radius: 50%; transition: transform 0.2s; }
        .sp-switch input:checked + .sp-switch-track::after { transform: translateY(-50%) translateX(18px); }

        /* ── Theme selector ── */
        .sp-theme-grid { display: flex; gap: 12px; flex-wrap: wrap; }
        .sp-theme-option { display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; }
        .sp-theme-preview { width: 80px; height: 52px; border-radius: 10px; border: 2px solid transparent; transition: border-color 0.18s; overflow: hidden; position: relative; }
        .sp-theme-preview.selected { border-color: #6366f1; }
        .sp-theme-name { font-size: 11.5px; font-weight: 500; color: #94a3c4; }
        .sp-theme-option.selected .sp-theme-name { color: #a5b4fc; }

        /* ── Accent color picker ── */
        .sp-accent-grid { display: flex; gap: 8px; flex-wrap: wrap; }
        .sp-accent-dot { width: 30px; height: 30px; border-radius: 8px; cursor: pointer; transition: transform 0.15s; position: relative; outline: none; }
        .sp-accent-dot:hover { transform: scale(1.1); }

        /* ── Danger zone ── */
        .sp-danger-card { background: rgba(239,68,68,0.05); border: 1px solid rgba(239,68,68,0.2); border-radius: 16px; padding: 28px; margin-bottom: 20px; }
        .sp-danger-title { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; color: #fca5a5; margin-bottom: 4px; }
        .sp-danger-sub { font-size: 12.5px; color: #f87171; opacity: 0.7; margin-bottom: 20px; }
        .sp-danger-btn { display: flex; align-items: center; gap: 7px; background: transparent; border: 1px solid rgba(239,68,68,0.4); color: #f87171; border-radius: 9px; padding: 10px 20px; font-size: 13.5px; font-weight: 600; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.18s; }
        .sp-danger-btn:hover { background: rgba(239,68,68,0.12); border-color: rgba(239,68,68,0.6); color: #fca5a5; }

        /* ── Bottom nav (mobile only) ── */
        .sp-bottom-nav { display: none; position: fixed; bottom: 0; left: 0; right: 0; height: 62px; background: #0d1020; border-top: 1px solid rgba(255,255,255,0.08); z-index: 95; align-items: center; justify-content: space-around; padding: 0 4px; }
        .sp-bottom-nav-item { display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 6px 12px; border-radius: 8px; color: #4a5580; font-size: 10px; font-weight: 600; text-decoration: none; transition: color 0.18s; letter-spacing: 0.3px; }
        .sp-bottom-nav-item.active { color: #818cf8; }
        .sp-bottom-nav-item:hover { color: #c8d3e8; }

        /* ── Tablet ── */
        @media (max-width: 1023px) and (min-width: 640px) {
          .sp-sidebar { width: 64px; }
          .sp-brand-text, .sp-brand-badge, .sp-section-label, .sp-nav-item-label, .sp-user-info, .sp-logout-btn-text { display: none; }
          .sp-brand { justify-content: center; padding: 20px 0; }
          .sp-nav { padding: 0 8px; }
          .sp-nav-item { justify-content: center; padding: 12px; gap: 0; }
          .sp-nav-item.active::before { display: none; }
          .sp-user-card { justify-content: center; padding: 10px; gap: 0; }
          .sp-logout-btn { padding: 10px; justify-content: center; }
          .sp-sidebar-bottom { padding: 12px 8px; }
          .sp-main { margin-left: 64px; }
          .sp-topbar { padding: 16px 24px; }
          .sp-tabs { width: 180px; min-width: 180px; }
          .sp-panel { padding: 24px; }
        }

        /* ── Mobile ── */
        @media (max-width: 639px) {
          .sp-sidebar { transform: translateX(-100%); width: 260px; box-shadow: 4px 0 40px rgba(0,0,0,0.7); }
          .sp-sidebar.mobile-open { transform: translateX(0); }
          .sp-mobile-topbar { display: flex !important; }
          .sp-topbar { display: none !important; }
          .sp-main { margin-left: 0; padding-bottom: 66px; }
          .sp-bottom-nav { display: flex !important; }
          .sp-content { flex-direction: column; }
          .sp-tabs { width: 100%; min-width: unset; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.08); padding: 12px; flex-direction: row; overflow-x: auto; gap: 4px; flex-wrap: nowrap; }
          .sp-tab { white-space: nowrap; flex-shrink: 0; }
          .sp-panel { padding: 16px; }
        }

        @media (max-width: 1280px) and (min-width: 1024px) {
          .sp-topbar { padding: 18px 32px; }
          .sp-panel { padding: 28px 32px; }
        }
      `}</style>

      <div className={`sp-overlay${sidebarOpen ? ' open' : ''}`} onClick={() => setSidebarOpen(false)} />

      <div className="sp-page">

        {/* ══ SIDEBAR ══ */}
        <aside className={`sp-sidebar${sidebarOpen ? ' mobile-open' : ''}`}>
          <div className="sp-brand">
            <Logo />
            <span className="sp-brand-text">ProjectSync</span>
            <span className="sp-brand-badge">Beta</span>
          </div>
          <div className="sp-section-label">Navigation</div>
          <nav className="sp-nav">
            {navLinks.map(({ to, icon, label }) => (
              <Link key={to} to={to} className={`sp-nav-item${location.pathname === to ? ' active' : ''}`}>
                {icon}
                <span className="sp-nav-item-label">{label}</span>
              </Link>
            ))}
          </nav>
          <div className="sp-sidebar-bottom">
            <div className="sp-user-card">
              <div className="sp-user-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
              <div className="sp-user-info">
                <div className="sp-user-name">{user?.name}</div>
                <div className="sp-user-email">{user?.email}</div>
              </div>
            </div>
            <button onClick={logout} className="sp-logout-btn">
              <Icons.LogOut />
              <span className="sp-logout-btn-text">Sign out</span>
            </button>
          </div>
        </aside>

        {/* ══ MAIN ══ */}
        <main className="sp-main">

          {/* Mobile Top Bar */}
          <div className="sp-mobile-topbar">
            <div className="sp-mobile-brand"><Logo /> ProjectSync</div>
            <button className="sp-hamburger" onClick={() => setSidebarOpen(true)}><Icons.Menu /></button>
          </div>

          {/* Desktop Top Bar */}
          <div className="sp-topbar">
            <div>
              <div className="sp-page-title">Settings</div>
              <div className="sp-page-sub">Manage your account preferences and security</div>
            </div>
          </div>

          {/* ── Two-column layout ── */}
          <div className="sp-content">

            {/* Left: Tab list */}
            <div className="sp-tabs">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  className={`sp-tab${activeTab === tab.id ? ' active' : ''}${tab.danger ? ' danger' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Right: Panel */}
            <div className="sp-panel">

              {/* ── APPEARANCE ── */}
              {activeTab === 'appearance' && (
                <>
                  <div className="sp-card">
                    <div className="sp-card-title">Theme</div>
                    <div className="sp-card-sub">Choose how ProjectSync looks for you</div>
                    <div className="sp-theme-grid">
                      {[
                        { id: 'dark', label: 'Dark', bg: '#080b14', bars: ['#1a1d2e','#2d3148'] },
                        { id: 'light', label: 'Light', bg: '#f8fafc', bars: ['#e2e8f0','#cbd5e1'] },
                        { id: 'system', label: 'System', bg: '#1a1d2e', bars: ['#080b14','#6366f1'] },
                      ].map(t => (
                        <div key={t.id} className={`sp-theme-option${theme === t.id ? ' selected' : ''}`} onClick={() => { setTheme(t.id); toast.success(`${t.label} theme applied`) }}>
                          <div className={`sp-theme-preview${theme === t.id ? ' selected' : ''}`} style={{ background: t.bg }}>
                            <div style={{ height: 12, background: t.bars[0], margin: '8px 8px 4px' , borderRadius: 3 }} />
                            <div style={{ height: 8, background: t.bars[1], margin: '0 8px', borderRadius: 3, width: '60%' }} />
                          </div>
                          <span className="sp-theme-name">{t.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="sp-card">
                    <div className="sp-card-title">Accent Color</div>
                    <div className="sp-card-sub">Personalize your interface color</div>
                    <div className="sp-accent-grid">
                      {accentColors.map(c => (
                        <div
                          key={c}
                          className="sp-accent-dot"
                          style={{ background: c, outline: accentColor === c ? `3px solid rgba(255,255,255,0.5)` : '3px solid transparent', outlineOffset: 2 }}
                          onClick={() => { setAccentColor(c); toast.success('Accent color updated') }}
                        >
                          {accentColor === c && (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                              <Icons.Check />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* ── SECURITY ── */}
              {activeTab === 'security' && (
                <div className="sp-card">
                  <div className="sp-card-title">Change Password</div>
                  <div className="sp-card-sub">Update your password to keep your account secure</div>
                  <form onSubmit={handlePasswordSave}>
                    {[
                      { key: 'current', label: 'CURRENT PASSWORD', placeholder: 'Enter current password' },
                      { key: 'newPass', label: 'NEW PASSWORD', placeholder: 'Min 6 characters' },
                      { key: 'confirm', label: 'CONFIRM NEW PASSWORD', placeholder: 'Repeat new password' },
                    ].map(({ key, label, placeholder }) => (
                      <div className="sp-field" key={key}>
                        <label className="sp-label">{label}</label>
                        <div className="sp-input-wrap">
                          <input
                            className="sp-input has-icon"
                            type={showPw[key] ? 'text' : 'password'}
                            value={passwords[key]}
                            onChange={e => setPasswords(prev => ({ ...prev, [key]: e.target.value }))}
                            placeholder={placeholder}
                            required
                          />
                          <button type="button" className="sp-eye-btn" onClick={() => setShowPw(prev => ({ ...prev, [key]: !prev[key] }))}>
                            {showPw[key] ? <Icons.EyeOff /> : <Icons.Eye />}
                          </button>
                        </div>
                      </div>
                    ))}
                    <button type="submit" className="sp-save-btn" disabled={savingPw}>
                      <Icons.Shield />
                      {savingPw ? 'Updating...' : 'Update Password'}
                    </button>
                  </form>
                </div>
              )}

              {/* ── NOTIFICATIONS ── */}
              {activeTab === 'notifications' && (
                <div className="sp-card">
                  <div className="sp-card-title">Notification Preferences</div>
                  <div className="sp-card-sub">Control which notifications you receive</div>
                  {[
                    { key: 'cardAssigned', label: 'Card assigned to you', desc: 'When someone assigns you to a task card' },
                    { key: 'commentAdded', label: 'New comment on your card', desc: 'When someone comments on a card you own' },
                    { key: 'cardMoved', label: 'Card moved', desc: 'When a card you are assigned to is moved' },
                    { key: 'memberAdded', label: 'New member added', desc: 'When someone joins your project' },
                    { key: 'emailDigest', label: 'Weekly email digest', desc: 'A summary of your project activity each week' },
                  ].map(({ key, label, desc }) => (
                    <div className="sp-toggle-row" key={key}>
                      <div className="sp-toggle-info">
                        <div className="sp-toggle-label">{label}</div>
                        <div className="sp-toggle-desc">{desc}</div>
                      </div>
                      <label className="sp-switch">
                        <input type="checkbox" checked={notifPrefs[key]} onChange={() => toggleNotif(key)} />
                        <span className="sp-switch-track" />
                      </label>
                    </div>
                  ))}
                  <div style={{ marginTop: 20 }}>
                    <button className="sp-save-btn" onClick={() => toast.success('Notification preferences saved!')}>
                      <Icons.Check /> Save Preferences
                    </button>
                  </div>
                </div>
              )}

              {/* ── INTEGRATIONS ── */}
              {activeTab === 'integrations' && (
                <div className="sp-card">
                  <div className="sp-card-title">Integrations</div>
                  <div className="sp-card-sub">Connect ProjectSync with your other tools</div>
                  {[
                    { name: 'GitHub', desc: 'Link pull requests and issues to cards', color: '#e2e8f0', coming: false },
                    { name: 'Slack', desc: 'Get notifications in your Slack channels', color: '#4ade80', coming: true },
                    { name: 'Figma', desc: 'Attach Figma designs directly to cards', color: '#818cf8', coming: true },
                    { name: 'Jira', desc: 'Sync tasks with your Jira board', color: '#60a5fa', coming: true },
                  ].map(({ name, desc, color, coming }) => (
                    <div key={name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{ width: 38, height: 38, borderRadius: 10, background: `${color}18`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, flexShrink: 0 }}>
                          <Icons.Link />
                        </div>
                        <div>
                          <div style={{ fontSize: 13.5, fontWeight: 600, color: '#e2e8f0', marginBottom: 3 }}>{name}</div>
                          <div style={{ fontSize: 12, color: '#8892b4' }}>{desc}</div>
                        </div>
                      </div>
                      {coming ? (
                        <span style={{ fontSize: 11, fontWeight: 600, color: '#8892b4', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, padding: '3px 10px' }}>Coming soon</span>
                      ) : (
                        <button className="sp-save-btn" style={{ padding: '7px 16px', fontSize: 12.5 }} onClick={() => toast.success(`${name} connected!`)}>Connect</button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* ── DANGER ZONE ── */}
              {activeTab === 'danger' && (
                <>
                  <div className="sp-danger-card">
                    <div className="sp-danger-title">Delete Account</div>
                    <div className="sp-danger-sub">Once deleted, your account and all data cannot be recovered.</div>
                    <div className="sp-field">
                      <label className="sp-label" style={{ color: '#f87171' }}>TYPE "DELETE" TO CONFIRM</label>
                      <input
                        className="sp-input"
                        style={{ borderColor: 'rgba(239,68,68,0.3)' }}
                        value={deleteConfirm}
                        onChange={e => setDeleteConfirm(e.target.value)}
                        placeholder='Type DELETE to confirm'
                      />
                    </div>
                    <button
                      className="sp-danger-btn"
                      disabled={deleteConfirm !== 'DELETE'}
                      style={{ opacity: deleteConfirm !== 'DELETE' ? 0.4 : 1 }}
                      onClick={() => toast.error('Account deletion is disabled in demo mode')}
                    >
                      <Icons.Trash /> Delete My Account
                    </button>
                  </div>

                  <div className="sp-danger-card">
                    <div className="sp-danger-title">Sign Out Everywhere</div>
                    <div className="sp-danger-sub">Log out of all devices and sessions immediately.</div>
                    <button className="sp-danger-btn" onClick={() => { logout(); toast.success('Signed out everywhere') }}>
                      <Icons.LogOut /> Sign Out All Sessions
                    </button>
                  </div>
                </>
              )}

            </div>
          </div>
        </main>

        {/* ══ BOTTOM NAV (mobile) ══ */}
        <nav className="sp-bottom-nav">
          {navLinks.map(({ to, icon, label }) => (
            <Link key={to} to={to} className={`sp-bottom-nav-item${location.pathname === to ? ' active' : ''}`}>
              {icon}{label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}