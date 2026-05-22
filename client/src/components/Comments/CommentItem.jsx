import Avatar from '../Shared/Avatar'
import useAuth from '../../hooks/useAuth'
import api from '../../services/api'
import toast from 'react-hot-toast'

export default function CommentItem({ comment, onDelete }) {
  const { user } = useAuth()
  const isOwn = comment.author?._id === user?._id || comment.author === user?._id

  const handleDelete = async () => {
    try {
      await api.delete(`/comments/${comment._id}`)
      onDelete(comment._id)
    } catch {
      toast.error('Failed to delete')
    }
  }

  return (
    <div style={styles.wrapper}>
      <Avatar name={comment.author?.name} size={30} />
      <div style={styles.content}>
        <div style={styles.header}>
          <span style={styles.author}>{comment.author?.name}</span>
          <span style={styles.time}>{new Date(comment.createdAt).toLocaleDateString()}</span>
          {comment.isEdited && <span style={styles.edited}>(edited)</span>}
          {isOwn && (
            <button onClick={handleDelete} style={styles.deleteBtn}>✕</button>
          )}
        </div>
        <p style={styles.text}>{comment.text}</p>
      </div>
    </div>
  )
}

const styles = {
  wrapper: { display: 'flex', gap: '10px', marginBottom: '12px' },
  content: { flex: 1 },
  header: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' },
  author: { color: '#e2e8f0', fontSize: '13px', fontWeight: '600' },
  time: { color: '#475569', fontSize: '11px' },
  edited: { color: '#475569', fontSize: '11px' },
  deleteBtn: {
    background: 'transparent', border: 'none', color: '#475569',
    fontSize: '12px', cursor: 'pointer', marginLeft: 'auto',
  },
  text: { color: '#94a3b8', fontSize: '13px', lineHeight: '1.5' },
}