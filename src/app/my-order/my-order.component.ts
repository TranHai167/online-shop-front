import { Component } from '@angular/core';
import {OrderService} from "../services/order.service";
import {AuthService} from "../services/auth.service";
import {Order} from "../models/order";
import {MatDialog} from "@angular/material/dialog";
import {ViewOrderComponent} from "../dialog/view-order/view-order.component";

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent {

  orders: Order[] = [];

  // @ts-ignore
  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    public dialog: MatDialog) {

    orderService.getOrders().subscribe(
      (res) => {
        this.orders = res;
      }
    );
  }

  openDialog(orderId: string | undefined): void {
    this.dialog.open(ViewOrderComponent, {
      data: orderId
    });
  }
}
