import { createContext, useState, useContext } from 'react'

export const BoardContext = createContext()

export function BoardProvider({ children }) {
  const [columns, setColumns] = useState([])
  const [cards, setCards] = useState({})
  const [dragActive, setDragActive] = useState(false)

  return (
    <BoardContext.Provider value={{ columns, setColumns, cards, setCards, dragActive, setDragActive }}>
      {children}
    </BoardContext.Provider>
  )
}

export const useBoard = () => useContext(BoardContext)