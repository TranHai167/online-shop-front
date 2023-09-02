import { Component } from '@angular/core';
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: any = {};
  optRequired: boolean = false;
  fulfill: boolean = false;

  onSubmit() {
    // Implement user registration logic here
    console.log('User submitted:', this.user);
  }

  sendOtp() {
    if (this.user.email && this.user.password && this.user.name && this.user.role && this.user.phone) {
      this.optRequired = true;
      this.fulfill = true;
      return;
    }

    this.fulfill = false;
    return;
  }
}
