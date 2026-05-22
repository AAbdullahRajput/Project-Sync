import { useEffect } from 'react'
import api from '../../services/api'
import CommentItem from './CommentItem'
import toast from 'react-hot-toast'

export default function CommentList({ cardId, comments, setComments }) {
  useEffect(() => {
    api.get(`/comments/${cardId}`)
      .then(res => setComments(res.data))
      .catch(() => toast.error('Failed to load comments'))
  }, [cardId])

  const handleDelete = (id) => setComments(prev => prev.filter(c => c._id !== id))

  if (comments.length === 0) {
    return <p style={{ color: '#475569', fontSize: '13px', marginBottom: '12px' }}>No comments yet. Be the first!</p>
  }

  return (
    <div style={{ marginBottom: '4px' }}>
      {comments.map(c => (
        <CommentItem key={c._id} comment={c} onDelete={handleDelete} />
      ))}
    </div>
  )
}