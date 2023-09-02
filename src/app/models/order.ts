
import {ShippingDTO} from "./shipping";

export class Order {
  orderDate: Date;
  cartId: string;
  shipping: ShippingDTO;
  orderId?: string;

  constructor(shipping: ShippingDTO, cartId: string) {
    this.orderDate = new Date();
    this.shipping = shipping;
    this.cartId = cartId;
  }
}
