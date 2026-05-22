export default function Avatar({ name = '', size = 36, color = '#6366f1' }) {
  const initial = name?.charAt(0)?.toUpperCase() || '?'
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.38, fontWeight: '700', color: '#fff',
      flexShrink: 0, userSelect: 'none',
    }}>
      {initial}
    </div>
  )
}