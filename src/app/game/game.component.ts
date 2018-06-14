import { Component, OnInit } from '@angular/core';
import { JunipergreenService } from '../junipergreen.service';
import { FormControl } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';

import { User, Max } from '../init';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  choiceForm: FormGroup;
  user: User;
  Players: { 'player1': User, 'player2': User, 'tour': number, 'lastNumber'? : number };
  tour: number = 0;
  possibles: Array<number> = [];
  valid: Array<number>;
  message: string;

  Max: number; // information sur l'intervalle des valeurs à jouer

  choices: Array<number> = [];

  constructor(
    private junipergreenService: JunipergreenService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
    this.Max = Max;

    // players 
    let chewbacca = new User('chewbacca');
    let Alan = new User('Alan');

    chewbacca.choice = this.junipergreenService.choice(0); // on mémorise son choix
    this.Players = { 'player1': chewbacca, 'player2': Alan, 'tour': 1 };

    this.junipergreenService.remove(chewbacca.choice);

    // Quelles seront les valeurs possibles pour le prochain tour, valeurs à cachées 
    this.valid = this.junipergreenService.valid(chewbacca.choice);

    // On place la valeur déjà jouée dans la liste choices
    this.choices.push(chewbacca.choice);

    // Si il n'y a pas de possibilité alors Chewbaca gagne tout de suite 
    if (this.valid.length == 0) {
      this.Players.player1.status = `Chewbaca vous gagnez c'est formidable ! `;
      this.Players.player1.score += 1;

      this.Players.lastNumber = chewbacca.choice; // le dernier choix sélectionné

      return this.redirectStatus(this.Players);
    }

    // on place les nombres pour le joueur sur la colonne de gauche pour lui faciliter l'insertion d'un choix
    this.possibles = this.junipergreenService.Possibles;
  }

  createForm() {
    this.choiceForm = new FormGroup({
      'choice': new FormControl('', [
        Validators.required,
        Validators.maxLength(3),
        Validators.pattern('[1-9]{1}[0-9]*')
      ])
    });
  }

  get choice() { return this.choiceForm.get('choice'); }

  onSubmitChoice() {
    let choice = Number(this.choiceForm.value['choice']);
    let flag: boolean; // pour savoir si le choix est bon 
    flag = this.valid.indexOf(choice) == -1 ? false : true;

    // bon choix du joueur 
    if (flag == true) {
      this.choices.push(choice); // valeur déjà joué
      this.junipergreenService.remove(choice);

      this.Players.player2.score += 1; // on incrémente son score
      this.Players.player2.choice = choice; // On mémorise ses choix

      // on incrémente le nombre de tour 
      this.Players.tour++;

      // c'est au tour de Chewbaca 
      choice = this.junipergreenService.choice(choice);

      // si choice vaut 0 c'est que plus rien n'est possible c'est le joueur qui gagne contre Chewbaca
      if (choice == 0) {
        this.Players.player2.status = 'Winner';
        this.Players.player2.status = `Alan vous gagnez c'est formidable ! `;

        this.Players.lastNumber = choice; // le dernier choix sélectionné

        return this.redirectStatus(this.Players); // on affiche les résultats 
      }

      this.junipergreenService.remove(choice);
      this.choices.push(choice); // valeurs déjà joué

      // on recalcule les valeurs possibles pour le prochain tour
      this.valid = this.junipergreenService.valid(choice);
      this.Players.player1.choice = choice;

      // on place les nombres pour le joueur sur la colonne de gauche pour lui faciliter l'insertion d'un choix
      this.possibles = this.junipergreenService.Possibles;

    } else {
      // On demande au joueur de rejouer 
      this.message = `Votre choix ${choice} n'est pas correcte réessayer ...`;

      this.reset(); // on nettoye le formulaire
    }
  }

  redirectStatus(players: { 'player1': User, 'player2': User }) {
    localStorage.setItem('storage', JSON.stringify(players));

    return this.router.navigate(['/status']);
  }

  onChoice(choice) {
    this.choiceForm.setValue({
      choice: choice.choice
    });
  }

  reset() {
    this.createForm();
  }

}