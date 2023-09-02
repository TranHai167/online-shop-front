import {Product} from "./product";

export class ShoppingCartItem {
  constructor(item: ShoppingCartItem) {
    this.products = item.products;
    this.quantity = item.quantity;
  }


  // @ts-ignore
  products: Product;
  quantity: number = 0;

  get totalPrice() {
    return this.products.price * this.quantity;
  }
}
