import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import api from '../services/api'
import useAuth from '../hooks/useAuth'
import toast from 'react-hot-toast'

// ─── SVG Icon Components ──────────────────────────────────────────────────────
const Icons = {
  ArrowLeft: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
    </svg>
  ),
  Settings: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  Bell: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  User: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  LogOut: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  Plus: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Trash: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14H6L5 6"/>
      <path d="M10 11v6M14 11v6"/>
      <path d="M9 6V4h6v2"/>
    </svg>
  ),
  X: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Check: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Calendar: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  CheckSquare: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 11 12 14 22 4"/>
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
    </svg>
  ),
  Users: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Send: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
  Tag: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
      <line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  ),
  Flag: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
      <line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
  ),
  AlignLeft: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="17" y1="10" x2="3" y2="10"/>
      <line x1="21" y1="6" x2="3" y2="6"/>
      <line x1="21" y1="14" x2="3" y2="14"/>
      <line x1="13" y1="18" x2="3" y2="18"/>
    </svg>
  ),
  MessageSquare: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  GripVertical: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="6" r="1" fill="currentColor"/>
      <circle cx="9" cy="12" r="1" fill="currentColor"/>
      <circle cx="9" cy="18" r="1" fill="currentColor"/>
      <circle cx="15" cy="6" r="1" fill="currentColor"/>
      <circle cx="15" cy="12" r="1" fill="currentColor"/>
      <circle cx="15" cy="18" r="1" fill="currentColor"/>
    </svg>
  ),
  MoreHorizontal: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="5" cy="12" r="1.5" fill="currentColor"/>
      <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
      <circle cx="19" cy="12" r="1.5" fill="currentColor"/>
    </svg>
  ),
  Clock: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
const Logo = () => (
  <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
    <rect width="28" height="28" rx="8" fill="url(#bLogoGrad)"/>
    <path d="M8 14h12M14 8v12" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="14" cy="14" r="3" fill="white" fillOpacity="0.25"/>
    <defs>
      <linearGradient id="bLogoGrad" x1="0" y1="0" x2="28" y2="28">
        <stop stopColor="#6366f1"/>
        <stop offset="1" stopColor="#8b5cf6"/>
      </linearGradient>
    </defs>
  </svg>
)

export default function BoardPage() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const [project, setProject] = useState(null)
  const [columns, setColumns] = useState([])
  const [cards, setCards] = useState({})
  const [loading, setLoading] = useState(true)

  const [addingColumn, setAddingColumn] = useState(false)
  const [newColName, setNewColName] = useState('')

  const [addingCard, setAddingCard] = useState(null)
  const [newCardTitle, setNewCardTitle] = useState('')

  const [selectedCard, setSelectedCard] = useState(null)
  const [cardComments, setCardComments] = useState([])
  const [newComment, setNewComment] = useState('')

  const [colMenuOpen, setColMenuOpen] = useState(null)

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
      } catch {
        toast.error('Failed to load board')
        navigate('/dashboard')
      } finally {
        setLoading(false)
      }
    }
    loadBoard()
  }, [projectId])

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
      await api.put(`/cards/${draggableId}/move`, { columnId: destCol, order: destination.index })
    } catch {
      toast.error('Failed to move card')
    }
  }

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

  const handleDeleteColumn = async (colId) => {
    if (!window.confirm('Delete this column and all its cards?')) return
    await api.delete(`/columns/${colId}`)
    setColumns(columns.filter(c => c._id !== colId))
    const newCards = { ...cards }
    delete newCards[colId]
    setCards(newCards)
    setColMenuOpen(null)
    toast.success('Column deleted')
  }

  const handleDeleteCard = async (cardId, colId) => {
    await api.delete(`/cards/${cardId}`)
    setCards({ ...cards, [colId]: cards[colId].filter(c => c._id !== cardId) })
    setSelectedCard(null)
    toast.success('Card deleted')
  }

  const openCard = async (card) => {
    setSelectedCard(card)
    try {
      const res = await api.get(`/comments/${card._id}`)
      setCardComments(res.data)
    } catch {
      setCardComments([])
    }
  }

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

  const handleDeleteComment = async (commentId) => {
    await api.delete(`/comments/${commentId}`)
    setCardComments(cardComments.filter(c => c._id !== commentId))
  }

  const priorityConfig = {
    low:      { color: '#22c55e', bg: 'rgba(34,197,94,0.12)',   label: 'Low' },
    medium:   { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  label: 'Medium' },
    high:     { color: '#ef4444', bg: 'rgba(239,68,68,0.12)',   label: 'High' },
    critical: { color: '#a855f7', bg: 'rgba(168,85,247,0.12)',  label: 'Critical' },
  }

  const totalCards = Object.values(cards).reduce((s, arr) => s + arr.length, 0)

  if (loading) {
    return (
      <div style={s.loadingPage}>
        <div style={s.loadingInner}>
          <Logo />
          <p style={s.loadingText}>Loading board...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .board-page { font-family: 'DM Sans', sans-serif; }

        /* ── Navbar ── */
        .board-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 54px;
          padding: 0 20px;
          background: #0d1020;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          flex-shrink: 0;
          position: sticky;
          top: 0;
          z-index: 80;
          gap: 12px;
        }

        .nav-left { display: flex; align-items: center; gap: 16px; min-width: 0; }

        .back-link {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #8892b4;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          padding: 5px 10px;
          border-radius: 7px;
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.18s;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .back-link:hover { color: #e2e8f0; border-color: rgba(255,255,255,0.16); background: rgba(255,255,255,0.04); }

        .project-title {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .project-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .nav-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

        .nav-icon-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #8892b4;
          font-size: 12.5px;
          font-weight: 500;
          text-decoration: none;
          padding: 5px 10px;
          border-radius: 7px;
          transition: all 0.18s;
          white-space: nowrap;
          border: 1px solid transparent;
        }

        .nav-icon-btn:hover { color: #e2e8f0; background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.08); }

        .logout-btn-nav {
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: #8892b4;
          border-radius: 7px;
          padding: 5px 12px;
          font-size: 12.5px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.18s;
        }

        .logout-btn-nav:hover { color: #fca5a5; border-color: rgba(239,68,68,0.35); background: rgba(239,68,68,0.06); }

        .nav-divider { width: 1px; height: 20px; background: rgba(255,255,255,0.1); }

        /* ── Board Stats Bar ── */
        .board-stats {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 10px 24px;
          background: #080b14;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .board-stat {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #8892b4;
        }

        .board-stat-value { color: #e2e8f0; font-weight: 600; }

        .board-stat-sep { color: rgba(255,255,255,0.15); font-size: 14px; }

        /* ── Board Container ── */
        .board {
          display: flex;
          gap: 16px;
          padding: 20px 24px;
          overflow-x: auto;
          flex: 1;
          align-items: flex-start;
          min-height: calc(100vh - 113px);
        }

        .board::-webkit-scrollbar { height: 6px; }
        .board::-webkit-scrollbar-track { background: transparent; }
        .board::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
        .board::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.18); }

        /* ── Column ── */
        .column {
          background: #0d1020;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          width: 284px;
          min-width: 284px;
          display: flex;
          flex-direction: column;
          max-height: calc(100vh - 153px);
        }

        .col-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 13px 14px 12px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          gap: 8px;
        }

        .col-header-left { display: flex; align-items: center; gap: 8px; min-width: 0; }

        .col-accent-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .col-name {
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #e2e8f0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .col-count {
          font-size: 11px;
          font-weight: 600;
          color: #8892b4;
          background: rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 2px 7px;
          flex-shrink: 0;
        }

        .col-header-right { display: flex; align-items: center; gap: 2px; flex-shrink: 0; position: relative; }

        .col-icon-btn {
          width: 28px; height: 28px;
          display: flex; align-items: center; justify-content: center;
          border: none;
          background: transparent;
          color: #4a5580;
          border-radius: 7px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .col-icon-btn:hover { color: #e2e8f0; background: rgba(255,255,255,0.08); }

        .col-menu {
          position: absolute;
          top: 32px;
          right: 0;
          background: #131629;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 5px;
          min-width: 150px;
          z-index: 50;
          box-shadow: 0 12px 28px rgba(0,0,0,0.5);
        }

        .col-menu-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          border-radius: 7px;
          font-size: 12.5px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
          border: none;
          background: transparent;
          width: 100%;
          font-family: 'DM Sans', sans-serif;
        }

        .col-menu-item-danger { color: #f87171; }
        .col-menu-item-danger:hover { background: rgba(239,68,68,0.1); }

        /* ── Card List ── */
        .card-list {
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          overflow-y: auto;
          flex: 1;
          min-height: 60px;
        }

        .card-list::-webkit-scrollbar { width: 4px; }
        .card-list::-webkit-scrollbar-track { background: transparent; }
        .card-list::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }

        /* ── Task Card ── */
        .task-card {
          background: #131629;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 11px;
          padding: 12px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: border-color 0.18s, transform 0.15s;
        }

        .task-card:hover { border-color: rgba(255,255,255,0.16); transform: translateY(-1px); }

        .priority-strip { position: absolute; top: 0; left: 0; right: 0; height: 3px; }

        .card-drag-handle {
          position: absolute;
          top: 10px; right: 8px;
          color: rgba(255,255,255,0.15);
          opacity: 0;
          transition: opacity 0.15s;
        }

        .task-card:hover .card-drag-handle { opacity: 1; }

        .card-title {
          font-size: 13.5px;
          font-weight: 500;
          color: #e2e8f0;
          line-height: 1.45;
          margin-bottom: 10px;
          padding-top: 5px;
          padding-right: 20px;
        }

        .card-labels { display: flex; gap: 5px; flex-wrap: wrap; margin-bottom: 9px; }

        .card-label-badge {
          font-size: 10px;
          font-weight: 600;
          border-radius: 4px;
          padding: 2px 7px;
          letter-spacing: 0.2px;
        }

        .card-meta { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }

        .card-meta-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: #8892b4;
          font-weight: 500;
        }

        .priority-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 10.5px;
          font-weight: 600;
          border-radius: 6px;
          padding: 2px 8px;
          letter-spacing: 0.2px;
        }

        .card-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 10px;
          padding-top: 9px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .assignee-stack { display: flex; align-items: center; }

        .assignee-bubble {
          width: 22px; height: 22px;
          border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 9px; font-weight: 700; color: #fff;
          border: 2px solid #131629;
        }

        /* ── Add Card ── */
        .add-card-form { display: flex; flex-direction: column; gap: 7px; padding: 2px 0; }

        .add-card-input {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(99,102,241,0.5);
          border-radius: 8px;
          padding: 8px 10px;
          color: #e2e8f0;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          width: 100%;
        }

        .add-card-input:focus { border-color: rgba(99,102,241,0.8); background: rgba(99,102,241,0.06); }

        .add-card-btns { display: flex; gap: 6px; }

        .btn-add-confirm {
          background: linear-gradient(135deg, #6366f1, #7c3aed);
          color: #fff;
          border: none;
          border-radius: 7px;
          padding: 6px 14px;
          font-size: 12.5px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: opacity 0.15s;
        }

        .btn-add-confirm:hover { opacity: 0.88; }

        .btn-add-cancel {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: #8892b4;
          border-radius: 7px;
          padding: 6px 10px;
          font-size: 12.5px;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.15s;
          display: flex; align-items: center; justify-content: center;
        }

        .btn-add-cancel:hover { color: #e2e8f0; border-color: rgba(255,255,255,0.2); }

        .btn-add-card {
          display: flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: none;
          color: #4a5580;
          font-size: 12.5px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          padding: 7px 4px;
          width: 100%;
          cursor: pointer;
          border-radius: 7px;
          transition: all 0.18s;
        }

        .btn-add-card:hover { color: #94a3c4; background: rgba(255,255,255,0.04); }

        /* ── Add Column ── */
        .add-col-wrapper { min-width: 260px; flex-shrink: 0; }

        .add-col-form {
          background: #0d1020;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .add-col-input {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(99,102,241,0.5);
          border-radius: 8px;
          padding: 9px 12px;
          color: #e2e8f0;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          width: 100%;
        }

        .add-col-input:focus { border-color: rgba(99,102,241,0.8); background: rgba(99,102,241,0.06); }

        .add-col-btns { display: flex; gap: 6px; }

        .btn-col-confirm {
          flex: 1;
          background: linear-gradient(135deg, #6366f1, #7c3aed);
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 8px 14px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: opacity 0.15s;
        }

        .btn-col-confirm:hover { opacity: 0.88; }

        .btn-col-cancel {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: #8892b4;
          border-radius: 8px;
          padding: 8px 10px;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.15s;
          display: flex; align-items: center; justify-content: center;
        }

        .btn-col-cancel:hover { color: #e2e8f0; border-color: rgba(255,255,255,0.2); }

        .btn-add-column {
          width: 100%;
          background: transparent;
          border: 2px dashed rgba(255,255,255,0.1);
          color: #4a5580;
          border-radius: 14px;
          padding: 18px 20px;
          font-size: 13.5px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
        }

        .btn-add-column:hover {
          color: #94a3c4;
          border-color: rgba(99,102,241,0.4);
          background: rgba(99,102,241,0.05);
        }

        /* ── Modal Overlay ── */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: bFadeIn 0.15s ease;
          padding: 16px;
        }

        @keyframes bFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes bSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .card-modal {
          background: #0d1020;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 18px;
          width: 100%;
          max-width: 820px;
          max-height: 88vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: bSlideUp 0.2s ease;
          box-shadow: 0 40px 80px rgba(0,0,0,0.7);
        }

        .modal-top-bar {
          height: 5px;
          width: 100%;
          flex-shrink: 0;
        }

        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 20px 24px 18px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          gap: 12px;
          flex-shrink: 0;
        }

        .modal-title-block { min-width: 0; flex: 1; }

        .modal-title {
          font-family: 'Syne', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.2px;
          line-height: 1.3;
          margin-bottom: 8px;
        }

        .modal-badges { display: flex; gap: 7px; flex-wrap: wrap; }

        .close-modal-btn {
          width: 32px; height: 32px;
          border-radius: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #8892b4;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.15s;
          flex-shrink: 0;
        }

        .close-modal-btn:hover { color: #f1f5f9; background: rgba(255,255,255,0.1); }

        .modal-body {
          display: flex;
          flex: 1;
          overflow: hidden;
          min-height: 0;
        }

        .modal-left {
          flex: 1;
          padding: 24px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 22px;
          min-width: 0;
        }

        .modal-left::-webkit-scrollbar { width: 4px; }
        .modal-left::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }

        .modal-right {
          width: 210px;
          flex-shrink: 0;
          border-left: 1px solid rgba(255,255,255,0.07);
          padding: 22px 18px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          overflow-y: auto;
        }

        .section-heading {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.9px;
          text-transform: uppercase;
          color: #8892b4;
          margin-bottom: 10px;
        }

        .desc-text {
          font-size: 13.5px;
          color: #94a3c4;
          line-height: 1.65;
          font-style: italic;
        }

        .checklist-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .checklist-item:last-child { border-bottom: none; }

        .check-circle {
          width: 18px; height: 18px;
          border-radius: 5px;
          border: 1.5px solid;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .checklist-progress-bar {
          height: 4px;
          border-radius: 2px;
          background: rgba(255,255,255,0.1);
          overflow: hidden;
          margin-bottom: 10px;
        }

        .checklist-progress-fill {
          height: 100%;
          border-radius: 2px;
          background: linear-gradient(90deg, #6366f1, #22c55e);
          transition: width 0.3s ease;
        }

        /* Comments */
        .comment-item {
          display: flex;
          gap: 10px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .comment-item:last-child { border-bottom: none; }

        .comment-avatar {
          width: 28px; height: 28px;
          border-radius: 8px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 11px; font-weight: 700; color: #fff;
          flex-shrink: 0;
        }

        .comment-body { flex: 1; min-width: 0; }

        .comment-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 5px;
        }

        .comment-author { font-size: 12.5px; font-weight: 600; color: #e2e8f0; }
        .comment-time { font-size: 11px; color: #4a5580; }

        .comment-del-btn {
          margin-left: auto;
          background: transparent;
          border: none;
          color: #4a5580;
          cursor: pointer;
          padding: 2px 5px;
          border-radius: 5px;
          font-size: 11px;
          display: flex; align-items: center;
          transition: all 0.15s;
        }

        .comment-del-btn:hover { color: #f87171; background: rgba(239,68,68,0.1); }

        .comment-text { font-size: 13px; color: #94a3c4; line-height: 1.55; }

        .comment-form {
          display: flex;
          gap: 8px;
          margin-top: 10px;
          align-items: flex-start;
        }

        .comment-input {
          flex: 1;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 9px;
          padding: 9px 12px;
          color: #e2e8f0;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: border-color 0.18s, background 0.18s;
          resize: none;
          min-height: 38px;
        }

        .comment-input:focus { border-color: rgba(99,102,241,0.5); background: rgba(99,102,241,0.06); }
        .comment-input::placeholder { color: #4a5580; }

        .comment-send-btn {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #6366f1, #7c3aed);
          border: none;
          border-radius: 9px;
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: opacity 0.15s;
        }

        .comment-send-btn:hover { opacity: 0.85; }

        /* Right panel */
        .meta-label {
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          color: #4a5580;
          margin-bottom: 7px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .meta-value { font-size: 12.5px; color: #e2e8f0; font-weight: 500; }

        .delete-card-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: transparent;
          border: 1px solid rgba(239,68,68,0.3);
          color: #f87171;
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 12.5px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          margin-top: auto;
          transition: all 0.18s;
          width: 100%;
        }

        .delete-card-btn:hover { background: rgba(239,68,68,0.1); border-color: rgba(239,68,68,0.5); }

        /* Dragging */
        .task-card.is-dragging {
          box-shadow: 0 10px 32px rgba(0,0,0,0.5);
          border-color: rgba(99,102,241,0.4);
          transform: rotate(1deg);
        }

        .droppable-zone { transition: background 0.18s; border-radius: 0 0 12px 12px; }

        /* Mobile responsive */
        @media (max-width: 640px) {
          .board-nav { padding: 0 12px; }
          .nav-label-text { display: none; }
          .board-stats { gap: 14px; padding: 8px 16px; overflow-x: auto; }
          .board { padding: 16px; gap: 12px; }
          .column { width: 260px; min-width: 260px; }
          .card-modal { max-height: 92vh; }
          .modal-body { flex-direction: column; }
          .modal-right { width: 100%; border-left: none; border-top: 1px solid rgba(255,255,255,0.07); padding: 16px; flex-direction: row; flex-wrap: wrap; gap: 14px; }
          .modal-right > div { flex: 1 1 120px; }
          .delete-card-btn { margin-top: 0; }
        }
      `}</style>

      <div className="board-page" style={{ minHeight: '100vh', background: '#080b14', display: 'flex', flexDirection: 'column' }}>

        {/* ══ NAVBAR ══ */}
        <header className="board-nav" style={{ borderBottom: `2px solid ${project?.color || '#6366f1'}22` }}>
          <div className="nav-left">
            <Link to="/dashboard" className="back-link">
              <Icons.ArrowLeft />
              <span className="nav-label-text">Dashboard</span>
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div className="project-dot" style={{ background: project?.color || '#6366f1' }} />
              <span className="project-title">{project?.name}</span>
            </div>
          </div>

          <div className="nav-right">
            <Link to={`/projects/${projectId}/settings`} className="nav-icon-btn">
              <Icons.Settings />
              <span className="nav-label-text">Settings</span>
            </Link>
            <Link to="/notifications" className="nav-icon-btn">
              <Icons.Bell />
            </Link>
            <div className="nav-divider" />
            <Link to="/profile" className="nav-icon-btn">
              <div style={{ width: 24, height: 24, borderRadius: 7, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#fff' }}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <span className="nav-label-text" style={{ fontSize: 12.5, color: '#e2e8f0' }}>{user?.name?.split(' ')[0]}</span>
            </Link>
            <button onClick={logout} className="logout-btn-nav">
              <Icons.LogOut />
              <span className="nav-label-text">Sign out</span>
            </button>
          </div>
        </header>

        {/* ══ STATS BAR ══ */}
        <div className="board-stats">
          <div className="board-stat">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
            <span className="board-stat-value">{columns.length}</span>
            <span>columns</span>
          </div>
          <span className="board-stat-sep">·</span>
          <div className="board-stat">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
            <span className="board-stat-value">{totalCards}</span>
            <span>cards</span>
          </div>
          <span className="board-stat-sep">·</span>
          <div className="board-stat">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span className="board-stat-value">{project?.members?.length || 0}</span>
            <span>members</span>
          </div>
        </div>

        {/* ══ BOARD ══ */}
        <div className="board" onClick={() => setColMenuOpen(null)}>
          <DragDropContext onDragEnd={onDragEnd}>
            {columns.map((col, colIndex) => {
              const colColors = ['#6366f1', '#ec4899', '#f59e0b', '#22c55e', '#3b82f6', '#8b5cf6', '#06b6d4', '#ef4444']
              const accentColor = colColors[colIndex % colColors.length]

              return (
                <div key={col._id} className="column">
                  <div className="col-header">
                    <div className="col-header-left">
                      <div className="col-accent-dot" style={{ background: accentColor }} />
                      <span className="col-name">{col.name}</span>
                      <span className="col-count">{(cards[col._id] || []).length}</span>
                    </div>
                    <div className="col-header-right">
                      <button
                        className="col-icon-btn"
                        onClick={(e) => { e.stopPropagation(); setAddingCard(col._id); setNewCardTitle('') }}
                        title="Add card"
                      >
                        <Icons.Plus />
                      </button>
                      <button
                        className="col-icon-btn"
                        onClick={(e) => { e.stopPropagation(); setColMenuOpen(colMenuOpen === col._id ? null : col._id) }}
                        title="Column options"
                      >
                        <Icons.MoreHorizontal />
                      </button>
                      {colMenuOpen === col._id && (
                        <div className="col-menu" onClick={e => e.stopPropagation()}>
                          <button
                            className="col-menu-item col-menu-item-danger"
                            onClick={() => handleDeleteColumn(col._id)}
                          >
                            <Icons.Trash /> Delete column
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <Droppable droppableId={col._id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="card-list droppable-zone"
                        style={{ background: snapshot.isDraggingOver ? 'rgba(99,102,241,0.07)' : 'transparent' }}
                      >
                        {(cards[col._id] || []).map((card, index) => {
                          const pc = priorityConfig[card.priority] || priorityConfig.medium
                          const checkDone = card.checklist?.filter(i => i.completed).length || 0
                          const checkTotal = card.checklist?.length || 0

                          return (
                            <Draggable key={card._id} draggableId={card._id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`task-card${snapshot.isDragging ? ' is-dragging' : ''}`}
                                  style={{ ...provided.draggableProps.style }}
                                  onClick={() => openCard(card)}
                                >
                                  <div className="priority-strip" style={{ background: pc.color }} />
                                  <div className="card-drag-handle"><Icons.GripVertical /></div>

                                  {card.labels?.length > 0 && (
                                    <div className="card-labels">
                                      {card.labels.map((l, i) => (
                                        <span key={i} className="card-label-badge" style={{ background: `${l.color}22`, color: l.color }}>
                                          {l.text}
                                        </span>
                                      ))}
                                    </div>
                                  )}

                                  <p className="card-title">{card.title}</p>

                                  <div className="card-meta">
                                    <span className="priority-pill" style={{ background: pc.bg, color: pc.color }}>
                                      <Icons.Flag /> {pc.label}
                                    </span>
                                    {card.dueDate && (
                                      <span className="card-meta-item">
                                        <Icons.Calendar />
                                        {new Date(card.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                      </span>
                                    )}
                                    {checkTotal > 0 && (
                                      <span className="card-meta-item">
                                        <Icons.CheckSquare />
                                        {checkDone}/{checkTotal}
                                      </span>
                                    )}
                                  </div>

                                  {card.assignees?.length > 0 && (
                                    <div className="card-footer-row">
                                      <div className="assignee-stack">
                                        {card.assignees.slice(0, 3).map((a, i) => (
                                          <div key={i} className="assignee-bubble" style={{ background: colColors[i % colColors.length], marginLeft: i > 0 ? -6 : 0, zIndex: 3 - i }}>
                                            {a.name?.charAt(0).toUpperCase()}
                                          </div>
                                        ))}
                                        {card.assignees.length > 3 && (
                                          <div className="assignee-bubble" style={{ background: 'rgba(255,255,255,0.1)', marginLeft: -6, color: '#94a3c4', fontSize: 9 }}>
                                            +{card.assignees.length - 3}
                                          </div>
                                        )}
                                      </div>
                                      <span style={{ fontSize: 10.5, color: '#4a5580', display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <Icons.Clock />
                                        {new Date(card.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </Draggable>
                          )
                        })}
                        {provided.placeholder}

                        {addingCard === col._id ? (
                          <form className="add-card-form" onSubmit={(e) => handleAddCard(e, col._id)}>
                            <input
                              autoFocus
                              className="add-card-input"
                              value={newCardTitle}
                              onChange={e => setNewCardTitle(e.target.value)}
                              placeholder="Card title..."
                            />
                            <div className="add-card-btns">
                              <button type="submit" className="btn-add-confirm">Add card</button>
                              <button type="button" className="btn-add-cancel" onClick={() => setAddingCard(null)}>
                                <Icons.X />
                              </button>
                            </div>
                          </form>
                        ) : (
                          <button className="btn-add-card" onClick={() => { setAddingCard(col._id); setNewCardTitle('') }}>
                            <Icons.Plus /> Add a card
                          </button>
                        )}
                      </div>
                    )}
                  </Droppable>
                </div>
              )
            })}
          </DragDropContext>

          {/* Add Column */}
          <div className="add-col-wrapper">
            {addingColumn ? (
              <form className="add-col-form" onSubmit={handleAddColumn}>
                <input
                  autoFocus
                  className="add-col-input"
                  value={newColName}
                  onChange={e => setNewColName(e.target.value)}
                  placeholder="Column name..."
                />
                <div className="add-col-btns">
                  <button type="submit" className="btn-col-confirm">Add column</button>
                  <button type="button" className="btn-col-cancel" onClick={() => setAddingColumn(false)}>
                    <Icons.X />
                  </button>
                </div>
              </form>
            ) : (
              <button className="btn-add-column" onClick={() => setAddingColumn(true)}>
                <Icons.Plus /> Add column
              </button>
            )}
          </div>
        </div>

        {/* ══ CARD DETAIL MODAL ══ */}
        {selectedCard && (() => {
          const pc = priorityConfig[selectedCard.priority] || priorityConfig.medium
          const checkDone = selectedCard.checklist?.filter(i => i.completed).length || 0
          const checkTotal = selectedCard.checklist?.length || 0

          return (
            <div className="modal-overlay" onClick={() => setSelectedCard(null)}>
              <div className="card-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-top-bar" style={{ background: pc.color }} />

                <div className="modal-header">
                  <div className="modal-title-block">
                    <div className="modal-title">{selectedCard.title}</div>
                    <div className="modal-badges">
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11.5, fontWeight: 600, borderRadius: 6, padding: '3px 9px', background: pc.bg, color: pc.color }}>
                        <Icons.Flag /> {pc.label}
                      </span>
                      {selectedCard.labels?.map((l, i) => (
                        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, borderRadius: 6, padding: '3px 8px', background: `${l.color}20`, color: l.color }}>
                          <Icons.Tag /> {l.text}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="close-modal-btn" onClick={() => setSelectedCard(null)}>
                    <Icons.X />
                  </button>
                </div>

                <div className="modal-body">
                  {/* Left */}
                  <div className="modal-left">
                    {/* Description */}
                    <div>
                      <div className="section-heading"><Icons.AlignLeft /> Description</div>
                      <p className="desc-text">{selectedCard.description || 'No description added yet.'}</p>
                    </div>

                    {/* Checklist */}
                    {checkTotal > 0 && (
                      <div>
                        <div className="section-heading">
                          <Icons.CheckSquare /> Checklist
                          <span style={{ marginLeft: 'auto', fontSize: 11, color: '#8892b4', fontWeight: 500, letterSpacing: 0 }}>
                            {checkDone} / {checkTotal}
                          </span>
                        </div>
                        <div className="checklist-progress-bar">
                          <div className="checklist-progress-fill" style={{ width: `${checkTotal ? (checkDone / checkTotal) * 100 : 0}%` }} />
                        </div>
                        <div>
                          {selectedCard.checklist.map((item, i) => (
                            <div key={i} className="checklist-item">
                              <div className="check-circle" style={{ borderColor: item.completed ? '#22c55e' : 'rgba(255,255,255,0.15)', background: item.completed ? 'rgba(34,197,94,0.15)' : 'transparent', color: '#22c55e' }}>
                                {item.completed && <Icons.Check />}
                              </div>
                              <span style={{ fontSize: 13.5, color: item.completed ? '#4a5580' : '#e2e8f0', textDecoration: item.completed ? 'line-through' : 'none', flex: 1 }}>
                                {item.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Comments */}
                    <div>
                      <div className="section-heading">
                        <Icons.MessageSquare /> Comments
                        <span style={{ marginLeft: 4, fontSize: 11, color: '#8892b4', fontWeight: 500, letterSpacing: 0 }}>
                          ({cardComments.length})
                        </span>
                      </div>

                      {cardComments.length === 0 && (
                        <p style={{ fontSize: 12.5, color: '#4a5580', fontStyle: 'italic', marginBottom: 12 }}>No comments yet. Be the first.</p>
                      )}

                      <div>
                        {cardComments.map(comment => (
                          <div key={comment._id} className="comment-item">
                            <div className="comment-avatar">
                              {comment.author?.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="comment-body">
                              <div className="comment-meta">
                                <span className="comment-author">{comment.author?.name}</span>
                                <span className="comment-time">
                                  {new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </span>
                                {comment.isEdited && <span style={{ fontSize: 10, color: '#4a5580' }}>(edited)</span>}
                                {comment.author?._id === user?._id && (
                                  <button className="comment-del-btn" onClick={() => handleDeleteComment(comment._id)}>
                                    <Icons.Trash />
                                  </button>
                                )}
                              </div>
                              <p className="comment-text">{comment.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <form className="comment-form" onSubmit={handleComment}>
                        <input
                          className="comment-input"
                          value={newComment}
                          onChange={e => setNewComment(e.target.value)}
                          placeholder="Write a comment..."
                        />
                        <button type="submit" className="comment-send-btn">
                          <Icons.Send />
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="modal-right">
                    <div>
                      <div className="meta-label"><Icons.Flag /> Priority</div>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, borderRadius: 6, padding: '3px 9px', background: pc.bg, color: pc.color }}>
                        {pc.label}
                      </span>
                    </div>

                    {selectedCard.dueDate && (
                      <div>
                        <div className="meta-label"><Icons.Calendar /> Due date</div>
                        <span className="meta-value">
                          {new Date(selectedCard.dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    )}

                    {selectedCard.assignees?.length > 0 && (
                      <div>
                        <div className="meta-label"><Icons.Users /> Assignees</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {selectedCard.assignees.map((a, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                              <div style={{ width: 24, height: 24, borderRadius: 7, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#fff' }}>
                                {a.name?.charAt(0).toUpperCase()}
                              </div>
                              <span style={{ fontSize: 12.5, color: '#e2e8f0', fontWeight: 500 }}>{a.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <div className="meta-label"><Icons.Clock /> Created</div>
                      <span className="meta-value">
                        {new Date(selectedCard.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>

                    <button
                      className="delete-card-btn"
                      onClick={() => handleDeleteCard(selectedCard._id, selectedCard.column)}
                    >
                      <Icons.Trash /> Delete card
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })()}
      </div>
    </>
  )
}