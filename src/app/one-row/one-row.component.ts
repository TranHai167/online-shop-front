import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../models/order";
import {ShippingDTO} from "../models/shipping";
import {ParseService} from "../services/parse.service";

@Component({
  selector: 'app-one-row',
  templateUrl: './one-row.component.html',
  styleUrls: ['./one-row.component.css']
})
export class OneRowComponent implements OnInit {

  @Input('columns') columns: string[] = [];
  @Input('rowData') data: any[] = [];
  @Input('elmWidth') elmWidth: string = '500px';
  @Input('spacePerLines') spacePerLines: string = '5px';
  @Input('isLinkLast') hasLinkLast: boolean = false;
  colNumber: number = 0;


  constructor(private parseService: ParseService) {
  }

  ngOnInit(): void {
    this.colNumber = this.columns.length;
  }

  scrolledBottom() {
    console.log('Load more');
  }
}
