import {Component, ElementRef, ViewChild} from '@angular/core';

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
}
