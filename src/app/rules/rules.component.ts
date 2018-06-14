import { Component, OnInit } from '@angular/core';

import { Max } from '../init';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

  max: number;

  private _rules: string;

  constructor() {
    this.max = Max;
  }

  ngOnInit() {
  }

  get rules(): string {
    return `Voici le jeu Juniper Green, l'ordinateur 
    va choisir un nombre entre 1 et ${this.max}. Vous devez choisir un multiple ou un diviseur de ce dernier nombre qui n'a pas déjà été choisi par l'ordinateur ou vous-même.
     Celui qui ne peut plus choisir de nombre, en respectant ces règles, à perdu.`;
  }

}
