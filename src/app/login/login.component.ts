import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // @ts-ignore
  password: string;
  // @ts-ignore
  email: string;
  failAuthentication: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {

  }

  onSubmit() {
    let credentials = {
      email: this.email,
      password: this.password
    }

    this.authService.login(credentials).subscribe(
      (res) => {
        if (res.status === 200) {
          localStorage.setItem('token', <string> res.body?.accessToken);
          localStorage.setItem('cartId', <string> res.body?.cartId);
          localStorage.setItem('currentUser', <string>res.body?.currentUser);
          this.router.navigate(['/']).then(() => {
            // Reload the current page
            window.location.reload()
          });
        }
      },
      (error) => {
        if (error.status === 403)
          this.failAuthentication = true;
      }
    );
  }

  reauthorize() {
    this.failAuthentication = false;
  }
}
