import Item from "../models/Item";

export abstract class BaseStratagy {
  items: Item[] = [];

  moveItem(itemId: number, to: number) {
    const itemIndex = this.items.findIndex(({ id }) => id === itemId);
    const items = Array.from(this.items);

    items.splice(itemIndex, 1);
    items.splice(to, 0, this.items[itemIndex]);
    
    this.items = items;
  }
}
