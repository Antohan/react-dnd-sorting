import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemType } from '../ItemType';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
  margin: '10px',
  transition: 'all 300ms',
}

type CardProps = {
  id: number,
  text: string,
  moveCard: (id: number, to: number) => void,
  findCard: (id: number) => { index: number },
};

interface Item {
  type: string;
  id: number;
  originalIndex: string;
};

/**
 * Card component.
 */
export const Card: React.FC<CardProps> = (props) => {
  const { id, text, moveCard, findCard } = props;
  const originalIndex = findCard(id).index;

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemType.CARD, id, originalIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (_, monitor) => {
      const { id: droppedId, originalIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();

      if (!didDrop) {
        moveCard(droppedId, originalIndex);
      }
    },
  });

  const [, drop] = useDrop({
    accept: ItemType.CARD,
    canDrop: () => false,
    hover({ id: draggedId }: Item) {
      if (draggedId !== id) {
        const { index: overIndex } = findCard(id);
        moveCard(draggedId, overIndex);
      }
    },
  });

  const opacity = isDragging ? 0 : 1;

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ ...style, opacity }}
    >
      {text}
    </div>
  );
};

Card.defaultProps = {
};
