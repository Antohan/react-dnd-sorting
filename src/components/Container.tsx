import React, { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { observer } from 'mobx-react-lite';

import { Card } from './Card';
import { ItemType } from '../ItemType';
import { store } from '../store/Store';

const style = {
  display: 'flex',
};

type ContainerProps = {
};

/**
 * Container component.
 */
export const Container: React.FC<ContainerProps> = observer((props) => {
  const { items, moveItem } = store;

  const findIndexById = useCallback(
    (id: number) => items.findIndex(item => item.id === id),
    [items],
  );

  const [, drop] = useDrop({ accept: ItemType.CARD });

  const renderCard = items.map((card) => {
    return (
      <Card
        key={card.id}
        id={card.id}
        text={card.text}
        moveCard={moveItem}
        findIndex={findIndexById}
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
});

Container.defaultProps = {
};
