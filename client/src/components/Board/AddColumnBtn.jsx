import { useState } from 'react'

export default function AddColumnBtn({ onAdd }) {
  const [adding, setAdding] = useState(false)
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    onAdd(name)
    setName('')
    setAdding(false)
  }

  return (
    <div style={styles.wrapper}>
      {adding ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Column name..."
            style={styles.input}
          />
          <div style={styles.btns}>
            <button type="submit" style={styles.addBtn}>Add Column</button>
            <button type="button" onClick={() => setAdding(false)} style={styles.cancelBtn}>✕</button>
          </div>
        </form>
      ) : (
        <button onClick={() => setAdding(true)} style={styles.trigger}>
          + Add Column
        </button>
      )}
    </div>
  )
}

const styles = {
  wrapper: { minWidth: '240px' },
  form: {
    background: '#1a1d2e', border: '1px solid #2d3148', borderRadius: '12px',
    padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px',
  },
  input: {
    background: '#0f1117', border: '1px solid #6366f1', borderRadius: '6px',
    padding: '8px 10px', color: '#e2e8f0', fontSize: '13px', outline: 'none', fontFamily: 'inherit',
  },
  btns: { display: 'flex', gap: '6px' },
  addBtn: {
    background: '#6366f1', color: '#fff', border: 'none',
    borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
  },
  cancelBtn: {
    background: 'transparent', border: '1px solid #2d3148',
    color: '#94a3b8', borderRadius: '6px', padding: '8px 10px', fontSize: '13px', cursor: 'pointer',
  },
  trigger: {
    background: '#1a1d2e', border: '2px dashed #2d3148', color: '#475569',
    borderRadius: '12px', padding: '16px 24px', fontSize: '14px',
    fontWeight: '600', width: '100%', cursor: 'pointer',
  },
}