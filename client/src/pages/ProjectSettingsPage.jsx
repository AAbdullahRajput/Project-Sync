import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'
import toast from 'react-hot-toast'

export default function ProjectSettingsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    api.get(`/projects/${id}`).then(res => {
      setProject(res.data)
      setName(res.data.name)
    })
  }, [id])

  const updateProject = async (e) => {
    e.preventDefault()
    await api.put(`/projects/${id}`, { name })
    toast.success('Project updated!')
  }

  const inviteMember = async (e) => {
    e.preventDefault()
    try {
      await api.post(`/projects/${id}/invite`, { email })
      toast.success('Member invited!')
      setEmail('')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to invite')
    }
  }

  const deleteProject = async () => {
    if (!window.confirm('Delete this project? This cannot be undone.')) return
    await api.delete(`/projects/${id}`)
    toast.success('Project deleted')
    navigate('/dashboard')
  }

  if (!project) return <div style={styles.center}>Loading...</div>

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Project Settings</h2>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Rename Project</h3>
        <form onSubmit={updateProject} style={styles.row}>
          <input value={name} onChange={e => setName(e.target.value)} style={styles.input} />
          <button type="submit" style={styles.btn}>Save</button>
        </form>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Invite Member</h3>
        <form onSubmit={inviteMember} style={styles.row}>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="member@email.com" style={styles.input} />
          <button type="submit" style={styles.btn}>Invite</button>
        </form>
      </div>

      <div style={styles.section}>
        <h3 style={{ ...styles.sectionTitle, color: '#ef4444' }}>Danger Zone</h3>
        <button onClick={deleteProject} style={styles.deleteBtn}>Delete Project</button>
      </div>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: '#0f1117', padding: '40px 20px', maxWidth: '600px', margin: '0 auto' },
  center: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f1117', color: '#94a3b8' },
  title: { color: '#f1f5f9', fontSize: '24px', fontWeight: '700', marginBottom: '32px' },
  section: { background: '#1a1d2e', border: '1px solid #2d3148', borderRadius: '12px', padding: '24px', marginBottom: '20px' },
  sectionTitle: { color: '#e2e8f0', fontSize: '16px', fontWeight: '600', marginBottom: '16px' },
  row: { display: 'flex', gap: '10px' },
  input: { flex: 1, background: '#0f1117', border: '1px solid #2d3148', borderRadius: '8px', padding: '10px 14px', color: '#e2e8f0', fontSize: '14px', outline: 'none' },
  btn: { background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', fontWeight: '600' },
  deleteBtn: { background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', fontWeight: '600' },
}