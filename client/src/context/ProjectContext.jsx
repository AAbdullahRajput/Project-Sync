import { createContext, useState, useContext } from 'react'

export const ProjectContext = createContext()

export function ProjectProvider({ children }) {
  const [activeProject, setActiveProject] = useState(null)
  const [projects, setProjects] = useState([])

  return (
    <ProjectContext.Provider value={{ activeProject, setActiveProject, projects, setProjects }}>
      {children}
    </ProjectContext.Provider>
  )
}

export const useProject = () => useContext(ProjectContext)