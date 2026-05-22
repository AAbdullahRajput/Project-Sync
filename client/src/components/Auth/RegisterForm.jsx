import Input from '../Shared/Input'
import Button from '../Shared/Button'

export default function RegisterForm({ form, onChange, onSubmit, loading }) {
  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input label="Full Name" name="name" value={form.name} onChange={onChange} placeholder="John Doe" required />
      <Input label="Email" name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" required />
      <Input label="Password" name="password" type="password" value={form.password} onChange={onChange} placeholder="Min 6 characters" required />
      <Button type="submit" disabled={loading} style={{ marginTop: '8px', padding: '12px' }}>
        {loading ? 'Creating account...' : 'Create Account'}
      </Button>
    </form>
  )
}