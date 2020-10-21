import { action, makeAutoObservable } from 'mobx';

import { mockItems } from './mockData';
import Strategy from './models/Strategy';
import { MemoryBasedStrategy } from './strategies/MemoryBasedStrategy';

class Store {
  private strategy: Strategy;

  get items() {
    return this.strategy.items;
  }

  constructor(strategy: Strategy) {
    makeAutoObservable(this, {
      moveItem: action.bound,
    });
    this.strategy = strategy;
  }

  setStratagy(strategy: Strategy) {
    this.strategy = strategy;
  }

  moveItem(itemId: number, to: number) {
    this.strategy.moveItem(itemId, to);
  }
}

export const store = new Store(new MemoryBasedStrategy(mockItems));
