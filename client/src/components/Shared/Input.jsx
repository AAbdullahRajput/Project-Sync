export default function Input({ label, name, type = 'text', value, onChange, placeholder, required, style = {} }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && <label style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '500' }}>{label}</label>}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          background: '#0f1117',
          border: '1px solid #2d3148',
          borderRadius: '8px',
          padding: '10px 14px',
          color: '#e2e8f0',
          fontSize: '14px',
          outline: 'none',
          width: '100%',
          boxSizing: 'border-box',
          fontFamily: 'inherit',
          ...style,
        }}
      />
    </div>
  )
}