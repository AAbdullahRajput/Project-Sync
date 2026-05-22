import { Link } from 'react-router-dom'
import Avatar from '../Shared/Avatar'

export default function BoardHeader({ project }) {
  if (!project) return null

  return (
    <div style={{ ...styles.header, borderBottom: `3px solid ${project.color || '#6366f1'}` }}>
      <div style={styles.left}>
        <div style={{ ...styles.colorDot, background: project.color || '#6366f1' }} />
        <div>
          <h2 style={styles.name}>{project.name}</h2>
          {project.description && <p style={styles.desc}>{project.description}</p>}
        </div>
      </div>
      <div style={styles.right}>
        <div style={styles.members}>
          {project.members?.slice(0, 5).map((m, i) => (
            <div key={i} style={{ marginLeft: i > 0 ? '-8px' : 0 }}>
              <Avatar name={m.user?.name} size={30} />
            </div>
          ))}
          {project.members?.length > 5 && (
            <div style={styles.more}>+{project.members.length - 5}</div>
          )}
        </div>
        <Link to={`/projects/${project._id}/settings`} style={styles.settingsBtn}>⚙ Settings</Link>
      </div>
    </div>
  )
}

const styles = {
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '14px 24px', background: '#1a1d2e',
  },
  left: { display: 'flex', alignItems: 'center', gap: '12px' },
  colorDot: { width: '12px', height: '12px', borderRadius: '50%', flexShrink: 0 },
  name: { color: '#f1f5f9', fontSize: '16px', fontWeight: '700', margin: 0 },
  desc: { color: '#94a3b8', fontSize: '12px', margin: '2px 0 0' },
  right: { display: 'flex', alignItems: 'center', gap: '16px' },
  members: { display: 'flex', alignItems: 'center' },
  more: {
    width: '30px', height: '30px', borderRadius: '50%', background: '#252840',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '10px', color: '#94a3b8', fontWeight: '700', marginLeft: '-8px',
    border: '2px solid #1a1d2e',
  },
  settingsBtn: {
    color: '#94a3b8', fontSize: '13px', textDecoration: 'none',
    padding: '6px 12px', border: '1px solid #2d3148', borderRadius: '6px',
  },
}