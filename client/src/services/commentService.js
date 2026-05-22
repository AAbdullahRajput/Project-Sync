import api from './api'
export const getComments = (cardId) => api.get(`/comments/${cardId}`)
export const createComment = (cardId, text) => api.post(`/comments/${cardId}`, { text })
export const updateComment = (id, text) => api.put(`/comments/${id}`, { text })
export const deleteComment = (id) => api.delete(`/comments/${id}`)