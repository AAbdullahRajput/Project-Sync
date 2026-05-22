const variants = {
  primary: { background: '#6366f1', color: '#fff', border: 'none' },
  ghost: { background: 'transparent', color: '#94a3b8', border: '1px solid #2d3148' },
  danger: { background: 'transparent', color: '#ef4444', border: '1px solid #ef4444' },
}

export default function Button({ children, variant = 'primary', onClick, disabled, style = {}, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...variants[variant],
        borderRadius: '8px',
        padding: '9px 18px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'opacity 0.2s',
        fontFamily: 'inherit',
        ...style,
      }}
    >
      {children}
    </button>
  )
}