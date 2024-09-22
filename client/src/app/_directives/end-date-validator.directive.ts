import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appEndDateValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EndDateValidatorDirective,
    multi: true
  }],
  standalone: true
})
export class EndDateValidatorDirective implements Validator{

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    // Set time to midnight to compare only the date
    selectedDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    // Return an error if selected date is in the past
    return selectedDate < currentDate ? { invalidEndDate: true } : null;
  }
}
