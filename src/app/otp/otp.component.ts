import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {AppUser} from "../models/app-user";

@Component({
  selector: 'otp-comp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {
  // @ts-ignore
  @ViewChild('otp0') otp0: ElementRef<HTMLInputElement>;
  // @ts-ignore
  @ViewChild('otp1') otp1: ElementRef<HTMLInputElement>;
  // @ts-ignore
  @ViewChild('otp2') otp2: ElementRef<HTMLInputElement>;
  // @ts-ignore
  @ViewChild('otp3') otp3: ElementRef<HTMLInputElement>;
  // @ts-ignore
  @ViewChild('otp4') otp4: ElementRef<HTMLInputElement>;
  // @ts-ignore
  @ViewChild('otp5') otp5: ElementRef<HTMLInputElement>;

  @Input('phoneNumber') phoneNumber: string = '';
  // @ts-ignore
  @Input('user') user: any;

  clickFail: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  foCusInput() {
    if (this.otp0.nativeElement.value.length === 1)
      this.otp1.nativeElement.focus();
    if (this.otp1.nativeElement.value.length === 1)
      this.otp2.nativeElement.focus();
    if (this.otp2.nativeElement.value.length === 1)
      this.otp3.nativeElement.focus();
    if (this.otp3.nativeElement.value.length === 1)
      this.otp4.nativeElement.focus();
    if (this.otp4.nativeElement.value.length === 1)
      this.otp5.nativeElement.focus();
  }

  verifyOtp() {
    let otpNumber: string = this.otp0.nativeElement.value + "" + this.otp1.nativeElement.value + "" + this.otp2.nativeElement.value +
      "" + this.otp3.nativeElement.value + "" + this.otp4.nativeElement.value + "" + this.otp5.nativeElement.value;
    this.authService.verifyOtp(otpNumber).subscribe(
      (res) => {
        if (res) {
          this.authService.register(this.user).subscribe(
            (response) => {
              if (response) {
                localStorage.setItem('token', response.accessToken);
                localStorage.setItem('cartId', response.cartId);
                localStorage.setItem('currentUser', response.currentUser);
                this.router.navigate(['/']).then(() => {
                  // Reload the current page
                  window.location.reload()
                });
              }
            }
          );
        } else {
          this.clickFail = true;
        }
      }
    );
  }
}
