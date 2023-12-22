import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {ShoppingCartService} from "./shopping-cart.service";
import {Order} from "../models/order";
import {PlacedOrder} from "../models/placed-order";
import {map, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient, private shoppingCartService: ShoppingCartService) {
  }

  placeOrder(orderDTO: any) {
    return this.httpClient.post('http://localhost:8080/api/orders/create', orderDTO);
  }

  getOrders() {
    let cartId = '';
    // @ts-ignore
    cartId = localStorage.getItem('cartId');
    const params = new HttpParams()
      .set('cartId', cartId);
    return this.httpClient.get<Order[]>("http://localhost:8080/api/orders/get-order", {params})
  }

  getPlacedOrder(orderId: string) {
    const params = new HttpParams()
      .set('orderId', orderId);
    return this.httpClient.get<PlacedOrder[]>("http://localhost:8080/api/orders/get-orders/placed", {params})
  }

  getAdminOrders() {
    return this.httpClient.get<Order[]>("http://localhost:8080/api/orders/admin-get-orders")
  }

  sendEmail(orderId: string, cartId: string | null) {
    const params = new HttpParams()
      .set('orderId', orderId)
      .set('cartId', cartId||'')
    console.log('sent email')
    return this.httpClient.get<void>("http://localhost:8080/orders/send-email", {params});
  }

  searchFieldsFunction(customerTerm: string, addressTerm: string, phoneNumberTerm: string) {
    const params = new HttpParams()
      .set('customer', customerTerm)
      .set('address', addressTerm)
      .set('phoneNumber', phoneNumberTerm)
    return this.httpClient.get<Order[]>("http://localhost:8080/api/orders/filter-orders", { params });
  }

  searchAllOrders(customerTerm: string, addressTerm: string, phoneNumberTerm: string, pageNumb: number, pageSize: number) {
    const params = new HttpParams()
      .set('customer', customerTerm)
      .set('address', addressTerm)
      .set('phoneNumber', phoneNumberTerm)
      .set('pageNumb', pageNumb)
      .set('pageSize', pageSize)
    return this.httpClient.get<Order[]>("http://localhost:8080/api/orders/load-more-orders", { params });
  }
}
