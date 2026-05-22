const colors = {
  low: '#22c55e',
  medium: '#f59e0b',
  high: '#ef4444',
  critical: '#7c3aed',
}

export const getPriorityColor = (priority) => colors[priority] || '#6366f1'