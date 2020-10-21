import { action, makeObservable, observable } from 'mobx';
import Item from '../models/Item';
import Strategy from '../models/Strategy';
import { BaseStratagy } from './BaseStratagy';

export class MemoryBasedStrategy extends BaseStratagy implements Strategy {
  constructor(items: Item[]) {
    super();
    this.items = items;
    makeObservable(this, {
      items: observable,
      moveItem: action.bound,
    });
  }
}
