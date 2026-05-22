import { useState } from 'react'
import CardPriority from './CardPriority'
import CardDueDate from './CardDueDate'
import CardLabels from './CardLabels'
import CardChecklist from './CardChecklist'
import CardAssignees from './CardAssignees'
import CommentList from '../Comments/CommentList'
import CommentForm from '../Comments/CommentForm'
import api from '../../services/api'
import toast from 'react-hot-toast'

export default function CardModal({ card, projectMembers = [], onClose, onDelete, onUpdate }) {
  const [data, setData] = useState({ ...card })
  const [comments, setComments] = useState([])
  const [saving, setSaving] = useState(false)

  const save = async (updates) => {
    const updated = { ...data, ...updates }
    setData(updated)
    setSaving(true)
    try {
      await api.put(`/cards/${card._id}`, updates)
      onUpdate?.(updated)
    } catch {
      toast.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>{data.title}</h2>
          <div style={styles.headerRight}>
            {saving && <span style={styles.saving}>Saving...</span>}
            <button onClick={onClose} style={styles.closeBtn}>✕</button>
          </div>
        </div>

        <div style={styles.body}>
          {/* Left */}
          <div style={styles.left}>
            <Section label="Description">
              <textarea
                value={data.description || ''}
                onChange={e => setData({ ...data, description: e.target.value })}
                onBlur={e => save({ description: e.target.value })}
                placeholder="Add a description..."
                rows={4}
                style={styles.textarea}
              />
            </Section>

            <Section label={`Checklist (${data.checklist?.filter(i => i.completed).length || 0}/${data.checklist?.length || 0})`}>
              <CardChecklist
                checklist={data.checklist || []}
                onChange={val => save({ checklist: val })}
              />
            </Section>

            <Section label="Labels">
              <CardLabels
                labels={data.labels || []}
                onChange={val => save({ labels: val })}
              />
            </Section>

            <Section label={`Comments`}>
              <CommentList cardId={card._id} comments={comments} setComments={setComments} />
              <CommentForm cardId={card._id} onAdd={c => setComments(prev => [...prev, c])} />
            </Section>
          </div>

          {/* Right sidebar */}
          <div style={styles.right}>
            <Section label="Priority">
              <CardPriority value={data.priority} onChange={val => save({ priority: val })} />
            </Section>

            <Section label="Due Date">
              <CardDueDate value={data.dueDate} onChange={val => save({ dueDate: val })} />
            </Section>

            <Section label="Assignees">
              <CardAssignees
                assignees={data.assignees || []}
                members={projectMembers}
                onChange={val => save({ assignees: val })}
              />
            </Section>

            <button onClick={() => { onDelete(card._id); onClose() }} style={styles.deleteBtn}>
              🗑 Delete Card
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ label, children }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <p style={{ color: '#475569', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>
        {label}
      </p>
      {children}
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px',
  },
  modal: {
    background: '#1a1d2e', border: '1px solid #2d3148', borderRadius: '16px',
    width: '100%', maxWidth: '820px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden',
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '20px 24px', borderBottom: '1px solid #2d3148',
  },
  title: { color: '#f1f5f9', fontSize: '18px', fontWeight: '700', margin: 0 },
  headerRight: { display: 'flex', alignItems: 'center', gap: '12px' },
  saving: { color: '#94a3b8', fontSize: '12px' },
  closeBtn: {
    background: 'transparent', border: 'none', color: '#475569', fontSize: '18px', cursor: 'pointer',
  },
  body: { display: 'flex', flex: 1, overflow: 'hidden' },
  left: { flex: 1, padding: '24px', overflowY: 'auto' },
  right: { width: '220px', borderLeft: '1px solid #2d3148', padding: '24px', overflowY: 'auto' },
  textarea: {
    width: '100%', background: '#0f1117', border: '1px solid #2d3148', borderRadius: '8px',
    padding: '10px 12px', color: '#e2e8f0', fontSize: '14px', outline: 'none',
    resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box',
  },
  deleteBtn: {
    width: '100%', background: 'transparent', border: '1px solid #ef4444',
    color: '#ef4444', borderRadius: '8px', padding: '10px', fontSize: '13px',
    fontWeight: '600', cursor: 'pointer', marginTop: '16px',
  },
}