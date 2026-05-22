export default function ColumnHeader({ name, cardCount, onDelete }) {
  return (
    <div style={styles.header}>
      <div style={styles.left}>
        <span style={styles.name}>{name}</span>
        <span style={styles.count}>{cardCount}</span>
      </div>
      <button onClick={onDelete} style={styles.deleteBtn} title="Delete column">✕</button>
    </div>
  )
}

const styles = {
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '14px 16px', borderBottom: '1px solid #2d3148',
  },
  left: { display: 'flex', alignItems: 'center', gap: '8px' },
  name: { color: '#f1f5f9', fontSize: '14px', fontWeight: '600' },
  count: {
    background: '#252840', color: '#94a3b8', borderRadius: '12px',
    padding: '2px 8px', fontSize: '12px', fontWeight: '600',
  },
  deleteBtn: {
    background: 'transparent', border: 'none', color: '#475569',
    fontSize: '14px', cursor: 'pointer', lineHeight: 1, padding: '2px 4px',
  },
}