import api from './api'
export const getColumns = (projectId) => api.get(`/columns/${projectId}`)
export const createColumn = (data) => api.post('/columns', data)
export const updateColumn = (id, data) => api.put(`/columns/${id}`, data)
export const deleteColumn = (id) => api.delete(`/columns/${id}`)
export const reorderColumns = (columns) => api.put('/columns/reorder', { columns })