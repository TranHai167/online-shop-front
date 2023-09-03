import {ChangeDetectionStrategy, Injectable} from '@angular/core';
import {Product} from "../models/product";
import {ShoppingCart, UpdateShoppingCartRequest} from "../models/shopping-cart";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {map, Observable} from "rxjs";
import {AuthResponse} from "../models/app-user";
import {handleAutoChangeDetectionStatus} from "@angular/cdk/testing";
import {SharedServiceService} from "./shared-service.service";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private sharedService: SharedServiceService,
  ) {

  }

  getCart() {
    let cartId = '';
    // @ts-ignore
    cartId = localStorage.getItem('cartId');
    const params = new HttpParams()
      .set('cartId', cartId)
    return this.httpClient.get<ShoppingCart>("http://localhost:8080/shopping-cart/getById", { params }).pipe(
      map(x => new ShoppingCart(x.items))
    );
  }

  addToCart(product: Product) {
    this.sharedService.emitChangeQuantityEvent(1);
    return this.updateItem(product, 1)
  }

  removeFromCart(product: Product) {
    this.sharedService.emitChangeQuantityEvent(-1);
    return this.updateItem(product, -1)
  }

  clearCart(orderId: string) {
    let cartId = '';
    // @ts-ignore
    cartId = localStorage.getItem('cartId');

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      params: new HttpParams()
        .set('cartId', cartId)
        .set('orderId', orderId)
    };

    this.sharedService.emitChangeQuantityEvent(0);
    return this.httpClient.delete('http://localhost:8080/shopping-cart/clear-cart', httpOptions);
  }


  private create() {

  }

  private getItem(cartId: string, productId: string) {

  }

  private async getOrCreateCartId() {

  }

  private updateItem(product: Product, change: number): Observable<number>  {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    let cartId = localStorage.getItem('cartId');
    if (!cartId) cartId = '';
    let request: UpdateShoppingCartRequest = new UpdateShoppingCartRequest(cartId, product, change);
    return this.httpClient.post<number>("http://localhost:8080/shopping-cart/update-cart", request, httpOptions);
  }

  clearShoppingCart() {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) cartId = '';
    return this.httpClient.delete(`http://localhost:8080/shopping-cart/clear-shopping-cart/${cartId}`);
  }
}
