import { AbstractControl } from '@angular/forms';

import { Injectable } from '@angular/core';



@Injectable({ providedIn: 'root' })

export class InputValidators {


    static validateInput = (rule: any) => {

        return (control: AbstractControl) => {

            const regexp = rule;

            const valid = regexp.test(control.value);

            return valid ? null : { invalidInput: true };

        };

    }



    static minValueValidator = (min: any) => {

        return (control: AbstractControl) => {

            const regexp = min;

            const valid = regexp.test(control.value);

            return valid ? null : { invalidMin: true };

        };

    }



    // Other custom validator related to input goes here...

}
