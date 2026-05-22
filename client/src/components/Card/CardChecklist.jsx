import { useState } from 'react'

export default function CardChecklist({ checklist = [], onChange }) {
  const [text, setText] = useState('')

  const addItem = () => {
    if (!text.trim()) return
    onChange([...checklist, { text, completed: false }])
    setText('')
  }

  const toggleItem = (i) => {
    const updated = checklist.map((item, idx) =>
      idx === i ? { ...item, completed: !item.completed } : item
    )
    onChange(updated)
  }

  const removeItem = (i) => onChange(checklist.filter((_, idx) => idx !== i))

  const done = checklist.filter(i => i.completed).length
  const pct = checklist.length ? Math.round((done / checklist.length) * 100) : 0

  return (
    <div style={styles.wrapper}>
      {checklist.length > 0 && (
        <>
          <div style={styles.progress}>
            <span style={styles.pct}>{pct}%</span>
            <div style={styles.bar}>
              <div style={{ ...styles.fill, width: `${pct}%` }} />
            </div>
          </div>
          <div style={styles.items}>
            {checklist.map((item, i) => (
              <div key={i} style={styles.item}>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleItem(i)}
                  style={styles.checkbox}
                />
                <span style={{ ...styles.text, textDecoration: item.completed ? 'line-through' : 'none', color: item.completed ? '#475569' : '#e2e8f0' }}>
                  {item.text}
                </span>
                <button onClick={() => removeItem(i)} style={styles.removeBtn}>✕</button>
              </div>
            ))}
          </div>
        </>
      )}
      <div style={styles.addRow}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addItem()}
          placeholder="Add item..."
          style={styles.input}
        />
        <button onClick={addItem} style={styles.addBtn}>Add</button>
      </div>
    </div>
  )
}

const styles = {
  wrapper: { display: 'flex', flexDirection: 'column', gap: '10px' },
  progress: { display: 'flex', alignItems: 'center', gap: '10px' },
  pct: { color: '#94a3b8', fontSize: '12px', width: '32px', flexShrink: 0 },
  bar: { flex: 1, height: '6px', background: '#2d3148', borderRadius: '999px', overflow: 'hidden' },
  fill: { height: '100%', background: '#22c55e', borderRadius: '999px', transition: 'width 0.3s' },
  items: { display: 'flex', flexDirection: 'column', gap: '6px' },
  item: { display: 'flex', alignItems: 'center', gap: '10px' },
  checkbox: { accentColor: '#6366f1', width: '16px', height: '16px', cursor: 'pointer' },
  text: { flex: 1, fontSize: '14px' },
  removeBtn: {
    background: 'transparent', border: 'none', color: '#475569',
    fontSize: '12px', cursor: 'pointer', opacity: 0,
  },
  addRow: { display: 'flex', gap: '8px' },
  input: {
    flex: 1, background: '#0f1117', border: '1px solid #2d3148', borderRadius: '6px',
    padding: '7px 10px', color: '#e2e8f0', fontSize: '13px', outline: 'none', fontFamily: 'inherit',
  },
  addBtn: {
    background: '#6366f1', color: '#fff', border: 'none',
    borderRadius: '6px', padding: '7px 14px', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
  },
}