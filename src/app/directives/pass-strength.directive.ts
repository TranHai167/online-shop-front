import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from "@angular/forms";

@Directive({
  selector: '[appPassStrength]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PassStrengthDirective,
      multi: true,
    },
  ],
})
export class PassStrengthDirective  implements Validator {

  @Input('appPasswordStrength') strength: string = ''; // You can pass a strength parameter if needed

  validate(control: AbstractControl): { [key: string]: any } | null {
    const value: string = control.value;

    if (!value) {
      return null; // If no password is provided, assume it's valid (you might adjust this based on your requirements)
    }

    const hasNumber: boolean = /\d/.test(value);
    const hasCharacter: boolean = /[a-zA-Z]/.test(value);
    const hasSpecialCharacter: boolean = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value);

    const isValid: boolean = hasNumber && hasCharacter && hasSpecialCharacter;

    return isValid ? null : { passwordStrength: true };
  }

}
