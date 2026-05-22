export default function EmptyState({ icon = '📭', title = 'Nothing here', subtitle = '', action = null }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>{icon}</div>
      <p style={{ color: '#f1f5f9', fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>{title}</p>
      {subtitle && <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>{subtitle}</p>}
      {action}
    </div>
  )
}