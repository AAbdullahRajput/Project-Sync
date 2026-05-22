import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import api from '../services/api'
import useAuth from '../hooks/useAuth'
import toast from 'react-hot-toast'

export default function BoardPage() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const [project, setProject] = useState(null)
  const [columns, setColumns] = useState([])
  const [cards, setCards] = useState({}) // { columnId: [cards] }
  const [loading, setLoading] = useState(true)

  // Add column state
  const [addingColumn, setAddingColumn] = useState(false)
  const [newColName, setNewColName] = useState('')

  // Add card state
  const [addingCard, setAddingCard] = useState(null) // columnId
  const [newCardTitle, setNewCardTitle] = useState('')

  // Card detail modal
  const [selectedCard, setSelectedCard] = useState(null)
  const [cardComments, setCardComments] = useState([])
  const [newComment, setNewComment] = useState('')

  // Load project + columns + cards
  useEffect(() => {
    const loadBoard = async () => {
      try {
        const projRes = await api.get(`/projects/${projectId}`)
        setProject(projRes.data)

        const colRes = await api.get(`/columns/${projectId}`)
        setColumns(colRes.data)

        const cardMap = {}
        await Promise.all(
          colRes.data.map(async (col) => {
            const cardRes = await api.get(`/cards/${col._id}`)
            cardMap[col._id] = cardRes.data
          })
        )
        setCards(cardMap)
      } catch (err) {
        toast.error('Failed to load board')
        navigate('/dashboard')
      } finally {
        setLoading(false)
      }
    }
    loadBoard()
  }, [projectId])

  // Drag and drop handler
  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result
    if (!destination) return
    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    const sourceCol = source.droppableId
    const destCol = destination.droppableId

    const sourceCards = [...(cards[sourceCol] || [])]
    const destCards = sourceCol === destCol ? sourceCards : [...(cards[destCol] || [])]

    const [movedCard] = sourceCards.splice(source.index, 1)

    if (sourceCol === destCol) {
      sourceCards.splice(destination.index, 0, movedCard)
      setCards({ ...cards, [sourceCol]: sourceCards })
    } else {
      destCards.splice(destination.index, 0, movedCard)
      setCards({ ...cards, [sourceCol]: sourceCards, [destCol]: destCards })
    }

    try {
      await api.put(`/cards/${draggableId}/move`, {
        columnId: destCol,
        order: destination.index,
      })
    } catch {
      toast.error('Failed to move card')
    }
  }

  // Add new column
  const handleAddColumn = async (e) => {
    e.preventDefault()
    if (!newColName.trim()) return
    try {
      const res = await api.post('/columns', { name: newColName, projectId })
      setColumns([...columns, res.data])
      setCards({ ...cards, [res.data._id]: [] })
      setNewColName('')
      setAddingColumn(false)
      toast.success('Column added!')
    } catch {
      toast.error('Failed to add column')
    }
  }

  // Add new card
  const handleAddCard = async (e, columnId) => {
    e.preventDefault()
    if (!newCardTitle.trim()) return
    try {
      const res = await api.post('/cards', { title: newCardTitle, columnId, projectId })
      setCards({ ...cards, [columnId]: [...(cards[columnId] || []), res.data] })
      setNewCardTitle('')
      setAddingCard(null)
      toast.success('Card added!')
    } catch {
      toast.error('Failed to add card')
    }
  }

  // Delete column
  const handleDeleteColumn = async (colId) => {
    if (!window.confirm('Delete this column and all its cards?')) return
    await api.delete(`/columns/${colId}`)
    setColumns(columns.filter(c => c._id !== colId))
    const newCards = { ...cards }
    delete newCards[colId]
    setCards(newCards)
    toast.success('Column deleted')
  }

  // Delete card
  const handleDeleteCard = async (cardId, colId) => {
    await api.delete(`/cards/${cardId}`)
    setCards({ ...cards, [colId]: cards[colId].filter(c => c._id !== cardId) })
    setSelectedCard(null)
    toast.success('Card deleted')
  }

  // Open card modal + load comments
  const openCard = async (card) => {
    setSelectedCard(card)
    try {
      const res = await api.get(`/comments/${card._id}`)
      setCardComments(res.data)
    } catch {
      setCardComments([])
    }
  }

  // Post comment
  const handleComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return
    try {
      const res = await api.post(`/comments/${selectedCard._id}`, { text: newComment })
      setCardComments([...cardComments, res.data])
      setNewComment('')
    } catch {
      toast.error('Failed to post comment')
    }
  }

  // Delete comment
  const handleDeleteComment = async (commentId) => {
    await api.delete(`/comments/${commentId}`)
    setCardComments(cardComments.filter(c => c._id !== commentId))
  }

  // Priority colors
  const priorityColor = { low: '#22c55e', medium: '#f59e0b', high: '#ef4444', critical: '#7c3aed' }

  if (loading) {
    return (
      <div style={styles.loadingPage}>
        <p style={styles.loadingText}>Loading board...</p>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      {/* Top Navbar */}
      <header style={{ ...styles.navbar, borderBottom: `3px solid ${project?.color || '#6366f1'}` }}>
        <div style={styles.navLeft}>
          <Link to="/dashboard" style={styles.backBtn}>← Dashboard</Link>
          <h1 style={styles.projectName}>{project?.name}</h1>
        </div>
        <div style={styles.navRight}>
          <Link to={`/projects/${projectId}/settings`} style={styles.navLink}>⚙ Settings</Link>
          <Link to="/notifications" style={styles.navLink}>🔔</Link>
          <Link to="/profile" style={styles.navLink}>👤 {user?.name?.split(' ')[0]}</Link>
          <button onClick={logout} style={styles.logoutBtn}>Logout</button>
        </div>
      </header>

      {/* Kanban Board */}
      <div style={styles.board}>
        <DragDropContext onDragEnd={onDragEnd}>
          {columns.map((col) => (
            <div key={col._id} style={styles.column}>
              {/* Column Header */}
              <div style={styles.colHeader}>
                <span style={styles.colName}>{col.name}</span>
                <div style={styles.colHeaderRight}>
                  <span style={styles.cardCount}>{(cards[col._id] || []).length}</span>
                  <button
                    onClick={() => handleDeleteColumn(col._id)}
                    style={styles.colDeleteBtn}
                    title="Delete column"
                  >✕</button>
                </div>
              </div>

              {/* Cards Droppable */}
              <Droppable droppableId={col._id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      ...styles.cardList,
                      background: snapshot.isDraggingOver ? '#1e2240' : 'transparent',
                    }}
                  >
                    {(cards[col._id] || []).map((card, index) => (
                      <Draggable key={card._id} draggableId={card._id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...styles.card,
                              ...provided.draggableProps.style,
                              boxShadow: snapshot.isDragging ? '0 8px 24px rgba(0,0,0,0.4)' : 'none',
                              opacity: snapshot.isDragging ? 0.9 : 1,
                            }}
                            onClick={() => openCard(card)}
                          >
                            {/* Priority bar */}
                            <div style={{
                              ...styles.priorityBar,
                              background: priorityColor[card.priority] || '#6366f1'
                            }} />
                            <p style={styles.cardTitle}>{card.title}</p>
                            <div style={styles.cardMeta}>
                              <span style={{
                                ...styles.priorityBadge,
                                color: priorityColor[card.priority] || '#6366f1'
                              }}>
                                {card.priority}
                              </span>
                              {card.dueDate && (
                                <span style={styles.dueDate}>
                                  📅 {new Date(card.dueDate).toLocaleDateString()}
                                </span>
                              )}
                              {card.checklist?.length > 0 && (
                                <span style={styles.checklist}>
                                  ✓ {card.checklist.filter(i => i.completed).length}/{card.checklist.length}
                                </span>
                              )}
                            </div>
                            {card.assignees?.length > 0 && (
                              <div style={styles.assignees}>
                                {card.assignees.map((a, i) => (
                                  <div key={i} style={styles.assigneeAvatar}>
                                    {a.name?.charAt(0).toUpperCase()}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}

                    {/* Add Card Form */}
                    {addingCard === col._id ? (
                      <form onSubmit={(e) => handleAddCard(e, col._id)} style={styles.addCardForm}>
                        <input
                          autoFocus
                          value={newCardTitle}
                          onChange={e => setNewCardTitle(e.target.value)}
                          placeholder="Card title..."
                          style={styles.addCardInput}
                        />
                        <div style={styles.addCardBtns}>
                          <button type="submit" style={styles.addCardSubmit}>Add</button>
                          <button type="button" onClick={() => setAddingCard(null)} style={styles.addCardCancel}>✕</button>
                        </div>
                      </form>
                    ) : (
                      <button
                        onClick={() => { setAddingCard(col._id); setNewCardTitle('') }}
                        style={styles.addCardBtn}
                      >
                        + Add card
                      </button>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </DragDropContext>

        {/* Add Column */}
        <div style={styles.addColWrapper}>
          {addingColumn ? (
            <form onSubmit={handleAddColumn} style={styles.addColForm}>
              <input
                autoFocus
                value={newColName}
                onChange={e => setNewColName(e.target.value)}
                placeholder="Column name..."
                style={styles.addColInput}
              />
              <div style={styles.addColBtns}>
                <button type="submit" style={styles.addColSubmit}>Add Column</button>
                <button type="button" onClick={() => setAddingColumn(false)} style={styles.addColCancel}>✕</button>
              </div>
            </form>
          ) : (
            <button onClick={() => setAddingColumn(true)} style={styles.addColBtn}>
              + Add Column
            </button>
          )}
        </div>
      </div>

      {/* Card Detail Modal */}
      {selectedCard && (
        <div style={styles.overlay} onClick={() => setSelectedCard(null)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>{selectedCard.title}</h2>
              <button onClick={() => setSelectedCard(null)} style={styles.closeBtn}>✕</button>
            </div>

            <div style={styles.modalBody}>
              {/* Left side */}
              <div style={styles.modalLeft}>
                <div style={styles.modalSection}>
                  <h4 style={styles.sectionLabel}>Description</h4>
                  <p style={styles.descText}>
                    {selectedCard.description || 'No description added.'}
                  </p>
                </div>

                {selectedCard.checklist?.length > 0 && (
                  <div style={styles.modalSection}>
                    <h4 style={styles.sectionLabel}>
                      Checklist ({selectedCard.checklist.filter(i => i.completed).length}/{selectedCard.checklist.length})
                    </h4>
                    <div style={styles.checklistItems}>
                      {selectedCard.checklist.map((item, i) => (
                        <div key={i} style={styles.checklistItem}>
                          <span style={{ color: item.completed ? '#22c55e' : '#475569' }}>
                            {item.completed ? '✓' : '○'}
                          </span>
                          <span style={{ color: item.completed ? '#94a3b8' : '#e2e8f0', textDecoration: item.completed ? 'line-through' : 'none' }}>
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Comments */}
                <div style={styles.modalSection}>
                  <h4 style={styles.sectionLabel}>Comments ({cardComments.length})</h4>
                  <div style={styles.commentsList}>
                    {cardComments.map(comment => (
                      <div key={comment._id} style={styles.commentItem}>
                        <div style={styles.commentAvatar}>
                          {comment.author?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div style={styles.commentContent}>
                          <div style={styles.commentHeader}>
                            <span style={styles.commentAuthor}>{comment.author?.name}</span>
                            <span style={styles.commentTime}>
                              {new Date(comment.createdAt).toLocaleDateString()}
                            </span>
                            {comment.author?._id === user?._id && (
                              <button
                                onClick={() => handleDeleteComment(comment._id)}
                                style={styles.commentDelete}
                              >✕</button>
                            )}
                          </div>
                          <p style={styles.commentText}>{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleComment} style={styles.commentForm}>
                    <input
                      value={newComment}
                      onChange={e => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      style={styles.commentInput}
                    />
                    <button type="submit" style={styles.commentSubmit}>Send</button>
                  </form>
                </div>
              </div>

              {/* Right side - metadata */}
              <div style={styles.modalRight}>
                <div style={styles.metaItem}>
                  <span style={styles.metaLabel}>Priority</span>
                  <span style={{ ...styles.metaBadge, color: priorityColor[selectedCard.priority] }}>
                    {selectedCard.priority}
                  </span>
                </div>
                {selectedCard.dueDate && (
                  <div style={styles.metaItem}>
                    <span style={styles.metaLabel}>Due Date</span>
                    <span style={styles.metaValue}>
                      {new Date(selectedCard.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {selectedCard.labels?.length > 0 && (
                  <div style={styles.metaItem}>
                    <span style={styles.metaLabel}>Labels</span>
                    <div style={styles.labels}>
                      {selectedCard.labels.map((l, i) => (
                        <span key={i} style={{ ...styles.labelBadge, background: l.color }}>{l.text}</span>
                      ))}
                    </div>
                  </div>
                )}
                <div style={styles.metaItem}>
                  <span style={styles.metaLabel}>Created</span>
                  <span style={styles.metaValue}>
                    {new Date(selectedCard.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteCard(selectedCard._id, selectedCard.column)}
                  style={styles.deleteCardBtn}
                >
                  🗑 Delete Card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  loadingPage: {
    minHeight: '100vh', background: '#0f1117',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  loadingText: { color: '#94a3b8', fontSize: '16px' },
  page: { minHeight: '100vh', background: '#0f1117', display: 'flex', flexDirection: 'column' },
  navbar: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '0 24px', height: '56px', background: '#1a1d2e', flexShrink: 0,
  },
  navLeft: { display: 'flex', alignItems: 'center', gap: '16px' },
  backBtn: { color: '#94a3b8', fontSize: '13px', textDecoration: 'none', fontWeight: '500' },
  projectName: { color: '#f1f5f9', fontSize: '18px', fontWeight: '700' },
  navRight: { display: 'flex', alignItems: 'center', gap: '12px' },
  navLink: { color: '#94a3b8', fontSize: '13px', textDecoration: 'none', fontWeight: '500' },
  logoutBtn: {
    background: 'transparent', border: '1px solid #2d3148',
    color: '#94a3b8', borderRadius: '6px', padding: '5px 12px', fontSize: '12px',
  },
  board: {
    display: 'flex', gap: '16px', padding: '24px',
    overflowX: 'auto', flex: 1, alignItems: 'flex-start',
  },
  column: {
    background: '#1a1d2e', borderRadius: '12px', border: '1px solid #2d3148',
    width: '280px', minWidth: '280px', display: 'flex', flexDirection: 'column',
    maxHeight: 'calc(100vh - 120px)',
  },
  colHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '14px 16px', borderBottom: '1px solid #2d3148',
  },
  colName: { color: '#f1f5f9', fontSize: '14px', fontWeight: '600' },
  colHeaderRight: { display: 'flex', alignItems: 'center', gap: '8px' },
  cardCount: {
    background: '#252840', color: '#94a3b8', borderRadius: '12px',
    padding: '2px 8px', fontSize: '12px', fontWeight: '600',
  },
  colDeleteBtn: {
    background: 'transparent', border: 'none', color: '#475569',
    fontSize: '14px', cursor: 'pointer', lineHeight: 1,
  },
  cardList: {
    padding: '10px', display: 'flex', flexDirection: 'column',
    gap: '8px', overflowY: 'auto', flex: 1, minHeight: '60px', borderRadius: '0 0 12px 12px',
  },
  card: {
    background: '#252840', borderRadius: '10px', padding: '12px',
    cursor: 'pointer', border: '1px solid #2d3148', position: 'relative', overflow: 'hidden',
  },
  priorityBar: { position: 'absolute', top: 0, left: 0, right: 0, height: '3px' },
  cardTitle: { color: '#e2e8f0', fontSize: '14px', fontWeight: '500', marginBottom: '8px', paddingTop: '4px' },
  cardMeta: { display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '8px' },
  priorityBadge: { fontSize: '11px', fontWeight: '600', textTransform: 'capitalize' },
  dueDate: { color: '#94a3b8', fontSize: '11px' },
  checklist: { color: '#94a3b8', fontSize: '11px' },
  assignees: { display: 'flex', gap: '4px' },
  assigneeAvatar: {
    width: '22px', height: '22px', borderRadius: '50%', background: '#4f46e5',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '10px', fontWeight: '700', color: '#fff',
  },
  addCardForm: { display: 'flex', flexDirection: 'column', gap: '6px', padding: '4px 0' },
  addCardInput: {
    background: '#0f1117', border: '1px solid #6366f1', borderRadius: '6px',
    padding: '8px 10px', color: '#e2e8f0', fontSize: '13px', outline: 'none',
  },
  addCardBtns: { display: 'flex', gap: '6px' },
  addCardSubmit: {
    background: '#6366f1', color: '#fff', border: 'none',
    borderRadius: '6px', padding: '6px 14px', fontSize: '13px', fontWeight: '600',
  },
  addCardCancel: {
    background: 'transparent', border: '1px solid #2d3148',
    color: '#94a3b8', borderRadius: '6px', padding: '6px 10px', fontSize: '13px',
  },
  addCardBtn: {
    background: 'transparent', border: 'none', color: '#475569',
    fontSize: '13px', textAlign: 'left', padding: '8px 4px', width: '100%',
  },
  addColWrapper: { minWidth: '240px' },
  addColForm: {
    background: '#1a1d2e', border: '1px solid #2d3148', borderRadius: '12px',
    padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px',
  },
  addColInput: {
    background: '#0f1117', border: '1px solid #6366f1', borderRadius: '6px',
    padding: '8px 10px', color: '#e2e8f0', fontSize: '13px', outline: 'none',
  },
  addColBtns: { display: 'flex', gap: '6px' },
  addColSubmit: {
    background: '#6366f1', color: '#fff', border: 'none',
    borderRadius: '6px', padding: '8px 16px', fontSize: '13px', fontWeight: '600',
  },
  addColCancel: {
    background: 'transparent', border: '1px solid #2d3148',
    color: '#94a3b8', borderRadius: '6px', padding: '8px 10px', fontSize: '13px',
  },
  addColBtn: {
    background: '#1a1d2e', border: '2px dashed #2d3148', color: '#475569',
    borderRadius: '12px', padding: '16px 24px', fontSize: '14px',
    fontWeight: '600', width: '100%', cursor: 'pointer',
  },
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px',
  },
  modal: {
    background: '#1a1d2e', border: '1px solid #2d3148', borderRadius: '16px',
    width: '100%', maxWidth: '800px', maxHeight: '90vh', overflow: 'hidden',
    display: 'flex', flexDirection: 'column',
  },
  modalHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '20px 24px', borderBottom: '1px solid #2d3148',
  },
  modalTitle: { color: '#f1f5f9', fontSize: '18px', fontWeight: '700' },
  closeBtn: {
    background: 'transparent', border: 'none', color: '#475569', fontSize: '18px',
  },
  modalBody: { display: 'flex', flex: 1, overflow: 'hidden' },
  modalLeft: { flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' },
  modalRight: {
    width: '200px', borderLeft: '1px solid #2d3148', padding: '24px',
    display: 'flex', flexDirection: 'column', gap: '16px',
  },
  modalSection: {},
  sectionLabel: { color: '#94a3b8', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '10px' },
  descText: { color: '#e2e8f0', fontSize: '14px', lineHeight: '1.6' },
  checklistItems: { display: 'flex', flexDirection: 'column', gap: '8px' },
  checklistItem: { display: 'flex', gap: '10px', alignItems: 'center', fontSize: '14px' },
  commentsList: { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '14px' },
  commentItem: { display: 'flex', gap: '10px' },
  commentAvatar: {
    width: '30px', height: '30px', borderRadius: '50%', background: '#6366f1',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '12px', fontWeight: '700', color: '#fff', flexShrink: 0,
  },
  commentContent: { flex: 1 },
  commentHeader: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' },
  commentAuthor: { color: '#e2e8f0', fontSize: '13px', fontWeight: '600' },
  commentTime: { color: '#475569', fontSize: '11px' },
  commentDelete: { background: 'transparent', border: 'none', color: '#475569', fontSize: '12px', marginLeft: 'auto' },
  commentText: { color: '#94a3b8', fontSize: '13px', lineHeight: '1.5' },
  commentForm: { display: 'flex', gap: '8px' },
  commentInput: {
    flex: 1, background: '#0f1117', border: '1px solid #2d3148', borderRadius: '8px',
    padding: '8px 12px', color: '#e2e8f0', fontSize: '13px', outline: 'none',
  },
  commentSubmit: {
    background: '#6366f1', color: '#fff', border: 'none',
    borderRadius: '8px', padding: '8px 16px', fontSize: '13px', fontWeight: '600',
  },
  metaItem: { display: 'flex', flexDirection: 'column', gap: '4px' },
  metaLabel: { color: '#475569', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase' },
  metaValue: { color: '#e2e8f0', fontSize: '13px' },
  metaBadge: { fontSize: '13px', fontWeight: '600', textTransform: 'capitalize' },
  labels: { display: 'flex', flexWrap: 'wrap', gap: '4px' },
  labelBadge: { borderRadius: '4px', padding: '2px 8px', fontSize: '11px', color: '#fff', fontWeight: '600' },
  deleteCardBtn: {
    background: 'transparent', border: '1px solid #ef4444', color: '#ef4444',
    borderRadius: '8px', padding: '8px 12px', fontSize: '13px', fontWeight: '600', marginTop: 'auto',
  },
}