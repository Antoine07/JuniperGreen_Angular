import { AbstractControl, ValidatorFn } from '@angular/forms';


export function forbiddenName(list: Array<any>): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {

    let forbidden = false;

    list.forEach(data => {
      if (control.value == data) forbidden = true;
    });

    return forbidden ? { 'forbiddenName': { value: control.value } } : null;
  };
}
