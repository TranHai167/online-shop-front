import { Component } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {UserDto} from "../models/user-model";
import {UserService} from "../services/user.service";
import {take} from "rxjs/operators";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-admin-accounts',
  templateUrl: './admin-accounts.component.html',
  styleUrls: ['./admin-accounts.component.css']
})
export class AdminAccountsComponent {
  options = [
    { value: 'user', label: 'User' },
    { value: 'admin', label: 'Admin' }
  ];
  users: UserDto[] = []
  selectedValue: string = 'user';
  columns: string[] = ['Email', 'Name', 'Role'];


  constructor(private userService: UserService) {
    this.loadUsers();
  }

  onEmailInputChange($event: Event) {
    console.log('Email change');
  }

  onNameInputChange($event: Event) {
    console.log('Name change');
  }

  scrolledBottom() {
    console.log('Load more')
  }

  loadUsers() {
    this.userService.getAllUsers().pipe(take(1)).subscribe((users) => {
      this.users = users;
    });
  }
}
