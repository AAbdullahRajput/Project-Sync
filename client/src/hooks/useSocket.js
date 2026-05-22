import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

export default function useSocket(projectId, handlers = {}) {
  const socketRef = useRef(null)

  useEffect(() => {
    const url = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000'
    socketRef.current = io(url)

    if (projectId) {
      socketRef.current.emit('join:project', projectId)
    }

    Object.entries(handlers).forEach(([event, fn]) => {
      socketRef.current.on(event, fn)
    })

    return () => {
      socketRef.current.disconnect()
    }
  }, [projectId])

  return socketRef.current
}