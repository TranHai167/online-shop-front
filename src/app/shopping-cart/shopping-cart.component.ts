import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from "../services/shopping-cart.service";
import {Observable} from "rxjs";
import {ShoppingCart} from "../models/shopping-cart";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  // @ts-ignore
  cart: ShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService,
              private router: Router) { }

  async ngOnInit() {
    let myCartObs = await this.shoppingCartService.getCart();
    myCartObs.subscribe((cart) => {
      let shoppingCartItems = cart.items.filter((item) => {
        return item.quantity > 0;
      });

      this.cart = new ShoppingCart(shoppingCartItems);
    })
  }

  clearCart() {
    this.shoppingCartService.clearShoppingCart().subscribe();
    this.router.navigate(['/']).then(() => {
      // Reload the current page
      setTimeout(()=>{

        window.location.reload()
      },800)
    });
  }
}
