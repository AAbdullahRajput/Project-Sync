import { useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import api from '../services/api'
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
  Camera: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  ),
  Lock: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Eye: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  EyeOff: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  ),
  Check: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Shield: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Globe: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  Trash: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
      <path d="M10 11v6"/>
      <path d="M14 11v6"/>
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
  ),
  Download: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  Bell2: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  Activity: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  Link: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  ),
  Twitter: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
    </svg>
  ),
  Github: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  ),
  Linkedin: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  AlertTriangle: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
}

// ─── Logo Component ───────────────────────────────────────────────────────────
const Logo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="8" fill="url(#logoGradP)"/>
    <path d="M8 14h12M14 8v12" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="14" cy="14" r="3" fill="white" fillOpacity="0.25"/>
    <defs>
      <linearGradient id="logoGradP" x1="0" y1="0" x2="28" y2="28">
        <stop stopColor="#6366f1"/>
        <stop offset="1" stopColor="#8b5cf6"/>
      </linearGradient>
    </defs>
  </svg>
)

// ─── Tab definitions ──────────────────────────────────────────────────────────
const TABS = [
  { id: 'general', label: 'General', icon: <Icons.User /> },
  { id: 'security', label: 'Security', icon: <Icons.Shield /> },
  { id: 'notifications', label: 'Notifications', icon: <Icons.Bell2 /> },
  { id: 'integrations', label: 'Integrations', icon: <Icons.Link /> },
  { id: 'danger', label: 'Danger Zone', icon: <Icons.AlertTriangle /> },
]

const TIMEZONES = [
  'UTC', 'America/New_York', 'America/Chicago', 'America/Denver',
  'America/Los_Angeles', 'Europe/London', 'Europe/Paris', 'Europe/Berlin',
  'Asia/Karachi', 'Asia/Kolkata', 'Asia/Tokyo', 'Asia/Shanghai',
  'Australia/Sydney', 'Pacific/Auckland',
]

const LANGUAGES = ['English', 'French', 'German', 'Spanish', 'Portuguese', 'Arabic', 'Urdu', 'Japanese', 'Chinese']

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ProfilePage() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const fileInputRef = useRef(null)

  const [activeTab, setActiveTab] = useState('general')
  const [savingGeneral, setSavingGeneral] = useState(false)
  const [savingSecurity, setSavingSecurity] = useState(false)

  // General form
  const [general, setGeneral] = useState({
    name: user?.name || '',
    username: user?.username || '',
    bio: user?.bio || '',
    location: user?.location || '',
    website: user?.website || '',
    twitter: user?.twitter || '',
    github: user?.github || '',
    linkedin: user?.linkedin || '',
    timezone: user?.timezone || 'UTC',
    language: user?.language || 'English',
  })

  // Security form
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [showPw, setShowPw] = useState({ current: false, new: false, confirm: false })
  const [twoFAEnabled, setTwoFAEnabled] = useState(user?.twoFA || false)
  const [sessionTimeout, setSessionTimeout] = useState(user?.sessionTimeout || '30')

  // Notification prefs
  const [notifPrefs, setNotifPrefs] = useState({
    projectUpdates: true,
    memberActivity: true,
    weeklyDigest: false,
    securityAlerts: true,
    marketing: false,
    browserPush: false,
  })

  // Danger zone
  const [deleteConfirm, setDeleteConfirm] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const navLinks = [
    { to: '/dashboard', icon: <Icons.Dashboard />, label: 'Dashboard' },
    { to: '/notifications', icon: <Icons.Bell />, label: 'Notifications' },
    { to: '/profile', icon: <Icons.User />, label: 'Profile' },
    { to: '/settings', icon: <Icons.Settings />, label: 'Settings' },
  ]

  const handleSaveGeneral = async (e) => {
    e.preventDefault()
    setSavingGeneral(true)
    try {
      await api.put('/auth/profile', general)
      toast.success('Profile updated successfully')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed')
    } finally {
      setSavingGeneral(false)
    }
  }

  const handleSaveSecurity = async (e) => {
    e.preventDefault()
    if (security.newPassword !== security.confirmPassword) {
      toast.error('New passwords do not match')
      return
    }
    if (security.newPassword && security.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }
    setSavingSecurity(true)
    try {
      await api.put('/auth/password', {
        currentPassword: security.currentPassword,
        newPassword: security.newPassword,
      })
      toast.success('Password updated successfully')
      setSecurity({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password update failed')
    } finally {
      setSavingSecurity(false)
    }
  }

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) { toast.error('Please select an image file'); return }
    if (file.size > 5 * 1024 * 1024) { toast.error('Image must be under 5MB'); return }
    const formData = new FormData()
    formData.append('avatar', file)
    try {
      await api.post('/auth/avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      toast.success('Avatar updated!')
    } catch {
      toast.error('Failed to upload avatar')
    }
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== user?.email) { toast.error('Email does not match'); return }
    try {
      await api.delete('/auth/account')
      logout()
    } catch {
      toast.error('Failed to delete account')
    }
  }

  const handleExportData = async () => {
    try {
      const res = await api.get('/auth/export', { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const a = document.createElement('a')
      a.href = url
      a.download = 'my-data.json'
      a.click()
      toast.success('Data exported!')
    } catch {
      toast.error('Export failed')
    }
  }

  const pwStrength = (() => {
    const pw = security.newPassword
    if (!pw) return null
    let score = 0
    if (pw.length >= 8) score++
    if (pw.length >= 12) score++
    if (/[A-Z]/.test(pw)) score++
    if (/[0-9]/.test(pw)) score++
    if (/[^A-Za-z0-9]/.test(pw)) score++
    if (score <= 2) return { label: 'Weak', color: '#ef4444', width: '33%' }
    if (score <= 3) return { label: 'Fair', color: '#f59e0b', width: '60%' }
    return { label: 'Strong', color: '#22c55e', width: '100%' }
  })()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #080b14; color: #e2e8f0; }

        .profile-page {
          display: flex;
          min-height: 100vh;
          background: #080b14;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Sidebar (identical to Dashboard) ── */
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
          overflow-y: auto;
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

        .nav-item:hover { color: #e2e8f0; background: rgba(255,255,255,0.07); }

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

        .user-avatar-sm {
          width: 34px; height: 34px;
          border-radius: 10px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 14px; font-weight: 700; color: #fff;
          flex-shrink: 0;
        }

        .user-info { overflow: hidden; flex: 1; min-width: 0; }
        .user-name { font-size: 13px; font-weight: 600; color: #f1f5f9; line-height: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .user-email { font-size: 11px; color: #8892b4; margin-top: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .logout-btn {
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 7px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: #94a3c4;
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 13px; font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.18s;
        }
        .logout-btn:hover { border-color: rgba(239,68,68,0.4); color: #fca5a5; background: rgba(239,68,68,0.08); }

        /* ── Main ── */
        .main {
          margin-left: 248px;
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          min-width: 0;
        }

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
          flex-shrink: 0;
        }

        .page-title {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.4px;
          line-height: 1;
        }

        .page-sub { font-size: 12.5px; color: #8892b4; margin-top: 5px; }

        /* ── Content ── */
        .content {
          padding: 36px 40px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 28px;
          max-width: 960px;
          width: 100%;
        }

        /* ── Profile Hero Card ── */
        .profile-hero {
          background: #0d1020;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          overflow: hidden;
          position: relative;
        }

        .hero-banner {
          height: 100px;
          background: linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 100%);
          position: relative;
        }

        .hero-banner::after {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        .hero-body {
          padding: 0 28px 24px;
          display: flex;
          align-items: flex-end;
          gap: 20px;
        }

        .avatar-wrap {
          margin-top: -40px;
          position: relative;
          flex-shrink: 0;
        }

        .avatar-circle {
          width: 80px; height: 80px;
          border-radius: 20px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: 3px solid #0d1020;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 30px; font-weight: 800; color: #fff;
          position: relative;
          overflow: hidden;
        }

        .avatar-circle img {
          width: 100%; height: 100%;
          object-fit: cover;
          border-radius: 17px;
        }

        .avatar-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.55);
          display: flex; align-items: center; justify-content: center;
          opacity: 0;
          transition: opacity 0.2s;
          cursor: pointer;
          border-radius: 17px;
          color: white;
        }

        .avatar-wrap:hover .avatar-overlay { opacity: 1; }

        .hero-info { flex: 1; min-width: 0; padding-top: 12px; }

        .hero-name {
          font-family: 'Syne', sans-serif;
          font-size: 20px; font-weight: 700;
          color: #ffffff; letter-spacing: -0.3px;
        }

        .hero-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 5px;
          flex-wrap: wrap;
        }

        .hero-meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          color: #8892b4;
        }

        .hero-badge {
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #a5b4fc;
          background: rgba(99,102,241,0.18);
          border: 1px solid rgba(99,102,241,0.3);
          border-radius: 20px;
          padding: 3px 10px;
          margin-top: 6px;
          display: inline-block;
        }

        /* ── Tab Navigation ── */
        .tab-nav {
          display: flex;
          gap: 2px;
          background: #0d1020;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 6px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .tab-nav::-webkit-scrollbar { display: none; }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 9px 16px;
          border-radius: 9px;
          border: none;
          background: transparent;
          color: #8892b4;
          font-size: 13px; font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.18s;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .tab-btn:hover { color: #e2e8f0; background: rgba(255,255,255,0.06); }
        .tab-btn.active { color: #ffffff; background: rgba(99,102,241,0.2); }
        .tab-btn.danger-tab { color: #f87171; }
        .tab-btn.danger-tab:hover { background: rgba(239,68,68,0.1); }
        .tab-btn.danger-tab.active { background: rgba(239,68,68,0.15); color: #fca5a5; }

        /* ── Section Card ── */
        .section-card {
          background: #0d1020;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          overflow: hidden;
        }

        .section-head {
          padding: 20px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: 14px; font-weight: 700;
          color: #e2e8f0;
          display: flex; align-items: center; gap: 8px;
        }

        .section-sub {
          font-size: 12px; color: #8892b4; margin-top: 2px;
        }

        .section-body { padding: 24px; }

        /* ── Form Grid ── */
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .form-full { grid-column: 1 / -1; }

        .field { display: flex; flex-direction: column; gap: 7px; }

        .label {
          font-size: 11.5px; font-weight: 600;
          color: #c8d3e8; letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .input, .textarea, .select {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 10px 14px;
          color: #f1f5f9;
          font-size: 13.5px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.18s, background 0.18s;
          width: 100%;
        }
        .input:focus, .textarea:focus, .select:focus {
          border-color: rgba(99,102,241,0.55);
          background: rgba(99,102,241,0.05);
        }
        .input::placeholder, .textarea::placeholder { color: #4a5580; }
        .textarea { resize: vertical; min-height: 90px; line-height: 1.6; }
        .select { cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238892b4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 38px; }
        .select option { background: #0d1020; color: #f1f5f9; }

        /* Input with icon */
        .input-wrap { position: relative; }
        .input-icon {
          position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
          color: #4a5580; pointer-events: none;
          display: flex; align-items: center;
        }
        .input-icon-right {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          color: #4a5580; cursor: pointer;
          display: flex; align-items: center;
          transition: color 0.15s;
        }
        .input-icon-right:hover { color: #94a3c4; }
        .input.has-left-icon { padding-left: 38px; }
        .input.has-right-icon { padding-right: 38px; }

        /* Password strength */
        .pw-strength-bar {
          height: 3px; border-radius: 2px;
          background: rgba(255,255,255,0.08);
          margin-top: 6px; overflow: hidden;
        }
        .pw-strength-fill { height: 100%; border-radius: 2px; transition: width 0.3s, background 0.3s; }
        .pw-strength-label { font-size: 11px; color: #8892b4; margin-top: 4px; }

        /* ── Char counter ── */
        .char-counter { font-size: 11px; color: #4a5580; text-align: right; margin-top: 3px; }

        /* ── Toggle Switch ── */
        .toggle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .toggle-row:last-child { border-bottom: none; padding-bottom: 0; }
        .toggle-info { flex: 1; min-width: 0; padding-right: 20px; }
        .toggle-label { font-size: 13.5px; font-weight: 500; color: #e2e8f0; }
        .toggle-desc { font-size: 12px; color: #8892b4; margin-top: 2px; line-height: 1.5; }

        .toggle {
          position: relative;
          width: 42px; height: 24px;
          flex-shrink: 0;
        }
        .toggle input { opacity: 0; width: 0; height: 0; }
        .toggle-slider {
          position: absolute; inset: 0;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 24px;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }
        .toggle-slider::before {
          content: '';
          position: absolute;
          width: 18px; height: 18px;
          left: 2px; top: 2px;
          background: #fff;
          border-radius: 50%;
          transition: transform 0.2s;
          box-shadow: 0 1px 4px rgba(0,0,0,0.4);
        }
        .toggle input:checked ~ .toggle-slider {
          background: #6366f1;
          border-color: #6366f1;
        }
        .toggle input:checked ~ .toggle-slider::before { transform: translateX(18px); }

        /* ── Session timeout select ── */
        .session-select {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 6px 30px 6px 12px;
          color: #f1f5f9;
          font-size: 12.5px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%238892b4' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
        }
        .session-select option { background: #0d1020; }

        /* ── Integration card ── */
        .integration-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .integration-item:last-child { border-bottom: none; padding-bottom: 0; }
        .integration-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .integration-info { flex: 1; min-width: 0; }
        .integration-name { font-size: 13.5px; font-weight: 600; color: #e2e8f0; }
        .integration-desc { font-size: 12px; color: #8892b4; margin-top: 2px; }
        .integration-status {
          font-size: 11px; font-weight: 600;
          padding: 3px 9px; border-radius: 20px;
          flex-shrink: 0;
        }
        .status-connected { color: #4ade80; background: rgba(34,197,94,0.12); }
        .status-not { color: #8892b4; background: rgba(255,255,255,0.06); }

        /* ── Action row ── */
        .action-row {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.07);
          margin-top: 4px;
        }

        .btn-primary {
          display: flex; align-items: center; gap: 7px;
          background: linear-gradient(135deg, #6366f1, #7c3aed);
          color: #fff; border: none;
          border-radius: 9px;
          padding: 10px 22px;
          font-size: 13.5px; font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: opacity 0.15s, transform 0.15s;
          box-shadow: 0 4px 18px rgba(99,102,241,0.35);
        }
        .btn-primary:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

        .btn-secondary {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.12);
          color: #94a3c4;
          border-radius: 9px;
          padding: 10px 18px;
          font-size: 13.5px; font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-secondary:hover { border-color: rgba(255,255,255,0.22); color: #e2e8f0; }

        .btn-danger {
          display: flex; align-items: center; gap: 7px;
          background: transparent;
          border: 1px solid rgba(239,68,68,0.35);
          color: #f87171;
          border-radius: 9px;
          padding: 10px 18px;
          font-size: 13.5px; font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-danger:hover { background: rgba(239,68,68,0.1); border-color: rgba(239,68,68,0.6); }

        .btn-outline {
          display: flex; align-items: center; gap: 7px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.12);
          color: #94a3c4;
          border-radius: 9px;
          padding: 9px 16px;
          font-size: 13px; font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-outline:hover { border-color: rgba(255,255,255,0.22); color: #e2e8f0; }

        /* ── Danger zone section ── */
        .danger-item {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          padding: 20px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .danger-item:last-child { border-bottom: none; padding-bottom: 0; }
        .danger-item-title { font-size: 14px; font-weight: 600; color: #e2e8f0; }
        .danger-item-desc { font-size: 12.5px; color: #8892b4; margin-top: 4px; line-height: 1.5; }

        /* ── Delete Modal ── */
        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000;
          padding: 16px;
          animation: fadeIn 0.15s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }

        .delete-modal {
          background: #0d1020;
          border: 1px solid rgba(239,68,68,0.25);
          border-radius: 18px;
          padding: 28px;
          width: 100%;
          max-width: 420px;
          animation: slideUp 0.2s ease;
          box-shadow: 0 40px 80px rgba(0,0,0,0.7);
        }

        .delete-modal-icon {
          width: 48px; height: 48px;
          border-radius: 14px;
          background: rgba(239,68,68,0.12);
          border: 1px solid rgba(239,68,68,0.25);
          display: flex; align-items: center; justify-content: center;
          color: #f87171;
          margin-bottom: 16px;
        }

        .delete-modal-title {
          font-family: 'Syne', sans-serif;
          font-size: 18px; font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 8px;
        }

        .delete-modal-desc {
          font-size: 13px; color: #8892b4; line-height: 1.6;
          margin-bottom: 20px;
        }

        .delete-modal-confirm-label {
          font-size: 12px; font-weight: 600; color: #c8d3e8;
          letter-spacing: 0.4px; text-transform: uppercase;
          margin-bottom: 7px;
        }

        .delete-modal-actions {
          display: flex; gap: 10px;
          margin-top: 20px;
        }

        .btn-delete {
          flex: 1;
          background: #ef4444; color: #fff; border: none;
          border-radius: 9px; padding: 11px;
          font-size: 13.5px; font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: opacity 0.15s;
        }
        .btn-delete:hover:not(:disabled) { opacity: 0.9; }
        .btn-delete:disabled { opacity: 0.4; cursor: not-allowed; }

        /* ── Responsive ── */
        @media (max-width: 1023px) and (min-width: 640px) {
          .sidebar { width: 64px; }
          .sidebar-brand-text, .sidebar-brand-badge, .sidebar-section-label, .nav-item-label, .user-info, .logout-btn-text { display: none; }
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
          .form-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 639px) {
          .sidebar { display: none; }
          .main { margin-left: 0; }
          .content { padding: 16px; }
          .topbar { padding: 14px 16px; }
          .form-grid { grid-template-columns: 1fr; }
          .hero-body { flex-direction: column; align-items: flex-start; gap: 12px; }
          .action-row { flex-direction: column-reverse; }
          .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
          .danger-item { flex-direction: column; gap: 12px; }
          .tab-nav { gap: 1px; }
          .tab-btn { padding: 8px 12px; font-size: 12px; }
        }
      `}</style>

      <div className="profile-page">
        {/* ══ SIDEBAR ══ */}
        <aside className="sidebar">
          <div className="sidebar-brand">
            <Logo />
            <span className="sidebar-brand-text">ProjectSync</span>
            <span className="sidebar-brand-badge">Beta</span>
          </div>
          <div className="sidebar-section-label">Navigation</div>
          <nav className="nav">
            {navLinks.map(({ to, icon, label }) => (
              <Link key={to} to={to} className={`nav-item${location.pathname === to ? ' active' : ''}`}>
                {icon}
                <span className="nav-item-label">{label}</span>
              </Link>
            ))}
          </nav>
          <div className="sidebar-bottom">
            <div className="user-card">
              <div className="user-avatar-sm">{user?.name?.charAt(0).toUpperCase()}</div>
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
          <div className="topbar">
            <div>
              <div className="page-title">Profile</div>
              <div className="page-sub">Manage your personal information and preferences</div>
            </div>
          </div>

          <div className="content">
            {/* ── Profile Hero ── */}
            <div className="profile-hero">
              <div className="hero-banner" />
              <div className="hero-body">
                <div className="avatar-wrap">
                  <div className="avatar-circle">
                    {user?.avatarUrl
                      ? <img src={user.avatarUrl} alt="avatar" />
                      : user?.name?.charAt(0).toUpperCase()
                    }
                    <div className="avatar-overlay" onClick={() => fileInputRef.current?.click()}>
                      <Icons.Camera />
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleAvatarChange}
                  />
                </div>
                <div className="hero-info">
                  <div className="hero-name">{user?.name || 'Your Name'}</div>
                  <div className="hero-meta">
                    {user?.email && (
                      <div className="hero-meta-item">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                        </svg>
                        {user.email}
                      </div>
                    )}
                    {general.location && (
                      <div className="hero-meta-item">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                        {general.location}
                      </div>
                    )}
                    {general.website && (
                      <div className="hero-meta-item">
                        <Icons.Globe />
                        {general.website.replace(/^https?:\/\//, '')}
                      </div>
                    )}
                  </div>
                  <div className="hero-badge">Member</div>
                </div>
              </div>
            </div>

            {/* ── Tab Navigation ── */}
            <div className="tab-nav">
              {TABS.map(t => (
                <button
                  key={t.id}
                  className={`tab-btn${t.id === 'danger' ? ' danger-tab' : ''}${activeTab === t.id ? ' active' : ''}`}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.icon}
                  {t.label}
                </button>
              ))}
            </div>

            {/* ══ GENERAL TAB ══ */}
            {activeTab === 'general' && (
              <>
                {/* Basic info */}
                <div className="section-card">
                  <div className="section-head">
                    <div>
                      <div className="section-title">
                        <Icons.User />
                        Basic Information
                      </div>
                      <div className="section-sub">Your public-facing profile details</div>
                    </div>
                  </div>
                  <div className="section-body">
                    <form onSubmit={handleSaveGeneral}>
                      <div className="form-grid">
                        <div className="field">
                          <label className="label">Full Name</label>
                          <input
                            className="input"
                            value={general.name}
                            onChange={e => setGeneral({ ...general, name: e.target.value })}
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="field">
                          <label className="label">Username</label>
                          <div className="input-wrap">
                            <span className="input-icon" style={{ left: 14, color: '#4a5580', fontSize: 13 }}>@</span>
                            <input
                              className="input has-left-icon"
                              value={general.username}
                              onChange={e => setGeneral({ ...general, username: e.target.value })}
                              placeholder="johndoe"
                            />
                          </div>
                        </div>
                        <div className="field form-full">
                          <label className="label">Bio</label>
                          <textarea
                            className="textarea"
                            value={general.bio}
                            maxLength={160}
                            onChange={e => setGeneral({ ...general, bio: e.target.value })}
                            placeholder="Tell your team a little about yourself..."
                          />
                          <div className="char-counter">{general.bio.length}/160</div>
                        </div>
                        <div className="field">
                          <label className="label">Location</label>
                          <div className="input-wrap">
                            <span className="input-icon">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            </span>
                            <input
                              className="input has-left-icon"
                              value={general.location}
                              onChange={e => setGeneral({ ...general, location: e.target.value })}
                              placeholder="Karachi, Pakistan"
                            />
                          </div>
                        </div>
                        <div className="field">
                          <label className="label">Website</label>
                          <div className="input-wrap">
                            <span className="input-icon"><Icons.Globe /></span>
                            <input
                              className="input has-left-icon"
                              value={general.website}
                              onChange={e => setGeneral({ ...general, website: e.target.value })}
                              placeholder="https://yoursite.com"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="action-row">
                        <button type="submit" className="btn-primary" disabled={savingGeneral}>
                          {savingGeneral
                            ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Saving...</>
                            : <><Icons.Check />Save Changes</>
                          }
                        </button>
                      </div>
                    </form>
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                  </div>
                </div>

                {/* Social links */}
                <div className="section-card">
                  <div className="section-head">
                    <div>
                      <div className="section-title"><Icons.Link />Social Links</div>
                      <div className="section-sub">Connect your social profiles</div>
                    </div>
                  </div>
                  <div className="section-body">
                    <div className="form-grid">
                      <div className="field">
                        <label className="label">Twitter / X</label>
                        <div className="input-wrap">
                          <span className="input-icon"><Icons.Twitter /></span>
                          <input
                            className="input has-left-icon"
                            value={general.twitter}
                            onChange={e => setGeneral({ ...general, twitter: e.target.value })}
                            placeholder="@handle"
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">GitHub</label>
                        <div className="input-wrap">
                          <span className="input-icon"><Icons.Github /></span>
                          <input
                            className="input has-left-icon"
                            value={general.github}
                            onChange={e => setGeneral({ ...general, github: e.target.value })}
                            placeholder="username"
                          />
                        </div>
                      </div>
                      <div className="field form-full">
                        <label className="label">LinkedIn</label>
                        <div className="input-wrap">
                          <span className="input-icon"><Icons.Linkedin /></span>
                          <input
                            className="input has-left-icon"
                            value={general.linkedin}
                            onChange={e => setGeneral({ ...general, linkedin: e.target.value })}
                            placeholder="linkedin.com/in/yourprofile"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="action-row">
                      <button className="btn-primary" onClick={handleSaveGeneral} disabled={savingGeneral}>
                        <Icons.Check />Save Links
                      </button>
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div className="section-card">
                  <div className="section-head">
                    <div>
                      <div className="section-title"><Icons.Settings />Preferences</div>
                      <div className="section-sub">Language and regional settings</div>
                    </div>
                  </div>
                  <div className="section-body">
                    <div className="form-grid">
                      <div className="field">
                        <label className="label">Language</label>
                        <select
                          className="select"
                          value={general.language}
                          onChange={e => setGeneral({ ...general, language: e.target.value })}
                        >
                          {LANGUAGES.map(l => <option key={l}>{l}</option>)}
                        </select>
                      </div>
                      <div className="field">
                        <label className="label">Timezone</label>
                        <select
                          className="select"
                          value={general.timezone}
                          onChange={e => setGeneral({ ...general, timezone: e.target.value })}
                        >
                          {TIMEZONES.map(tz => <option key={tz}>{tz}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="action-row">
                      <button className="btn-primary" onClick={handleSaveGeneral} disabled={savingGeneral}>
                        <Icons.Check />Save Preferences
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ══ SECURITY TAB ══ */}
            {activeTab === 'security' && (
              <>
                <div className="section-card">
                  <div className="section-head">
                    <div>
                      <div className="section-title"><Icons.Lock />Change Password</div>
                      <div className="section-sub">Use a strong, unique password for this account</div>
                    </div>
                  </div>
                  <div className="section-body">
                    <form onSubmit={handleSaveSecurity}>
                      <div className="form-grid">
                        <div className="field form-full">
                          <label className="label">Current Password</label>
                          <div className="input-wrap">
                            <span className="input-icon"><Icons.Lock /></span>
                            <input
                              type={showPw.current ? 'text' : 'password'}
                              className="input has-left-icon has-right-icon"
                              value={security.currentPassword}
                              onChange={e => setSecurity({ ...security, currentPassword: e.target.value })}
                              placeholder="Enter current password"
                            />
                            <span className="input-icon-right" onClick={() => setShowPw(p => ({ ...p, current: !p.current }))}>
                              {showPw.current ? <Icons.EyeOff /> : <Icons.Eye />}
                            </span>
                          </div>
                        </div>
                        <div className="field">
                          <label className="label">New Password</label>
                          <div className="input-wrap">
                            <span className="input-icon"><Icons.Lock /></span>
                            <input
                              type={showPw.new ? 'text' : 'password'}
                              className="input has-left-icon has-right-icon"
                              value={security.newPassword}
                              onChange={e => setSecurity({ ...security, newPassword: e.target.value })}
                              placeholder="At least 8 characters"
                            />
                            <span className="input-icon-right" onClick={() => setShowPw(p => ({ ...p, new: !p.new }))}>
                              {showPw.new ? <Icons.EyeOff /> : <Icons.Eye />}
                            </span>
                          </div>
                          {security.newPassword && pwStrength && (
                            <>
                              <div className="pw-strength-bar">
                                <div className="pw-strength-fill" style={{ width: pwStrength.width, background: pwStrength.color }} />
                              </div>
                              <div className="pw-strength-label" style={{ color: pwStrength.color }}>{pwStrength.label} password</div>
                            </>
                          )}
                        </div>
                        <div className="field">
                          <label className="label">Confirm New Password</label>
                          <div className="input-wrap">
                            <span className="input-icon"><Icons.Lock /></span>
                            <input
                              type={showPw.confirm ? 'text' : 'password'}
                              className="input has-left-icon has-right-icon"
                              value={security.confirmPassword}
                              onChange={e => setSecurity({ ...security, confirmPassword: e.target.value })}
                              placeholder="Repeat new password"
                            />
                            <span className="input-icon-right" onClick={() => setShowPw(p => ({ ...p, confirm: !p.confirm }))}>
                              {showPw.confirm ? <Icons.EyeOff /> : <Icons.Eye />}
                            </span>
                          </div>
                          {security.confirmPassword && security.newPassword !== security.confirmPassword && (
                            <div style={{ fontSize: 11, color: '#f87171', marginTop: 4 }}>Passwords do not match</div>
                          )}
                        </div>
                      </div>
                      <div className="action-row">
                        <button type="submit" className="btn-primary" disabled={savingSecurity || !security.currentPassword || !security.newPassword}>
                          {savingSecurity ? 'Updating...' : 'Update Password'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* 2FA & Session */}
                <div className="section-card">
                  <div className="section-head">
                    <div>
                      <div className="section-title"><Icons.Shield />Security Settings</div>
                      <div className="section-sub">Advanced account protection options</div>
                    </div>
                  </div>
                  <div className="section-body">
                    <div className="toggle-row">
                      <div className="toggle-info">
                        <div className="toggle-label">Two-Factor Authentication</div>
                        <div className="toggle-desc">Add an extra layer of security by requiring a verification code on login.</div>
                      </div>
                      <label className="toggle">
                        <input type="checkbox" checked={twoFAEnabled} onChange={e => {
                          setTwoFAEnabled(e.target.checked)
                          toast.success(e.target.checked ? '2FA enabled' : '2FA disabled')
                        }} />
                        <span className="toggle-slider" />
                      </label>
                    </div>
                    <div className="toggle-row">
                      <div className="toggle-info">
                        <div className="toggle-label">Session Timeout</div>
                        <div className="toggle-desc">Automatically sign out after a period of inactivity.</div>
                      </div>
                      <select
                        className="session-select"
                        value={sessionTimeout}
                        onChange={e => setSessionTimeout(e.target.value)}
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="240">4 hours</option>
                        <option value="0">Never</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ══ NOTIFICATIONS TAB ══ */}
            {activeTab === 'notifications' && (
              <div className="section-card">
                <div className="section-head">
                  <div>
                    <div className="section-title"><Icons.Bell2 />Notification Preferences</div>
                    <div className="section-sub">Choose what you want to be notified about</div>
                  </div>
                </div>
                <div className="section-body">
                  {[
                    { key: 'projectUpdates', label: 'Project Updates', desc: 'Get notified when a project you belong to is updated or has new activity.' },
                    { key: 'memberActivity', label: 'Member Activity', desc: 'Receive notifications when teammates join, leave, or are added to projects.' },
                    { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'A summary email of your project activity sent every Monday morning.' },
                    { key: 'securityAlerts', label: 'Security Alerts', desc: 'Important notifications about your account security, logins, and changes.' },
                    { key: 'marketing', label: 'Product Updates & News', desc: 'Occasional emails about new features, tips, and product announcements.' },
                    { key: 'browserPush', label: 'Browser Push Notifications', desc: 'Real-time notifications in your browser even when ProjectSync is not open.' },
                  ].map(({ key, label, desc }) => (
                    <div className="toggle-row" key={key}>
                      <div className="toggle-info">
                        <div className="toggle-label">{label}</div>
                        <div className="toggle-desc">{desc}</div>
                      </div>
                      <label className="toggle">
                        <input
                          type="checkbox"
                          checked={notifPrefs[key]}
                          onChange={e => setNotifPrefs(p => ({ ...p, [key]: e.target.checked }))}
                        />
                        <span className="toggle-slider" />
                      </label>
                    </div>
                  ))}
                  <div className="action-row">
                    <button
                      className="btn-primary"
                      onClick={() => toast.success('Notification preferences saved')}
                    >
                      <Icons.Check />Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ══ INTEGRATIONS TAB ══ */}
            {activeTab === 'integrations' && (
              <div className="section-card">
                <div className="section-head">
                  <div>
                    <div className="section-title"><Icons.Link />Connected Integrations</div>
                    <div className="section-sub">Manage third-party apps connected to your account</div>
                  </div>
                </div>
                <div className="section-body">
                  {[
                    {
                      name: 'GitHub', desc: 'Link pull requests and commits to project tasks.',
                      icon: <Icons.Github />, iconBg: 'rgba(255,255,255,0.06)', connected: false,
                    },
                    {
                      name: 'Slack', desc: 'Get project updates and notifications in Slack.',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e01e5a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/>
                          <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                          <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/>
                          <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/>
                          <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/>
                          <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/>
                          <path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/>
                          <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/>
                        </svg>
                      ),
                      iconBg: 'rgba(224,30,90,0.1)', connected: true,
                    },
                    {
                      name: 'Google Drive', desc: 'Attach and share Drive files within your projects.',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4285f4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 15l5-9 5 9H3z"/><path d="M14 15l-5-9h10l-5 9z"/><path d="M8 15l3 5h5l3-5H8z"/>
                        </svg>
                      ),
                      iconBg: 'rgba(66,133,244,0.1)', connected: false,
                    },
                    {
                      name: 'Figma', desc: 'Embed design files and prototypes directly in tasks.',
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a259ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/>
                          <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/>
                          <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                          <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 0 1-7 0z"/>
                          <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/>
                        </svg>
                      ),
                      iconBg: 'rgba(162,89,255,0.1)', connected: true,
                    },
                  ].map(({ name, desc, icon, iconBg, connected }) => (
                    <div className="integration-item" key={name}>
                      <div className="integration-icon" style={{ background: iconBg }}>{icon}</div>
                      <div className="integration-info">
                        <div className="integration-name">{name}</div>
                        <div className="integration-desc">{desc}</div>
                      </div>
                      <span className={`integration-status ${connected ? 'status-connected' : 'status-not'}`}>
                        {connected ? 'Connected' : 'Not connected'}
                      </span>
                      <button
                        className={connected ? 'btn-secondary' : 'btn-outline'}
                        style={{ padding: '7px 14px', fontSize: 12 }}
                        onClick={() => toast.success(connected ? `${name} disconnected` : `${name} connected`)}
                      >
                        {connected ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ══ DANGER ZONE TAB ══ */}
            {activeTab === 'danger' && (
              <div className="section-card" style={{ borderColor: 'rgba(239,68,68,0.2)' }}>
                <div className="section-head" style={{ borderColor: 'rgba(239,68,68,0.15)' }}>
                  <div>
                    <div className="section-title" style={{ color: '#f87171' }}>
                      <Icons.AlertTriangle />
                      Danger Zone
                    </div>
                    <div className="section-sub">Irreversible actions — proceed with caution</div>
                  </div>
                </div>
                <div className="section-body">
                  <div className="danger-item">
                    <div>
                      <div className="danger-item-title">Export Account Data</div>
                      <div className="danger-item-desc">Download a copy of all your data including profile information, projects, and activity history in JSON format.</div>
                    </div>
                    <button className="btn-outline" onClick={handleExportData}>
                      <Icons.Download />Export Data
                    </button>
                  </div>
                  <div className="danger-item">
                    <div>
                      <div className="danger-item-title">Sign Out All Devices</div>
                      <div className="danger-item-desc">Immediately revoke all active sessions on all devices. You will need to sign in again on each device.</div>
                    </div>
                    <button className="btn-danger" onClick={() => {
                      api.post('/auth/logout-all').then(() => {
                        toast.success('Signed out of all devices')
                        logout()
                      }).catch(() => toast.error('Failed'))
                    }}>
                      <Icons.LogOut />Sign Out All
                    </button>
                  </div>
                  <div className="danger-item">
                    <div>
                      <div className="danger-item-title">Delete Account</div>
                      <div className="danger-item-desc">Permanently delete your account and all associated data. This action cannot be undone and all your projects will be lost.</div>
                    </div>
                    <button className="btn-danger" onClick={() => setShowDeleteModal(true)}>
                      <Icons.Trash />Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ══ DELETE CONFIRMATION MODAL ══ */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="delete-modal" onClick={e => e.stopPropagation()}>
            <div className="delete-modal-icon">
              <Icons.Trash />
            </div>
            <div className="delete-modal-title">Delete Account</div>
            <div className="delete-modal-desc">
              This will permanently delete your account, all your projects, tasks, and data. <strong style={{ color: '#f1f5f9' }}>This cannot be undone.</strong> To confirm, type your email address below.
            </div>
            <div className="delete-modal-confirm-label">Type <strong style={{ color: '#e2e8f0' }}>{user?.email}</strong> to confirm</div>
            <input
              className="input"
              value={deleteConfirm}
              onChange={e => setDeleteConfirm(e.target.value)}
              placeholder={user?.email}
              autoFocus
            />
            <div className="delete-modal-actions">
              <button className="btn-secondary" onClick={() => { setShowDeleteModal(false); setDeleteConfirm('') }}>
                Cancel
              </button>
              <button
                className="btn-delete"
                disabled={deleteConfirm !== user?.email}
                onClick={handleDeleteAccount}
              >
                Delete My Account
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}