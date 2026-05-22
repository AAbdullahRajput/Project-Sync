import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import api from '../services/api'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const [form, setForm] = useState({ name: user?.name || '', bio: user?.bio || '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.put('/auth/profile', form)
      toast.success('Profile updated!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>My Profile</h2>
        <div style={styles.avatar}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <p style={styles.email}>{user?.email}</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Bio</label>
            <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} style={styles.textarea} />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>New Password (leave blank to keep current)</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} style={styles.input} placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} style={styles.btn}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>

        <button onClick={logout} style={styles.logoutBtn}>Logout</button>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh', background: '#0f1117', display: 'flex',
    alignItems: 'center', justifyContent: 'center', padding: '20px',
  },
  card: {
    background: '#1a1d2e', border: '1px solid #2d3148', borderRadius: '16px',
    padding: '40px', width: '100%', maxWidth: '480px',
  },
  title: { color: '#f1f5f9', fontSize: '22px', fontWeight: '700', marginBottom: '24px' },
  avatar: {
    width: '72px', height: '72px', borderRadius: '50%', background: '#6366f1',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '28px', fontWeight: '700', color: '#fff', margin: '0 auto 12px',
  },
  email: { color: '#94a3b8', fontSize: '14px', textAlign: 'center', marginBottom: '28px' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { color: '#94a3b8', fontSize: '13px' },
  input: {
    background: '#0f1117', border: '1px solid #2d3148', borderRadius: '8px',
    padding: '10px 14px', color: '#e2e8f0', fontSize: '14px', outline: 'none',
  },
  textarea: {
    background: '#0f1117', border: '1px solid #2d3148', borderRadius: '8px',
    padding: '10px 14px', color: '#e2e8f0', fontSize: '14px', outline: 'none', resize: 'vertical',
  },
  btn: {
    background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px',
    padding: '12px', fontSize: '15px', fontWeight: '600',
  },
  logoutBtn: {
    width: '100%', marginTop: '12px', background: 'transparent', border: '1px solid #ef4444',
    color: '#ef4444', borderRadius: '8px', padding: '10px', fontSize: '14px', fontWeight: '600',
  },
}