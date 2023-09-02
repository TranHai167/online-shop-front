import { Component } from '@angular/core';
import {OrderService} from "../services/order.service";
import {ViewOrderComponent} from "../dialog/view-order/view-order.component";
import {MatDialog} from "@angular/material/dialog";
import {filter, take} from "rxjs/operators";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders$;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(
    private orderService: OrderService,
    public dialog: MatDialog
  )
  {
    this.orders$ = orderService.getAdminOrders().pipe(take(1));
  }

  openDialog(orderId: string | undefined): void {
    this.dialog.open(ViewOrderComponent, {
      data: orderId
    });
  }

  filter(query: string) {

  }
}
