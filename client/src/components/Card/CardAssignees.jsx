import Avatar from '../Shared/Avatar'

export default function CardAssignees({ assignees = [], members = [], onChange }) {
  const assigneeIds = assignees.map(a => a._id || a)

  const toggle = (userId) => {
    if (assigneeIds.includes(userId)) {
      onChange(assigneeIds.filter(id => id !== userId))
    } else {
      onChange([...assigneeIds, userId])
    }
  }

  return (
    <div style={styles.wrapper}>
      {members.map(m => {
        const member = m.user || m
        const isAssigned = assigneeIds.includes(member._id)
        return (
          <div
            key={member._id}
            onClick={() => toggle(member._id)}
            style={{
              ...styles.member,
              background: isAssigned ? '#252840' : 'transparent',
              border: `1px solid ${isAssigned ? '#6366f1' : '#2d3148'}`,
            }}
          >
            <Avatar name={member.name} size={26} />
            <span style={styles.name}>{member.name}</span>
            {isAssigned && <span style={styles.check}>✓</span>}
          </div>
        )
      })}
      {members.length === 0 && (
        <p style={styles.empty}>No members in this project</p>
      )}
    </div>
  )
}

const styles = {
  wrapper: { display: 'flex', flexDirection: 'column', gap: '6px' },
  member: {
    display: 'flex', alignItems: 'center', gap: '10px',
    padding: '8px 10px', borderRadius: '8px', cursor: 'pointer',
  },
  name: { color: '#e2e8f0', fontSize: '13px', flex: 1 },
  check: { color: '#6366f1', fontWeight: '700', fontSize: '14px' },
  empty: { color: '#475569', fontSize: '13px' },
}