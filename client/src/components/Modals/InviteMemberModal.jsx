import { useState } from 'react'
import ModalWrapper from './ModalWrapper'
import Input from '../Shared/Input'
import Button from '../Shared/Button'

export default function InviteMemberModal({ onClose, onInvite }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await onInvite(email)
    setEmail('')
    setLoading(false)
  }

  return (
    <ModalWrapper onClose={onClose}>
      <div style={{ padding: '28px' }}>
        <h2 style={{ color: '#f1f5f9', fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>
          Invite Member
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="team@example.com"
            required
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Inviting...' : 'Send Invite'}
            </Button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  )
}