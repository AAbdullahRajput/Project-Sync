import { useNavigate } from 'react-router-dom'
import Avatar from '../Shared/Avatar'

export default function ProjectCard({ project }) {
  const navigate = useNavigate()

  return (
    <div
      style={styles.card}
      onClick={() => navigate(`/board/${project._id}`)}
    >
      <div style={{ ...styles.colorBar, background: project.color || '#6366f1' }} />
      <div style={styles.body}>
        <h3 style={styles.name}>{project.name}</h3>
        <p style={styles.desc}>{project.description || 'No description'}</p>
        <div style={styles.footer}>
          <div style={styles.members}>
            {project.members?.slice(0, 4).map((m, i) => (
              <div key={i} style={{ marginLeft: i > 0 ? '-6px' : 0 }}>
                <Avatar name={m.user?.name || m.name} size={26} />
              </div>
            ))}
          </div>
          <span style={styles.count}>
            {project.members?.length} member{project.members?.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  )
}

const styles = {
  card: {
    background: '#1a1d2e', border: '1px solid #2d3148', borderRadius: '12px',
    overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.2s, transform 0.15s',
  },
  colorBar: { height: '6px' },
  body: { padding: '18px 20px' },
  name: { color: '#f1f5f9', fontSize: '15px', fontWeight: '700', marginBottom: '6px' },
  desc: { color: '#94a3b8', fontSize: '13px', lineHeight: '1.5', marginBottom: '16px' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  members: { display: 'flex', alignItems: 'center' },
  count: { color: '#475569', fontSize: '12px' },
}