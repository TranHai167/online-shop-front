import { Component } from '@angular/core';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent {

  constructor() {}

  openCouponPage(deal: string) {
    if (deal == 'deal1') {
      window.location.href = 'https://www.gkitchen.com/khuyen-mai-chi-tiet?promotionID=1305';
    } else if (deal == 'deal2') {
      window.location.href = 'https://www.gkitchen.com/khuyen-mai-chi-tiet?promotionID=1333';
    } else if (deal == 'deal3') {
      window.location.href = 'https://www.gkitchen.com/khuyen-mai-chi-tiet?promotionID=400';
    } else if (deal == 'deal4') {
      window.location.href = 'https://www.gkitchen.com/khuyen-mai-chi-tiet?promotionID=1328';
    } else if (deal == 'deal5') {
      window.location.href = 'https://www.gkitchen.com/khuyen-mai-chi-tiet?promotionID=1232';
    }
  }
}
