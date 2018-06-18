import { Component, OnInit } from '@angular/core';
import { JunipergreenService } from '../junipergreen.service';
import { FormControl } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';

import { User, Max } from '../init';
import { Router } from '@angular/router';
import { JuniperDatabaseService } from '../juniper-database.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  choiceForm: FormGroup;
  possibles: Array<number> = [];
  valid: Array<number>;
  message: string;

  player1: User;
  player2: User;

  tour: number = 0;

  Max: number; // information sur l'intervalle des valeurs à jouer

  choices: Array<number> = [];

  users$;

  constructor(
    private junipergreenService: JunipergreenService,
    private router: Router,
    private database: JuniperDatabaseService
  ) { }

  ngOnInit() {
    this.createForm();
    this.Max = Max;

    this.users$ = this.database.getUsers(0).subscribe(
      user => {
        // hydratation 
        this.player1 = new User(this.database.getUserJSON(user[0]));
        this.player2 = new User(this.database.getUserJSON(user[1]));

        this.player1.choice = this.junipergreenService.choice(0); // on mémorise son choix

        this.junipergreenService.remove(this.player1.choice);

        // Quelles seront les valeurs possibles pour le prochain tour, valeurs à cachées 
        this.valid = this.junipergreenService.valid(this.player1.choice);

        // On place la valeur déjà jouée dans la liste choices
        this.choices.push(this.player1.choice);

        this.tour++;

        console.log(this.player1.key)

        this.database.updateUser(0, this.player1);
        // this.database.updateInformation(0, this.tour);

        // Si il n'y a pas de possibilité alors Chewbaca gagne tout de suite 
        if (this.valid.length == 0) {

          // faire persisté les données et faire une redirection 

          this.player1.status = 1;
          this.player1.score = 100;

          this.database.updateUser(0, this.player1);

          return this.redirectStatus();
        }

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

      this.player2.score += 1; // on incrémente son score
      this.player2.choice = choice; // On mémorise ses choix

      this.database.updateUser(0, this.player2);
      this.database.updateInformation(0, this.tour);

      // c'est au tour de Chewbaca 
      choice = this.junipergreenService.choice(choice);

      // si choice vaut 0 c'est que plus rien n'est possible c'est le joueur 2 qui gagne contre Chewbaca
      if (choice == 0) {

        this.player2.status = 1;
        this.player2.choice = choice;

        // mise à jour en base de données 
        this.database.updateUser(0, this.player2);
        this.database.updateInformation(0, this.tour);

        return this.redirectStatus(); // on affiche les résultats 
      }

      this.junipergreenService.remove(choice);
      this.choices.push(choice); // valeurs déjà joué

      // on recalcule les valeurs possibles pour le prochain tour
      this.valid = this.junipergreenService.valid(choice);
      this.player1.choice = choice;

      this.possibles = this.junipergreenService.Possibles;

      // mise à jour en base de données 
      this.database.updateUser(0, this.player1);
      this.database.updateInformation(0, this.tour);

    } else {

      // le joueur a-t-il perdu ? 0 oui 
      if (this.valid.length == 0) {


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