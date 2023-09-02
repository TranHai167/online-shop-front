import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {PlacedOrder} from "../../models/placed-order";
import {OrderService} from "../../services/order.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {
  // @ts-ignore
  orderPlaced$: Observable<PlacedOrder[]>;
  id: string;

  constructor(
    public dialogRef: MatDialogRef<ViewOrderComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public orderId: string,
    private orderService: OrderService
  ) {
    this.id = orderId;
  }

  async ngOnInit() {
    this.orderPlaced$ = await this.orderService.getPlacedOrder(this.id).pipe(take(1))
  }

  getItemPrice(item: PlacedOrder) {
    let sum = 0;
    // @ts-ignore
    sum += item.quantity * item.product?.price;
    return sum;
  }

  getTotalPrice(orders: PlacedOrder[]) {
    let sum = 0;
      // @ts-ignore
      for (let item: PlacedOrder of orders) {
        sum += this.getItemPrice(item);
      }

      return sum;
  }
}
