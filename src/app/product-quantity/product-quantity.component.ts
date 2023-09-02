import {Component, Input} from '@angular/core';
import {Product} from "../models/product";
import {ShoppingCartService} from "../services/shopping-cart.service";
import {ShoppingCart} from "../models/shopping-cart";
import {SharedServiceService} from "../services/shared-service.service";

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  // @ts-ignore
  @Input('product') product: Product;
  // @ts-ignore
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product).subscribe(
      (res) => {
        this.shoppingCart.setQuantity(this.product, res);
      }
    );
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product).subscribe(
      (res) => {
        this.shoppingCart.setQuantity(this.product, res);
      }
    );
  }
}
