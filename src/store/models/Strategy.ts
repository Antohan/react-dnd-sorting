import Item from './Item';

export default interface Strategy {
  items: Item[];
  moveItem(itemId: number, to: number): void;
}