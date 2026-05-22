import ProjectCard from './ProjectCard'
import EmptyState from '../Shared/EmptyState'
import Button from '../Shared/Button'

export default function ProjectGrid({ projects, onCreateClick }) {
  if (projects.length === 0) {
    return (
      <EmptyState
        icon="📋"
        title="No projects yet"
        subtitle="Create your first project to get started"
        action={<Button onClick={onCreateClick}>+ Create Project</Button>}
      />
    )
  }

  return (
    <div style={styles.grid}>
      {projects.map(p => <ProjectCard key={p._id} project={p} />)}
    </div>
  )
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
}