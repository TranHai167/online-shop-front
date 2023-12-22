import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {async, Observable, Subscription} from "rxjs";
import {AuthService} from "../services/auth.service";
import {ShoppingCartService} from "../services/shopping-cart.service";
import {AppUser} from "../models/app-user";
import {ShoppingCart} from "../models/shopping-cart";
import {SharedServiceService} from "../services/shared-service.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  // @ts-ignore
  appUser: AppUser;
  // @ts-ignore
  cart$: Observable<ShoppingCart>;
  // @ts-ignore
  private changeQuantitySubscription: Subscription;

  quantity: number = 0;
  loggedIn: boolean = true;
  windowWidth: number = 0;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService,
    private sharedService: SharedServiceService
  ) {
    this.changeQuantitySubscription = this.sharedService.getChangeQuantityEvent().subscribe((data) => {
      this.cart$ = this.shoppingCartService.getCart();
      this.quantity += data;
      if (data === 0)
        this.quantity = 0;
    });
  }

  async ngOnInit() {
    this.windowWidth = window.innerWidth;
    this.cart$ = await this.shoppingCartService.getCart();
    this.cart$.subscribe((res) => {
      for (let itemElement of res.items) {
        this.quantity += itemElement.quantity;
      }
    })

    this.auth.getUserDetail().pipe(take(1)).subscribe((data) => {
      this.appUser = new AppUser(data.name, data.admin);
      localStorage.setItem('isAdmin', String(data.admin));
    })
  }

  logout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks when the component is destroyed
    this.changeQuantitySubscription.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.windowWidth = window.innerWidth;
    // You can perform additional actions or trigger change detection here if needed
  }
}
