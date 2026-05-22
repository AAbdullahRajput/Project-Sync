import { useState, useEffect } from 'react'
import { getColumns } from '../services/columnService'
import { getCards } from '../services/cardService'

export default function useBoard(projectId) {
  const [columns, setColumns] = useState([])
  const [cards, setCards] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!projectId) return
    const load = async () => {
      const colRes = await getColumns(projectId)
      setColumns(colRes.data)
      const cardMap = {}
      await Promise.all(colRes.data.map(async col => {
        const r = await getCards(col._id)
        cardMap[col._id] = r.data
      }))
      setCards(cardMap)
      setLoading(false)
    }
    load()
  }, [projectId])

  return { columns, setColumns, cards, setCards, loading }
}