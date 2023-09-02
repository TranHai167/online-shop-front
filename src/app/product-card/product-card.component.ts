import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {Product} from "../models/product";
import {ShoppingCart} from "../models/shopping-cart";
import {ShoppingCartService} from "../services/shopping-cart.service";
import {Router} from "@angular/router";
import {SharedServiceService} from "../services/shared-service.service";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  // @ts-ignore
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  // @ts-ignore
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(
    private cartService: ShoppingCartService
  ) {}

  addToCart() {
    this.cartService.addToCart(this.product).subscribe(
      (res) => {
        this.shoppingCart.setQuantity(this.product, res);
      }
    );
  }
}
