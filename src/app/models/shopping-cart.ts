import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  // @ts-ignore
  cartId: string;
  // @ts-ignore
  items: ShoppingCartItem[] = [];

  constructor(private itemsMap: { [productId: number]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};

    for (let productId in itemsMap) {
      let item = itemsMap[productId];
      this.items.push(new ShoppingCartItem(item));
    }
  }

  get totalItemsCount() {
    let quantity = 0;
    for (let item of this.items) {
      quantity += item.quantity;
    }

    return quantity;
  }

  get totalPrice() {
    let sum = 0;
    for (let item of this.items) {
      sum += item.totalPrice;
    }

    return sum;
  }

  public getQuantity(product: Product) {
    for (let item of this.items) {
      if (item.products.id === product.id)
        return item.quantity;
    }

    return 0;
  }

  public setQuantity(product: Product, newQuantity: number) {
    for (let item of this.items) {
      if (item.products.id === product.id) {
        return item.quantity = newQuantity;
      }
    }

    return 0;
  }
}

export class UpdateShoppingCartRequest {
  cartId: string;
  product: Product;
  change: number;

  constructor(cartId: string, product: Product, change: number) {
    this.cartId = cartId;
    this.product = product;
    this.change = change;
  }
}
