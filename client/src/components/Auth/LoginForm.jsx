import Input from '../Shared/Input'
import Button from '../Shared/Button'

export default function LoginForm({ form, onChange, onSubmit, loading }) {
  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input label="Email" name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" required />
      <Input label="Password" name="password" type="password" value={form.password} onChange={onChange} placeholder="••••••••" required />
      <Button type="submit" disabled={loading} style={{ marginTop: '8px', padding: '12px' }}>
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  )
}