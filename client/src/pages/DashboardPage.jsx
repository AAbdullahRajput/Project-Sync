import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import useAuth from '../hooks/useAuth'
import toast from 'react-hot-toast'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: '', description: '', color: '#6366f1' })
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    api.get('/projects')
      .then(res => setProjects(res.data))
      .catch(() => toast.error('Failed to load projects'))
      .finally(() => setLoading(false))
  }, [])

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

  const colors = ['#6366f1', '#ec4899', '#f59e0b', '#22c55e', '#3b82f6', '#ef4444', '#8b5cf6', '#06b6d4']

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.logo}>ProjectSync</div>
        <nav style={styles.nav}>
          <Link to="/dashboard" style={styles.navItem}>🏠 Dashboard</Link>
          <Link to="/notifications" style={styles.navItem}>🔔 Notifications</Link>
          <Link to="/profile" style={styles.navItem}>👤 Profile</Link>
        </nav>
        <div style={styles.sidebarBottom}>
          <div style={styles.userInfo}>
            <div style={styles.avatar}>{user?.name?.charAt(0).toUpperCase()}</div>
            <div>
              <p style={styles.userName}>{user?.name}</p>
              <p style={styles.userEmail}>{user?.email}</p>
            </div>
          </div>
          <button onClick={logout} style={styles.logoutBtn}>Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>My Projects</h1>
            <p style={styles.sub}>Welcome back, {user?.name?.split(' ')[0]}!</p>
          </div>
          <button onClick={() => setShowModal(true)} style={styles.createBtn}>
            + New Project
          </button>
        </div>

        {loading ? (
          <p style={styles.loading}>Loading projects...</p>
        ) : projects.length === 0 ? (
          <div style={styles.empty}>
            <p style={styles.emptyIcon}>📋</p>
            <p style={styles.emptyText}>No projects yet</p>
            <p style={styles.emptySub}>Create your first project to get started</p>
            <button onClick={() => setShowModal(true)} style={styles.createBtn}>
              + Create Project
            </button>
          </div>
        ) : (
          <div style={styles.grid}>
            {projects.map(project => (
              <div
                key={project._id}
                style={styles.projectCard}
                onClick={() => navigate(`/board/${project._id}`)}
              >
                <div style={{ ...styles.cardTop, background: project.color }} />
                <div style={styles.cardBody}>
                  <h3 style={styles.projectName}>{project.name}</h3>
                  <p style={styles.projectDesc}>{project.description || 'No description'}</p>
                  <div style={styles.cardFooter}>
                    <div style={styles.members}>
                      {project.members?.slice(0, 3).map((m, i) => (
                        <div key={i} style={{ ...styles.memberAvatar, marginLeft: i > 0 ? '-8px' : 0 }}>
                          {m.user?.name?.charAt(0).toUpperCase()}
                        </div>
                      ))}
                    </div>
                    <span style={styles.memberCount}>
                      {project.members?.length} member{project.members?.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Create Project Modal */}
      {showModal && (
        <div style={styles.overlay} onClick={() => setShowModal(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>Create New Project</h2>
            <form onSubmit={handleCreate} style={styles.form}>
              <div style={styles.field}>
                <label style={styles.label}>Project Name</label>
                <input
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="My Awesome Project"
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Description (optional)</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="What is this project about?"
                  rows={3}
                  style={styles.textarea}
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Color</label>
                <div style={styles.colorRow}>
                  {colors.map(c => (
                    <div
                      key={c}
                      onClick={() => setForm({ ...form, color: c })}
                      style={{
                        ...styles.colorDot,
                        background: c,
                        border: form.color === c ? '3px solid #fff' : '3px solid transparent',
                      }}
                    />
                  ))}
                </div>
              </div>
              <div style={styles.modalBtns}>
                <button type="button" onClick={() => setShowModal(false)} style={styles.cancelBtn}>
                  Cancel
                </button>
                <button type="submit" disabled={creating} style={styles.submitBtn}>
                  {creating ? 'Creating...' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  page: { display: 'flex', minHeight: '100vh', background: '#0f1117' },
  sidebar: {
    width: '240px', background: '#1a1d2e', borderRight: '1px solid #2d3148',
    display: 'flex', flexDirection: 'column', padding: '24px 0',
    position: 'fixed', top: 0, left: 0, height: '100vh',
  },
  logo: { color: '#6366f1', fontSize: '20px', fontWeight: '700', padding: '0 24px 24px' },
  nav: { display: 'flex', flexDirection: 'column', gap: '4px', padding: '0 12px', flex: 1 },
  navItem: {
    padding: '10px 12px', borderRadius: '8px', color: '#94a3b8',
    fontSize: '14px', fontWeight: '500', textDecoration: 'none', display: 'block',
  },
  sidebarBottom: { padding: '16px 16px 0' },
  userInfo: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' },
  avatar: {
    width: '36px', height: '36px', borderRadius: '50%', background: '#6366f1',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '15px', fontWeight: '700', color: '#fff', flexShrink: 0,
  },
  userName: { color: '#e2e8f0', fontSize: '13px', fontWeight: '600', margin: 0 },
  userEmail: { color: '#475569', fontSize: '11px', margin: 0 },
  logoutBtn: {
    width: '100%', background: 'transparent', border: '1px solid #2d3148',
    color: '#94a3b8', borderRadius: '8px', padding: '8px', fontSize: '13px',
  },
  main: { marginLeft: '240px', flex: 1, padding: '40px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' },
  title: { color: '#f1f5f9', fontSize: '28px', fontWeight: '700', margin: 0 },
  sub: { color: '#94a3b8', fontSize: '14px', marginTop: '4px' },
  createBtn: {
    background: '#6366f1', color: '#fff', border: 'none',
    borderRadius: '8px', padding: '10px 20px', fontSize: '14px', fontWeight: '600',
  },
  loading: { color: '#94a3b8', textAlign: 'center', marginTop: '60px' },
  empty: { textAlign: 'center', marginTop: '80px' },
  emptyIcon: { fontSize: '48px', marginBottom: '16px' },
  emptyText: { color: '#f1f5f9', fontSize: '20px', fontWeight: '600', marginBottom: '8px' },
  emptySub: { color: '#94a3b8', fontSize: '14px', marginBottom: '24px' },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  projectCard: {
    background: '#1a1d2e', border: '1px solid #2d3148', borderRadius: '12px',
    overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s, border-color 0.2s',
  },
  cardTop: { height: '8px' },
  cardBody: { padding: '20px' },
  projectName: { color: '#f1f5f9', fontSize: '16px', fontWeight: '600', marginBottom: '6px' },
  projectDesc: { color: '#94a3b8', fontSize: '13px', marginBottom: '16px', lineHeight: '1.5' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  members: { display: 'flex', alignItems: 'center' },
  memberAvatar: {
    width: '28px', height: '28px', borderRadius: '50%', background: '#4f46e5',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '11px', fontWeight: '700', color: '#fff', border: '2px solid #1a1d2e',
  },
  memberCount: { color: '#475569', fontSize: '12px' },
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
  },
  modal: {
    background: '#1a1d2e', border: '1px solid #2d3148', borderRadius: '16px',
    padding: '32px', width: '100%', maxWidth: '480px',
  },
  modalTitle: { color: '#f1f5f9', fontSize: '20px', fontWeight: '700', marginBottom: '24px' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { color: '#94a3b8', fontSize: '13px', fontWeight: '500' },
  input: {
    background: '#0f1117', border: '1px solid #2d3148', borderRadius: '8px',
    padding: '10px 14px', color: '#e2e8f0', fontSize: '14px', outline: 'none',
  },
  textarea: {
    background: '#0f1117', border: '1px solid #2d3148', borderRadius: '8px',
    padding: '10px 14px', color: '#e2e8f0', fontSize: '14px', outline: 'none', resize: 'vertical',
  },
  colorRow: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  colorDot: { width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer' },
  modalBtns: { display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' },
  cancelBtn: {
    background: 'transparent', border: '1px solid #2d3148', color: '#94a3b8',
    borderRadius: '8px', padding: '10px 20px', fontSize: '14px',
  },
  submitBtn: {
    background: '#6366f1', color: '#fff', border: 'none',
    borderRadius: '8px', padding: '10px 20px', fontSize: '14px', fontWeight: '600',
  },
}