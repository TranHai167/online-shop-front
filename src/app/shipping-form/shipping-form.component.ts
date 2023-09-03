import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from "../services/order.service";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {ShoppingCart} from "../models/shopping-cart";
import {Order} from "../models/order";
import {ShippingDTO} from "../models/shipping";
import {ShoppingCartService} from "../services/shopping-cart.service";
import {map, Observable, Subscription} from "rxjs";
import {take} from "rxjs/operators";

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {
  // @ts-ignore
  @Input('cart') cart: ShoppingCart;
  shipping: ShippingDTO = new ShippingDTO();
  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService) {
  }

  ngOnInit() {
  }

  placeOrder() {
    let cartId = localStorage.getItem('cartId');

    if (!cartId) cartId = '';
    let order = new Order(this.shipping, cartId);
    this.orderService.placeOrder(order).pipe(take(1), map(
      response => {
        // @ts-ignore
        return response?.orderId;
      }
    )).subscribe(
      (res) => {
        let orderId: string = res ? res : '';
        this.shoppingCartService.clearCart(res).subscribe();
        this.orderService.sendEmail(orderId, cartId).pipe(take(1)).subscribe()
        this.router.navigate(['/order-success/' + res]).then();
      });
  }
}
