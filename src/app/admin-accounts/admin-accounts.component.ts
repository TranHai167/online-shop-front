import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { UserDto } from "../models/user-model";
import { UserService } from "../services/user.service";
import { take } from "rxjs/operators";
import { end } from "@popperjs/core";
import { AuthService } from "../services/auth.service";
import { AppUser } from "../models/app-user";
import { Router } from "@angular/router";

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
  users: UserDto[] = [];
  filteredUsers: UserDto[] = [];
  selectedValue: string = 'user';
  columns: string[] = ['Name', 'Email', 'Role'];


  constructor(private userService: UserService,
    private authService: AuthService,
    private router: Router) {
    this.loadUsers();
  }

  scrolledBottom() {
    console.log('Load more')
  }

  loadUsers() {
    this.userService.getAllUsers().pipe(take(1)).subscribe((users) => {
      this.filteredUsers = this.users = users;
    });
  }

  deleteUser(name: string | undefined, email: string | undefined, role: string) {
    if (typeof email === 'undefined') {
      email = '';
    }

    if (name === undefined) {
      name = '';
    }
    if (role == 'ADMIN') {
      return;
    }

    let appUser: AppUser;
    this.authService.getUserDetail().pipe(take(1)).subscribe((data) => {
      appUser = new AppUser(data.name, data.admin);
      // @ts-ignore
      if (name.toUpperCase() == appUser.name.toUpperCase()) {
        return;
      } else {
        this.userService.deleteUser(email).pipe(take(1)).subscribe();
        this.router.navigate(['/admin/accounts']).then(() => {
          // Reload the current page
          setTimeout(() => {

            window.location.reload()
          }, 800)
        });
      }
    })
  }

  emailFilter(email: string) {
    // @ts-ignore
    this.filteredUsers = (email) ?
      this.users.filter(p => p.email.toLowerCase().includes(email.toLowerCase())) :
      this.users;
  }

  nameFilter(name: string) {
    this.filteredUsers = (name) ?
      this.users.filter(p => p.name.toLowerCase().includes(name.toLowerCase())) :
      this.users;
  }

  roleSelectChange(event: Event) {
    const role = (event.target as HTMLSelectElement).value;
    this.filteredUsers = (role) ?
      this.users.filter(p => p.role.toLowerCase().includes(role.toLowerCase())) :
      this.users;
  }
}
