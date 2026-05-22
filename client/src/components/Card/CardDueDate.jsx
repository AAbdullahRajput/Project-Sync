export default function CardDueDate({ value, onChange }) {
  return (
    <div style={styles.wrapper}>
      <input
        type="date"
        value={value ? value.split('T')[0] : ''}
        onChange={e => onChange(e.target.value)}
        style={styles.input}
      />
      {value && (
        <button onClick={() => onChange('')} style={styles.clearBtn}>✕ Clear</button>
      )}
    </div>
  )
}

const styles = {
  wrapper: { display: 'flex', alignItems: 'center', gap: '10px' },
  input: {
    background: '#0f1117', border: '1px solid #2d3148', borderRadius: '8px',
    padding: '8px 12px', color: '#e2e8f0', fontSize: '13px', outline: 'none',
    colorScheme: 'dark', fontFamily: 'inherit',
  },
  clearBtn: {
    background: 'transparent', border: 'none', color: '#475569',
    fontSize: '12px', cursor: 'pointer',
  },
}