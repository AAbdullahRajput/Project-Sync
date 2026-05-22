const priorities = [
  { value: 'low', label: 'Low', color: '#22c55e' },
  { value: 'medium', label: 'Medium', color: '#f59e0b' },
  { value: 'high', label: 'High', color: '#ef4444' },
  { value: 'critical', label: 'Critical', color: '#7c3aed' },
]

export default function CardPriority({ value, onChange }) {
  return (
    <div style={styles.wrapper}>
      {priorities.map(p => (
        <button
          key={p.value}
          onClick={() => onChange(p.value)}
          style={{
            ...styles.btn,
            border: `2px solid ${value === p.value ? p.color : '#2d3148'}`,
            color: value === p.value ? p.color : '#94a3b8',
            background: value === p.value ? p.color + '18' : 'transparent',
          }}
        >
          <span style={{ ...styles.dot, background: p.color }} />
          {p.label}
        </button>
      ))}
    </div>
  )
}

const styles = {
  wrapper: { display: 'flex', gap: '6px', flexWrap: 'wrap' },
  btn: {
    display: 'flex', alignItems: 'center', gap: '6px',
    padding: '5px 10px', borderRadius: '6px', fontSize: '12px',
    fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
  },
  dot: { width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0 },
}