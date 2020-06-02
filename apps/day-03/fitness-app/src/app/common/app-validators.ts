import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

export class AppValidators {
  static isEmailTakenSync(control: AbstractControl): ValidationErrors | null {
    if (control.value === 'naveen@abc.com') {
      return {
        isEmailTaken: true
      }
    }
    return null;
  }

  static isEmailTakenAsync(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'naveen@abc.com') {
          resolve({
            isEmailTaken: true
          })
        } else {
          resolve(null);
        }
      }, 3000);
    });
  }
}
