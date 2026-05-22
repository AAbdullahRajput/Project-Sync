import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api'
import Avatar from '../components/Shared/Avatar'
import Badge from '../components/Shared/Badge'
import toast from 'react-hot-toast'

export default function MembersPage() {
  const { id } = useParams()
  const [project, setProject] = useState(null)

  useEffect(() => {
    api.get(`/projects/${id}`).then(res => setProject(res.data))
  }, [id])

  const removeMember = async (userId) => {
    if (!window.confirm('Remove this member?')) return
    await api.delete(`/projects/${id}/members/${userId}`)
    setProject(prev => ({
      ...prev,
      members: prev.members.filter(m => m.user._id !== userId),
    }))
    toast.success('Member removed')
  }

  if (!project) return <div style={styles.center}>Loading...</div>

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <Link to={`/board/${id}`} style={styles.back}>← Back to Board</Link>
        <h2 style={styles.title}>Team Members</h2>
        <p style={styles.sub}>{project.members?.length} member{project.members?.length !== 1 ? 's' : ''} in {project.name}</p>
      </div>

      <div style={styles.list}>
        {project.members?.map((m) => (
          <div key={m.user._id} style={styles.row}>
            <Avatar name={m.user?.name} size={40} />
            <div style={styles.info}>
              <p style={styles.name}>{m.user?.name}</p>
              <p style={styles.email}>{m.user?.email}</p>
            </div>
            <Badge
              text={m.role}
              color={m.role === 'admin' ? '#6366f1' : m.role === 'viewer' ? '#94a3b8' : '#22c55e'}
            />
            {m.role !== 'admin' && (
              <button onClick={() => removeMember(m.user._id)} style={styles.removeBtn}>Remove</button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  page: { minHeight: '100vh', background: '#0f1117', padding: '40px 20px', maxWidth: '700px', margin: '0 auto' },
  center: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f1117', color: '#94a3b8' },
  header: { marginBottom: '32px' },
  back: { color: '#94a3b8', fontSize: '13px', textDecoration: 'none', display: 'block', marginBottom: '16px' },
  title: { color: '#f1f5f9', fontSize: '24px', fontWeight: '700', marginBottom: '4px' },
  sub: { color: '#94a3b8', fontSize: '14px' },
  list: { display: 'flex', flexDirection: 'column', gap: '10px' },
  row: {
    display: 'flex', alignItems: 'center', gap: '14px',
    background: '#1a1d2e', border: '1px solid #2d3148',
    borderRadius: '12px', padding: '16px 20px',
  },
  info: { flex: 1 },
  name: { color: '#e2e8f0', fontSize: '15px', fontWeight: '600', margin: 0 },
  email: { color: '#94a3b8', fontSize: '13px', margin: 0 },
  removeBtn: {
    background: 'transparent', border: '1px solid #ef4444',
    color: '#ef4444', borderRadius: '6px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer',
  },
}