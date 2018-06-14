import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';

export function controlNames(names: Array<string>): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {

    let forbidden = true;

    names.forEach(data => {
      if (control.value == data) {
        forbidden = false;

        return;
      }
    })

    return forbidden ? { 'controlNames': { value: control.value } } : null;
  };
}

@Directive({
  selector: '[controlNames]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ControlValidatorDirective, multi: true }]
})

export class ControlValidatorDirective implements Validator {
  @Input('controlNames') names: Array<string>;

  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.names ? controlNames(this.names)(control)
      : null;
  }
}