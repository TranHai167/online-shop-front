import {Component, Input, OnInit} from '@angular/core';

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

  ngOnInit(): void {
    this.columns = ['Name', 'Age', 'Phone'];
    this.data = [
      {'Name': 'Hai', 'Age': 12, 'Phone': '20942309'},
      {'Name': 'Hai', 'Age': 12, 'Phone': '20942309'},
      {'Name': 'Hai', 'Age': 12, 'Phone': '20942309'},
    ];
    console.log('Oke')
    this.colNumber = this.columns.length;
  }
}
