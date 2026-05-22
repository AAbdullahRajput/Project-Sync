import { useState } from 'react'
import api from '../../services/api'
import toast from 'react-hot-toast'

export default function CommentForm({ cardId, onAdd }) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    setLoading(true)
    try {
      const res = await api.post(`/comments/${cardId}`, { text })
      onAdd(res.data)
      setText('')
    } catch {
      toast.error('Failed to post comment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Write a comment..."
        style={styles.input}
      />
      <button type="submit" disabled={loading} style={styles.btn}>
        {loading ? '...' : 'Send'}
      </button>
    </form>
  )
}

const styles = {
  form: { display: 'flex', gap: '8px', marginTop: '12px' },
  input: {
    flex: 1, background: '#0f1117', border: '1px solid #2d3148',
    borderRadius: '8px', padding: '8px 12px', color: '#e2e8f0',
    fontSize: '13px', outline: 'none', fontFamily: 'inherit',
  },
  btn: {
    background: '#6366f1', color: '#fff', border: 'none',
    borderRadius: '8px', padding: '8px 16px', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
  },
}