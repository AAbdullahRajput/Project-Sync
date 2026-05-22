export default function Badge({ text, color = '#6366f1', bg = '' }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '2px 10px', borderRadius: '999px',
      fontSize: '11px', fontWeight: '700',
      color: color,
      background: bg || color + '22',
      textTransform: 'capitalize',
    }}>
      {text}
    </span>
  )
}