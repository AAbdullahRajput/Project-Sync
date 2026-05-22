import { Droppable } from '@hello-pangea/dnd'
import ColumnHeader from './ColumnHeader'
import TaskCard from '../Card/TaskCard'
import AddCardBtn from '../Card/AddCardBtn'

export default function Column({ column, cards = [], onDeleteColumn, onAddCard, onCardClick }) {
  return (
    <div style={styles.column}>
      <ColumnHeader
        name={column.name}
        cardCount={cards.length}
        onDelete={() => onDeleteColumn(column._id)}
      />
      <Droppable droppableId={column._id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              ...styles.cardList,
              background: snapshot.isDraggingOver ? '#1e2240' : 'transparent',
            }}
          >
            {cards.map((card, index) => (
              <TaskCard
                key={card._id}
                card={card}
                index={index}
                onClick={() => onCardClick(card)}
              />
            ))}
            {provided.placeholder}
            <AddCardBtn onAdd={(title) => onAddCard(column._id, title)} />
          </div>
        )}
      </Droppable>
    </div>
  )
}

const styles = {
  column: {
    background: '#1a1d2e', borderRadius: '12px', border: '1px solid #2d3148',
    width: '280px', minWidth: '280px', display: 'flex', flexDirection: 'column',
    maxHeight: 'calc(100vh - 140px)',
  },
  cardList: {
    padding: '10px', display: 'flex', flexDirection: 'column',
    gap: '8px', overflowY: 'auto', flex: 1, minHeight: '60px',
    borderRadius: '0 0 12px 12px',
  },
}