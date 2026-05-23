import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../services/api'
import toast from 'react-hot-toast'

export default function MembersPage() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [removing, setRemoving] = useState(null)

  useEffect(() => {
    api.get(`/projects/${id}`)
      .then(res => setProject(res.data))
      .catch(() => toast.error('Failed to load project'))
      .finally(() => setLoading(false))
  }, [id])

  const removeMember = async (userId) => {
    if (!window.confirm('Remove this member from the project?')) return
    setRemoving(userId)
    try {
      await api.delete(`/projects/${id}/members/${userId}`)
      setProject(prev => ({
        ...prev,
        members: prev.members.filter(m => m.user._id !== userId),
      }))
      toast.success('Member removed')
    } catch {
      toast.error('Failed to remove member')
    } finally {
      setRemoving(null)
    }
  }

  const roleConfig = {
    admin:  { color: '#818cf8', bg: 'rgba(99,102,241,0.14)',  border: 'rgba(99,102,241,0.3)',  label: 'Admin' },
    member: { color: '#4ade80', bg: 'rgba(34,197,94,0.12)',   border: 'rgba(34,197,94,0.28)',  label: 'Member' },
    viewer: { color: '#94a3b8', bg: 'rgba(148,163,184,0.1)',  border: 'rgba(148,163,184,0.2)', label: 'Viewer' },
  }

  const avatarColors = ['#6366f1','#ec4899','#f59e0b','#22c55e','#3b82f6','#8b5cf6','#06b6d4','#ef4444']

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #080b14; }

        .mp-page {
          min-height: 100vh;
          background: #080b14;
          font-family: 'DM Sans', sans-serif;
          color: #e2e8f0;
        }

        /* ── Glow bg ── */
        .mp-glow {
          position: fixed;
          top: -200px; left: -100px;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 65%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Inner wrapper ── */
        .mp-inner {
          position: relative;
          z-index: 1;
          max-width: 760px;
          margin: 0 auto;
          padding: 0 20px 60px;
        }

        /* ── Header ── */
        .mp-header {
          padding: 36px 0 32px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          margin-bottom: 32px;
        }

        .mp-back {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #8892b4;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          padding: 6px 12px 6px 8px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.08);
          transition: all 0.18s;
          margin-bottom: 24px;
          width: fit-content;
        }

        .mp-back:hover {
          color: #e2e8f0;
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.14);
        }

        .mp-title-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .mp-title {
          font-family: 'Syne', sans-serif;
          font-size: 26px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.5px;
          line-height: 1.1;
          margin-bottom: 6px;
        }

        .mp-sub {
          font-size: 13.5px;
          color: #8892b4;
          font-weight: 400;
        }

        .mp-count-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(99,102,241,0.14);
          border: 1px solid rgba(99,102,241,0.28);
          border-radius: 100px;
          padding: 5px 14px;
          font-size: 12px;
          font-weight: 600;
          color: #a5b4fc;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .mp-count-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #6366f1;
          animation: mp-pulse 2.2s ease-in-out infinite;
        }

        @keyframes mp-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.65); }
        }

        /* ── Member list ── */
        .mp-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        /* ── Member row ── */
        .mp-row {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #0d1020;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 16px 20px;
          transition: border-color 0.18s, transform 0.18s;
          position: relative;
          overflow: hidden;
          animation: mp-slide-in 0.3s ease both;
        }

        .mp-row:hover {
          border-color: rgba(255,255,255,0.13);
          transform: translateY(-1px);
        }

        @keyframes mp-slide-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .mp-row-glow {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,0.35), transparent);
          opacity: 0;
          transition: opacity 0.25s;
        }

        .mp-row:hover .mp-row-glow { opacity: 1; }

        /* ── Avatar ── */
        .mp-avatar {
          width: 42px; height: 42px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 16px; font-weight: 700; color: #fff;
          flex-shrink: 0;
          position: relative;
        }

        .mp-avatar-ring {
          position: absolute;
          inset: -2px;
          border-radius: 14px;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .mp-row:hover .mp-avatar-ring { opacity: 1; }

        /* ── Info ── */
        .mp-info { flex: 1; min-width: 0; }

        .mp-name {
          font-size: 14px;
          font-weight: 600;
          color: #f1f5f9;
          margin-bottom: 3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mp-email {
          font-size: 12px;
          color: #8892b4;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* ── Role badge ── */
        .mp-role {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.4px;
          border-radius: 7px;
          padding: 4px 10px;
          flex-shrink: 0;
          text-transform: capitalize;
        }

        .mp-role-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* ── Remove btn ── */
        .mp-remove-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          background: transparent;
          border: 1px solid rgba(239,68,68,0.28);
          color: #f87171;
          border-radius: 8px;
          padding: 6px 12px;
          font-size: 12px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.18s;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .mp-remove-btn:hover:not(:disabled) {
          background: rgba(239,68,68,0.1);
          border-color: rgba(239,68,68,0.5);
        }

        .mp-remove-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        /* ── Loading / skeleton ── */
        .mp-loading {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .mp-skeleton {
          background: #0d1020;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .sk {
          background: linear-gradient(90deg, #141829 25%, #1c2035 50%, #141829 75%);
          background-size: 200% 100%;
          animation: shimmer 1.6s infinite;
          border-radius: 6px;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ── Responsive ── */
        @media (max-width: 560px) {
          .mp-title { font-size: 22px; }
          .mp-row { padding: 13px 14px; gap: 11px; }
          .mp-avatar { width: 36px; height: 36px; font-size: 14px; border-radius: 10px; }
          .mp-remove-btn span { display: none; }
          .mp-remove-btn { padding: 6px 10px; }
          .mp-count-pill { display: none; }
        }
      `}</style>

      <div className="mp-page">
        <div className="mp-glow" />

        <div className="mp-inner">
          {/* Header */}
          <div className="mp-header">
            <Link to={`/board/${id}`} className="mp-back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
              </svg>
              Back to Board
            </Link>

            <div className="mp-title-row">
              <div>
                <div className="mp-title">Team Members</div>
                <div className="mp-sub">
                  {loading ? 'Loading...' : `${project?.members?.length || 0} member${project?.members?.length !== 1 ? 's' : ''} in ${project?.name || ''}`}
                </div>
              </div>
              {!loading && project && (
                <div className="mp-count-pill">
                  <span className="mp-count-dot" />
                  {project.members?.length} active
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="mp-loading">
              {[...Array(3)].map((_, i) => (
                <div className="mp-skeleton" key={i}>
                  <div className="sk" style={{ width: 42, height: 42, borderRadius: 12, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div className="sk" style={{ height: 13, width: '40%', marginBottom: 8 }} />
                    <div className="sk" style={{ height: 11, width: '60%' }} />
                  </div>
                  <div className="sk" style={{ height: 26, width: 64, borderRadius: 7 }} />
                </div>
              ))}
            </div>
          ) : (
            <div className="mp-list">
              {project?.members?.map((m, index) => {
                const rc = roleConfig[m.role] || roleConfig.member
                const avatarColor = avatarColors[index % avatarColors.length]

                return (
                  <div
                    key={m.user._id}
                    className="mp-row"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="mp-row-glow" />

                    {/* Avatar */}
                    <div className="mp-avatar" style={{ background: avatarColor }}>
                      {m.user?.name?.charAt(0).toUpperCase()}
                      <div
                        className="mp-avatar-ring"
                        style={{ border: `2px solid ${avatarColor}55` }}
                      />
                    </div>

                    {/* Info */}
                    <div className="mp-info">
                      <div className="mp-name">{m.user?.name}</div>
                      <div className="mp-email">{m.user?.email}</div>
                    </div>

                    {/* Role badge */}
                    <div
                      className="mp-role"
                      style={{
                        color: rc.color,
                        background: rc.bg,
                        border: `1px solid ${rc.border}`,
                      }}
                    >
                      <span className="mp-role-dot" style={{ background: rc.color }} />
                      {rc.label}
                    </div>

                    {/* Remove button — not shown for admin */}
                    {m.role !== 'admin' && (
                      <button
                        className="mp-remove-btn"
                        onClick={() => removeMember(m.user._id)}
                        disabled={removing === m.user._id}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6l-1 14H6L5 6"/>
                          <path d="M10 11v6M14 11v6"/>
                          <path d="M9 6V4h6v2"/>
                        </svg>
                        <span>{removing === m.user._id ? 'Removing...' : 'Remove'}</span>
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}