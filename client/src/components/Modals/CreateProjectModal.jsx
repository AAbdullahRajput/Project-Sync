import { useState } from 'react'
import ModalWrapper from './ModalWrapper'
import Input from '../Shared/Input'
import Button from '../Shared/Button'

const COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#22c55e', '#3b82f6', '#ef4444', '#8b5cf6', '#06b6d4']

export default function CreateProjectModal({ onClose, onCreate }) {
  const [form, setForm] = useState({ name: '', description: '', color: '#6366f1' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await onCreate(form)
    setLoading(false)
  }

  return (
    <ModalWrapper onClose={onClose}>
      <div style={styles.inner}>
        <h2 style={styles.title}>New Project</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <Input
            label="Project Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="My Awesome Project"
            required
          />
          <div style={styles.field}>
            <label style={styles.label}>Description (optional)</label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="What is this project about?"
              rows={3}
              style={styles.textarea}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Color</label>
            <div style={styles.colorRow}>
              {COLORS.map(c => (
                <div
                  key={c}
                  onClick={() => setForm({ ...form, color: c })}
                  style={{
                    ...styles.colorDot,
                    background: c,
                    border: form.color === c ? '3px solid #fff' : '3px solid transparent',
                  }}
                />
              ))}
            </div>
          </div>
          <div style={styles.btns}>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Project'}
            </Button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  )
}

const styles = {
  inner: { padding: '28px' },
  title: { color: '#f1f5f9', fontSize: '20px', fontWeight: '700', marginBottom: '20px' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { color: '#94a3b8', fontSize: '13px', fontWeight: '500' },
  textarea: {
    background: '#0f1117', border: '1px solid #2d3148', borderRadius: '8px',
    padding: '10px 14px', color: '#e2e8f0', fontSize: '14px', outline: 'none',
    resize: 'vertical', fontFamily: 'inherit',
  },
  colorRow: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  colorDot: { width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer' },
  btns: { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' },
}