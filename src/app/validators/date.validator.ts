import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Convert } from '../utils/convert';

export class DateValidator {
    /**
     *  @param maxDate Format yyyyMMdd
     */
    static maxDateValidator(maxDate: string | number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            let controlValue = Number.parseInt(Convert.toyyyyMMdd(control.value));
            let max = Number.parseInt(maxDate.toString());
            if (controlValue > max) {
                return { error: true };
            } else {
                return null
            }
        };
    }
    
    /**
     *  @param minDate Format yyyyMMdd
     */
    static minDateValidator(minDate: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            let controlValue = Number.parseInt(Convert.toyyyyMMdd(control.value));
            let min = Number.parseInt(minDate.toString());
            if (controlValue < min) {
                return { error: true };
            } else {
                return null
            }
        };
    }
}