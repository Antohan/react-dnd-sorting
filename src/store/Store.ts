import { action, makeAutoObservable } from 'mobx';

import { mockItems } from './mockData';

export type Item = {
  id: number,
  text: string,
};

class Store {
  private _items: Item[] = [];

  get items() {
    return this._items;
  }

  constructor(items: Item[]) {
    makeAutoObservable(this, {
      moveItem: action.bound,
    });
    this._items = items;
  }

  moveItem(itemId: number, to: number) {
    const itemIndex = this._items.findIndex(({ id }) => id === itemId);
    const items = Array.from(this._items);

    items.splice(itemIndex, 1);
    items.splice(to, 0, this._items[itemIndex]);
    
    this._items = items;
  }
}

export const store = new Store(mockItems);
