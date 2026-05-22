import ModalWrapper from './ModalWrapper'
import Button from '../Shared/Button'

export default function ConfirmDeleteModal({ title = 'Delete?', message = 'This action cannot be undone.', onConfirm, onClose }) {
  return (
    <ModalWrapper onClose={onClose} maxWidth="380px">
      <div style={styles.inner}>
        <div style={styles.icon}>🗑</div>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.msg}>{message}</p>
        <div style={styles.btns}>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="danger" onClick={onConfirm}>Delete</Button>
        </div>
      </div>
    </ModalWrapper>
  )
}

const styles = {
  inner: { padding: '32px', textAlign: 'center' },
  icon: { fontSize: '40px', marginBottom: '16px' },
  title: { color: '#f1f5f9', fontSize: '20px', fontWeight: '700', marginBottom: '8px' },
  msg: { color: '#94a3b8', fontSize: '14px', marginBottom: '24px' },
  btns: { display: 'flex', justifyContent: 'center', gap: '12px' },
}