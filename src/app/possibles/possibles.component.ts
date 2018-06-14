import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface Choice {
  choice: number;
}

@Component({
  selector: 'app-possibles',
  templateUrl: './possibles.component.html',
  styleUrls: ['./possibles.component.scss']
})
export class PossiblesComponent implements OnInit {

  @Input() valid: Array<number>;
  @Input() choices: Array<number>;
  @Input() possibles: Array<number>;

  @Output() choice = new EventEmitter<Choice>();

  message: string;

  showSolution: boolean = false;

  constructor() { }

  selectChoice(choice: number) {
    this.choice.emit({ 'choice': choice });
  }

  ngOnChanges() {
    let count = this.possibles.length;
    this.message = `Choisissez une bonne valeur dans les valeurs qui n'ont pas encore été choisi, il en reste ${count}`;
  }

  ngOnInit() {
  }

  isValid(num: number): boolean {

    if (this.showSolution == false) return false;

    return this.valid.indexOf(num) != -1;
  }

  solution() {
    this.showSolution = this.showSolution ? false : true ;
  }

}
