import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {OrderService} from "../services/order.service";
import {ViewOrderComponent} from "../dialog/view-order/view-order.component";
import {MatDialog} from "@angular/material/dialog";
import {debounceTime, distinctUntilChanged, take} from "rxjs/operators";
import {FormControl, FormGroup} from "@angular/forms";
import {Order} from "../models/order";
import {fromEvent, Subscription} from "rxjs";

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements AfterViewInit, OnDestroy {
  order: Order[] = [];
  customerTerm: string = '';
  addressTerm: string = '';
  phoneNumberTerm: string = '';
  pageNumb: number = 1;
  pageSize: number = 10;


  @ViewChild('query1') customerSearch!: ElementRef;
  private customerSubscription: Subscription = new Subscription;

  @ViewChild('query2') addressSearch!: ElementRef;
  private addressSubscription: Subscription = new Subscription;

  @ViewChild('query3') phoneSearch!: ElementRef;
  private phoneSubscription: Subscription = new Subscription;

  columns: string[] = ['Customer', 'Date', 'Address', 'Phone number', ''];

  constructor
  (
    private orderService: OrderService,
    public dialog: MatDialog
  )
  {
    orderService.getAdminOrders().pipe(take(1)).subscribe((order) => this.order = order);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.customerSubscription = fromEvent(this.customerSearch.nativeElement, 'keyup')
        .pipe(
          distinctUntilChanged(),
          debounceTime(500),
        )
        .subscribe(data => {
          this.customerTerm = this.customerSearch.nativeElement.value;
          this.onCustomerInputChange();
        });
    }, 100);

    setTimeout(() => {
      this.addressSubscription = fromEvent(this.addressSearch.nativeElement, 'keyup')
        .pipe(
          distinctUntilChanged(),
          debounceTime(500),
        )
        .subscribe(data => {
          this.addressTerm = this.addressSearch.nativeElement.value;
          this.onAddressInputChange();
        });
    }, 100);

    setTimeout(() => {
      this.phoneSubscription = fromEvent(this.phoneSearch.nativeElement, 'keyup')
        .pipe(
          distinctUntilChanged(),
          debounceTime(500),
        )
        .subscribe(data => {
          this.phoneNumberTerm = this.phoneSearch.nativeElement.value;
          this.onPhoneNumberInputChange();
        });
    }, 100);
  }

  ngOnDestroy() {
    this.phoneSubscription.unsubscribe();
    this.customerSubscription.unsubscribe();
    this.addressSubscription.unsubscribe();
  }

  openDialog(orderId: string | undefined): void {
    this.dialog.open(ViewOrderComponent, {
      data: orderId
    });
  }

  onPhoneNumberInputChange() {
    this.orderService.searchFieldsFunction(this.customerTerm, this.addressTerm, this.phoneNumberTerm).subscribe(
      (order) => this.order = order
    )
  }

  onAddressInputChange() {
    this.orderService.searchFieldsFunction(this.customerTerm, this.addressTerm, this.phoneNumberTerm).subscribe(
      (order) => this.order = order
    )
  }

  onCustomerInputChange() {
    this.orderService.searchFieldsFunction(this.customerTerm, this.addressTerm, this.phoneNumberTerm).subscribe(
    (order) => this.order = order
    )
  }

  scrolledBottom() {
    console.log('Load more');
    this.pageNumb += 1;
    this.orderService.searchAllOrders(this.customerTerm, this.addressTerm, this.phoneNumberTerm, this.pageNumb, this.pageSize).subscribe(
      (orders) => {
        this.order = this.order.concat(orders)
      }
    )
  }
}
