import { useState } from 'react'

export default function AddCardBtn({ onAdd }) {
  const [adding, setAdding] = useState(false)
  const [title, setTitle] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onAdd(title)
    setTitle('')
    setAdding(false)
  }

  if (adding) {
    return (
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          autoFocus
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Card title..."
          style={styles.input}
        />
        <div style={styles.btns}>
          <button type="submit" style={styles.addBtn}>Add</button>
          <button type="button" onClick={() => setAdding(false)} style={styles.cancelBtn}>✕</button>
        </div>
      </form>
    )
  }

  return (
    <button onClick={() => setAdding(true)} style={styles.trigger}>
      + Add card
    </button>
  )
}

const styles = {
  form: { display: 'flex', flexDirection: 'column', gap: '6px' },
  input: {
    background: '#0f1117', border: '1px solid #6366f1', borderRadius: '6px',
    padding: '8px 10px', color: '#e2e8f0', fontSize: '13px', outline: 'none', fontFamily: 'inherit',
  },
  btns: { display: 'flex', gap: '6px' },
  addBtn: {
    background: '#6366f1', color: '#fff', border: 'none',
    borderRadius: '6px', padding: '6px 14px', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
  },
  cancelBtn: {
    background: 'transparent', border: '1px solid #2d3148',
    color: '#94a3b8', borderRadius: '6px', padding: '6px 10px', fontSize: '13px', cursor: 'pointer',
  },
  trigger: {
    background: 'transparent', border: 'none', color: '#475569',
    fontSize: '13px', textAlign: 'left', padding: '6px 4px', width: '100%', cursor: 'pointer',
  },
}