import api from './api'
export const getCards = (columnId) => api.get(`/cards/${columnId}`)
export const createCard = (data) => api.post('/cards', data)
export const getCard = (id) => api.get(`/cards/${id}`)
export const updateCard = (id, data) => api.put(`/cards/${id}`, data)
export const deleteCard = (id) => api.delete(`/cards/${id}`)
export const moveCard = (id, data) => api.put(`/cards/${id}/move`, data)