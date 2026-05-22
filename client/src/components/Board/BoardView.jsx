import { DragDropContext } from '@hello-pangea/dnd'
import Column from './Column'
import AddColumnBtn from './AddColumnBtn'

export default function BoardView({ columns, cards, onDragEnd, onAddColumn, onDeleteColumn, onAddCard, onCardClick }) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={styles.board}>
        {columns.map(col => (
          <Column
            key={col._id}
            column={col}
            cards={cards[col._id] || []}
            onDeleteColumn={onDeleteColumn}
            onAddCard={onAddCard}
            onCardClick={onCardClick}
          />
        ))}
        <AddColumnBtn onAdd={onAddColumn} />
      </div>
    </DragDropContext>
  )
}

const styles = {
  board: {
    display: 'flex', gap: '16px', padding: '24px',
    overflowX: 'auto', flex: 1, alignItems: 'flex-start', minHeight: 0,
  },
}