import { Component, OnInit } from '@angular/core';
import { JunipergreenService } from '../junipergreen.service';
import { FormControl } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';

import { User, Max } from '../init';
import { Router } from '@angular/router';
import { JuniperDatabaseService } from '../juniper-database.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  choiceForm: FormGroup;

  possibles: Array<number> = [];
  valid: Array<number> = [];
  choices: Array<number> = [];

  message: string;

  user: User;
  chewbaca: User;

  Max: number; // information sur l'intervalle des valeurs à jouer
  users$;
  uid: string; // uid de l'utilisateur connecté => room 

  status: string = 'start';

  connected$;

  constructor(
    private junipergreenService: JunipergreenService,
    private router: Router,
    private database: JuniperDatabaseService
  ) {
    this.uid = firebase.auth().currentUser.uid;
    this.Max = Max;
  }

  ngOnInit() {
    this.createForm();

    this.connected$ = this.database.connectedUsers();

    this.users$ = this.database.game(this.uid).subscribe(
      data => {
        this.user = new User(data['user']);
        this.chewbaca = new User(data['computer']);
        let choice;

        this.status = data['information']['status'];

        if (data['information']['status'] == "closed") {

          return this.redirectStatus();
        }

        if (data['information']['status'] == "progress") {
          choice = data['information']['choices'][data['information']['choices'].length - 1]; // si on recharge la page c'est le dernier choix enregistré
          this.junipergreenService.Possibles = data['information']['possibles'];

          this.possibles = data['information']['possibles'];
          this.choices = data['information']['choices'];

        } else {
          this.junipergreenService.generatePossible();
          this.possibles = this.junipergreenService.Possibles;
          choice = this.junipergreenService.choice(0); // on mémorise son choix
        }

        this.junipergreenService.remove(choice);

        // Quelles seront les valeurs possibles pour le prochain tour, valeurs à cachées 
        this.valid = this.junipergreenService.valid(choice);

        // On place la valeur déjà jouée dans la liste choices
        this.choices.push(choice);

        this.chewbaca.choice = choice;

        // Si il n'y a pas de possibilité alors Chewbaca gagne tout de suite 
        if (this.valid.length == 0) {

          // faire persisté les données et faire une redirection 
          this.chewbaca.status = 1;
          this.chewbaca.score += 1;

          this.database.updateGame(this.uid, this.chewbaca, this.junipergreenService.Possibles, this.choices, "closed");

          return this.redirectStatus();
        }

        // dans le cas où il ne gagne pas on continue
        this.database.updateGame(this.uid, this.chewbaca, this.junipergreenService.Possibles, this.choices, "progress");
        // on place les nombres pour le joueur sur la colonne de gauche pour lui faciliter l'insertion d'un choix
        this.possibles = this.junipergreenService.Possibles;
      },
      error => {
        console.error('Erreur ! : ' + error);
      }
    );
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
    let flag: boolean;
    // pour savoir si le choix est bon 
    flag = this.valid.indexOf(choice) == -1 ? false : true;

    // bon choix du joueur 
    if (flag == true) {
      this.choices.push(choice); // valeur déjà joué
      this.junipergreenService.remove(choice);

      this.user.score += 1; // on incrémente son score
      this.user.choice = choice; // On mémorise ses choix

      this.database.updateGame(this.uid, this.user, this.possibles, this.choices, "progess");

      // c'est au tour de Chewbaca 
      choice = this.junipergreenService.choice(choice);

      // si choice vaut 0 c'est que plus rien n'est possible c'est le joueur "user" qui gagne contre Chewbaca
      if (choice == 0) {

        this.user.status = 1;
        this.user.choice = choice;

        // mise à jour en base de données 
        this.database.updateGame(this.uid, this.user, this.possibles, this.choices, "closed");

        return this.redirectStatus(); // on affiche les résultats 
      }


      this.junipergreenService.remove(choice);
      this.choices.push(choice); // valeurs déjà joué

      // on recalcule les valeurs possibles pour le prochain tour
      this.valid = this.junipergreenService.valid(choice);
      this.chewbaca.choice = choice;
      this.chewbaca.score++;

      this.possibles = this.junipergreenService.Possibles;

      // mise à jour en base de données 
      this.database.updateGame(this.uid, this.chewbaca, this.possibles, this.choices, "progress");

    } else {

      // le joueur a-t-il perdu ? 0 oui 
      if (this.valid.length == 0) {
        this.chewbaca.status = 1;
        this.chewbaca.score++;

        this.database.updateGame(this.uid, this.chewbaca, this.possibles, this.choices, "closed");

        return this.redirectStatus(); // on affiche les résultats 
      }

      // On demande au joueur de rejouer 
      this.message = `Votre choix ${choice} n'est pas correcte réessayer ...`;
    }

    this.reset(); // on nettoye le formulaire

  }

  redirectStatus() {

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