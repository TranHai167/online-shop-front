import { Component } from '@angular/core';
import {OrderService} from "../services/order.service";
import {ViewOrderComponent} from "../dialog/view-order/view-order.component";
import {MatDialog} from "@angular/material/dialog";
import { take } from "rxjs/operators";
import {FormControl, FormGroup} from "@angular/forms";
import {Order} from "../models/order";

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  order: Order[] = [];
  customerTerm: string = '';
  addressTerm: string = '';
  phoneNumberTerm: string = '';

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor
  (
    private orderService: OrderService,
    public dialog: MatDialog
  )
  {
    orderService.getAdminOrders().pipe(take(1)).subscribe((order) => this.order = order);
  }

  openDialog(orderId: string | undefined): void {
    this.dialog.open(ViewOrderComponent, {
      data: orderId
    });
  }

  onPhoneNumberInputChange(event: any) {
    const searchTerm = event.target.value;
    this.phoneNumberTerm = searchTerm;
    this.orderService.searchFieldsFunction(this.customerTerm, this.addressTerm, searchTerm, this.range.get('start')?.value?.getTime(), this.range.get('end')?.value?.getTime()).subscribe(
      (order) => this.order = order
    )
  }

  onAddressInputChange(event: any) {
    const searchTerm = event.target.value;
    this.addressTerm = searchTerm;
    this.orderService.searchFieldsFunction(this.customerTerm, searchTerm, this.phoneNumberTerm, this.range.get('start')?.value?.getTime(), this.range.get('end')?.value?.getTime()).subscribe(
      (order) => this.order = order
    )
  }

  onCustomerInputChange(event: any) {
    const searchTerm = event.target.value;
    this.customerTerm = searchTerm;
    this.orderService.searchFieldsFunction(searchTerm, this.addressTerm, this.phoneNumberTerm, this.range.get('start')?.value?.getTime(), this.range.get('end')?.value?.getTime()).subscribe(
    (order) => this.order = order
    )
  }

  onDateChange() {
    console.log('date changed');
    this.orderService.searchFieldsFunction(this.customerTerm, this.addressTerm, this.phoneNumberTerm, this.range.get('start')?.value?.getTime(), this.range.get('end')?.value?.getTime())
      .subscribe((order) => this.order = order
    )
  }
}
