import { createContext, useContext, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import useAuth from '../hooks/useAuth'

export const SocketContext = createContext()

export function SocketProvider({ children }) {
  const socketRef = useRef(null)
  const { user } = useAuth()

  useEffect(() => {
    const url = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000'
    socketRef.current = io(url)

    if (user?._id) {
      socketRef.current.emit('user:join', user._id)
    }

    return () => socketRef.current?.disconnect()
  }, [user])

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext)