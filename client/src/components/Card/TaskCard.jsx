import { Draggable } from '@hello-pangea/dnd'
import Avatar from '../Shared/Avatar'

const priorityColor = { low: '#22c55e', medium: '#f59e0b', high: '#ef4444', critical: '#7c3aed' }

export default function TaskCard({ card, index, onClick }) {
  return (
    <Draggable draggableId={card._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onClick}
          style={{
            ...styles.card,
            ...provided.draggableProps.style,
            boxShadow: snapshot.isDragging ? '0 8px 24px rgba(0,0,0,0.5)' : 'none',
            opacity: snapshot.isDragging ? 0.92 : 1,
          }}
        >
          <div style={{ ...styles.priorityBar, background: priorityColor[card.priority] || '#6366f1' }} />
          <p style={styles.title}>{card.title}</p>
          <div style={styles.meta}>
            {card.priority && (
              <span style={{ ...styles.priorityBadge, color: priorityColor[card.priority] }}>
                {card.priority}
              </span>
            )}
            {card.dueDate && (
              <span style={styles.dueDate}>📅 {new Date(card.dueDate).toLocaleDateString()}</span>
            )}
            {card.checklist?.length > 0 && (
              <span style={styles.checklistBadge}>
                ✓ {card.checklist.filter(i => i.completed).length}/{card.checklist.length}
              </span>
            )}
          </div>
          {card.assignees?.length > 0 && (
            <div style={styles.assignees}>
              {card.assignees.slice(0, 3).map((a, i) => (
                <div key={i} style={{ marginLeft: i > 0 ? '-6px' : 0 }}>
                  <Avatar name={a.name} size={22} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Draggable>
  )
}

const styles = {
  card: {
    background: '#252840', borderRadius: '10px', padding: '12px',
    cursor: 'pointer', border: '1px solid #2d3148',
    position: 'relative', overflow: 'hidden',
  },
  priorityBar: { position: 'absolute', top: 0, left: 0, right: 0, height: '3px' },
  title: { color: '#e2e8f0', fontSize: '14px', fontWeight: '500', marginBottom: '8px', paddingTop: '4px', lineHeight: '1.4' },
  meta: { display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '8px' },
  priorityBadge: { fontSize: '11px', fontWeight: '700', textTransform: 'capitalize' },
  dueDate: { color: '#94a3b8', fontSize: '11px' },
  checklistBadge: { color: '#94a3b8', fontSize: '11px' },
  assignees: { display: 'flex', alignItems: 'center' },
}