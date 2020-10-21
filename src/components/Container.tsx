import React, { useCallback, useState } from 'react';

import { Card } from './Card';
import { ItemType } from '../ItemType';
import { useDrop } from 'react-dnd';

const style = {
  display: 'flex',
};

type ContainerProps = {
};

/**
 * Container component.
 */
export const Container: React.FC<ContainerProps> = (props) => {
  const [cards, setCards] = useState([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
    { id: 4, text: 'Item 4' },
    { id: 5, text: 'Item 5' },
  ]);

  const findCard = useCallback((id: number) => {
    const card = cards.filter((c) => c.id === id)[0];

    return {
      card,
      index: cards.indexOf(card),
    }
  }, [cards]);

  const [, drop] = useDrop({ accept: ItemType.CARD });

  const moveCard = useCallback(
    (id: number, atIndex: number) => {
      const { card, index } = findCard(id);
      const newList = Array.from(cards);
      newList.splice(index, 1);
      newList.splice(atIndex, 0, card);
      console.log(newList.map(({ id }) => id));

      setCards(newList);
    },
    [cards, findCard],
  );

  const renderCard = cards.map((card, index) => {
    return (
      <Card
        key={card.id}
        id={card.id}
        text={card.text}
        moveCard={moveCard}
        findCard={findCard}
      />
    );
  });

  return (
    <div
      ref={drop}
      style={style}
    >
      {renderCard}
    </div>
  );
};

Container.defaultProps = {
};
