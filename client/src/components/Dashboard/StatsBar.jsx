export default function StatsBar({ projects = [] }) {
  const totalMembers = projects.reduce((acc, p) => acc + (p.members?.length || 0), 0)

  const stats = [
    { label: 'Projects', value: projects.length, icon: '📋' },
    { label: 'Team Members', value: totalMembers, icon: '👥' },
  ]

  return (
    <div style={styles.bar}>
      {stats.map(s => (
        <div key={s.label} style={styles.stat}>
          <span style={styles.icon}>{s.icon}</span>
          <div>
            <p style={styles.value}>{s.value}</p>
            <p style={styles.label}>{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

const styles = {
  bar: { display: 'flex', gap: '16px', marginBottom: '28px', flexWrap: 'wrap' },
  stat: {
    display: 'flex', alignItems: 'center', gap: '12px',
    background: '#1a1d2e', border: '1px solid #2d3148', borderRadius: '10px',
    padding: '14px 20px',
  },
  icon: { fontSize: '24px' },
  value: { color: '#f1f5f9', fontSize: '22px', fontWeight: '800', margin: 0 },
  label: { color: '#94a3b8', fontSize: '12px', margin: 0 },
}