import { createContext, useState, useContext } from 'react'

export const NotificationContext = createContext()

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])
  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications, unreadCount }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => useContext(NotificationContext)