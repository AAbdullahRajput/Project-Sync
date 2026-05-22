import { useState, useEffect } from 'react'
import { getProjects } from '../services/projectService'

export default function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProjects()
      .then(res => setProjects(res.data))
      .finally(() => setLoading(false))
  }, [])

  return { projects, setProjects, loading }
}