export default function ModalWrapper({ onClose, children, maxWidth = '480px' }) {
  return (
    <div
      style={styles.overlay}
      onClick={onClose}
    >
      <div
        style={{ ...styles.modal, maxWidth }}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000, padding: '20px',
  },
  modal: {
    background: '#1a1d2e', border: '1px solid #2d3148', borderRadius: '16px',
    width: '100%', maxHeight: '90vh', overflowY: 'auto',
  },
}