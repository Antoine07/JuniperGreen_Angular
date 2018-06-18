import { Injectable } from '@angular/core';
import { Max } from './init';

@Injectable()
export class JunipergreenService {
  private _Possibles: Array<number> = [];

  constructor() {
    this._Possibles = Array.from(Array(Max).keys(), x => x + 1);
  }

  possibleMultiple(num: number): Array<number> {
    let multiple = [];
    let j = 2;
    let candidat = j;

    while (candidat < Max) {
      candidat = j * num;
      if (this._Possibles.indexOf(candidat) != -1) multiple.push(candidat);

      j++;
    }

    return multiple;
  }

  possibleDivisor(num: number): Array<number> {
    let divisors = [];
    let d = 2;

    while (d <= num) {
      if (num % d == 0 && this._Possibles.indexOf(d) != -1) {
        divisors.push(d);
      }

      d++;
    }

    return divisors;
  }

  choice(number: number): number {

    if (number == 0) return this._Possibles[Math.round(this._Possibles.length * Math.random())];

    let valid = this.valid(number);
    let pos = Math.round(Math.random() * (valid.length - 1));

    return valid[pos] | 0;
  }

  remove(number: number): void | boolean {
    let index = this.Possibles.indexOf(number);

    if (index == -1) return false;

    this.Possibles.splice(index, 1);
  }

  valid(choice: number): Array<number> {

    let divisors = this.possibleDivisor(choice);
    let multiples = this.possibleMultiple(choice);
    let union = divisors.concat(multiples);

    return union.filter((num, pos) => { return union.indexOf(num) == pos; })
  }

  get Possibles(): Array<number> {
    return this._Possibles;
  }

}