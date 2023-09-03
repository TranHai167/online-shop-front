import { Component } from '@angular/core';
import {filter} from "rxjs/operators";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: any = {};
  optRequired: boolean = false;
  fulfill: boolean = false;


  constructor(private authService: AuthService) {
  }

  onSubmit() {
    // Implement user registration logic here
    console.log('User submitted:', this.user);
  }

  sendOtp() {
    console.log(this.user.phone);
    if (this.user.email && this.user.password && this.user.name && this.user.phone) {
      this.optRequired = true;
      this.fulfill = true;
      this.authService.createOtp(this.user.phone).subscribe();
      return;
    }

    this.optRequired = true;
    this.fulfill = false;
    return;
  }
}
