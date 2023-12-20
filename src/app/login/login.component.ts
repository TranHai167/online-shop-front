import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {RegisterComponent} from "../register/register.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  // @ts-ignore
  password: string;
  isFocused: boolean = false;
  // @ts-ignore
  email: string;
  failAuthentication: boolean = false;
  height: string = '';
  // @ts-ignore
  @ViewChild('contentContainer', { static: true }) contentContainer: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {

  }

  ngAfterViewInit() {
    let divHeight = this.contentContainer.nativeElement.offsetHeight;
    this.height = (divHeight - 250 - 5) + 'px';
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

  focusing() {
    this.isFocused = !this.isFocused
  }

  openRegisterDialog() {
    const dialogRef = this.dialog.open(RegisterComponent);

    dialogRef.afterClosed().subscribe(result => {});
  }
}
