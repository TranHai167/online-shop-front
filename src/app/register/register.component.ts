import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit{
  user: any = {};
  optRequired: boolean = false;
  fulfill: boolean = false;
  alertWidth: string = '0px';
  // @ts-ignore
  @ViewChild('emailInput', { static: true }) emailInput: ElementRef;
  inValidPhone: boolean = true;
  inValidEmail: boolean = false;

  constructor(private authService: AuthService) {}

  ngAfterViewInit() {
    // Get the initial width of the input field
    let initialWidth = this.emailInput.nativeElement.offsetWidth;
    this.alertWidth = (initialWidth) + 'px';
    console.log(this.alertWidth)
  }

  onSubmit() {
    // Implement user registration logic here
    console.log('User submitted:', this.user);
  }

  sendOtp() {
    if (this.inValidPhone)
      return;
    if (this.user.email && this.user.password && this.user.name && this.user.phone) {
      this.optRequired = true;
      this.fulfill = true;
      this.authService.createOtp(this.user.email, this.user.phone).subscribe((res) => {
        if (res.errorCode == 402) {
          this.inValidEmail = true;
          return
        } else if (res.errorCode == 200) {
          this.inValidEmail = false;
        }
      });
      return;
    }

    this.optRequired = true;
    this.fulfill = false;
    return;
  }

  onBlur() {}

  typingPhoneNumber() {}

  protected readonly blur = blur;

  completeTyping() {
    // @ts-ignore
    let valid = /^[0-9]{10}$/g.test(this.user.phone)
    this.inValidPhone = !valid;
  }
}
