import { useState } from 'react'

const PRESET_COLORS = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316']

export default function CardLabels({ labels = [], onChange }) {
  const [text, setText] = useState('')
  const [color, setColor] = useState('#6366f1')

  const addLabel = () => {
    if (!text.trim()) return
    onChange([...labels, { text, color }])
    setText('')
  }

  const removeLabel = (i) => onChange(labels.filter((_, idx) => idx !== i))

  return (
    <div style={styles.wrapper}>
      <div style={styles.existing}>
        {labels.map((l, i) => (
          <span key={i} style={{ ...styles.label, background: l.color }}>
            {l.text}
            <button onClick={() => removeLabel(i)} style={styles.removeBtn}>✕</button>
          </span>
        ))}
      </div>
      <div style={styles.addRow}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Label text..."
          style={styles.input}
          onKeyDown={e => e.key === 'Enter' && addLabel()}
        />
        <div style={styles.colors}>
          {PRESET_COLORS.map(c => (
            <div
              key={c}
              onClick={() => setColor(c)}
              style={{
                ...styles.colorDot,
                background: c,
                border: color === c ? '2px solid #fff' : '2px solid transparent',
              }}
            />
          ))}
        </div>
        <button onClick={addLabel} style={styles.addBtn}>Add</button>
      </div>
    </div>
  )
}

const styles = {
  wrapper: { display: 'flex', flexDirection: 'column', gap: '10px' },
  existing: { display: 'flex', flexWrap: 'wrap', gap: '6px' },
  label: {
    display: 'inline-flex', alignItems: 'center', gap: '6px',
    padding: '3px 10px', borderRadius: '999px', fontSize: '12px',
    fontWeight: '600', color: '#fff',
  },
  removeBtn: {
    background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.7)',
    fontSize: '10px', cursor: 'pointer', padding: 0,
  },
  addRow: { display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' },
  input: {
    flex: 1, minWidth: '100px', background: '#0f1117', border: '1px solid #2d3148',
    borderRadius: '6px', padding: '6px 10px', color: '#e2e8f0', fontSize: '13px', outline: 'none', fontFamily: 'inherit',
  },
  colors: { display: 'flex', gap: '4px' },
  colorDot: { width: '20px', height: '20px', borderRadius: '50%', cursor: 'pointer' },
  addBtn: {
    background: '#6366f1', color: '#fff', border: 'none',
    borderRadius: '6px', padding: '6px 12px', fontSize: '12px', fontWeight: '600', cursor: 'pointer',
  },
}