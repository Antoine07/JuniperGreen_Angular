import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { JuniperDatabaseService } from '../juniper-database.service';
import { User } from '../init';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  uid: string;
  user: User;
  chewbaca: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private database: JuniperDatabaseService
  ) {
    this.uid = firebase.auth().currentUser.uid;
  }

  ngOnInit() {

    this.database.game(this.uid).subscribe(
      (game) => {
        this.user = new User(game['user']);
        this.chewbaca = new User(game['computer']);
      }
    );

  }

  replay() {
    this.database.resetGame(this.uid);

    return this.router.navigate(['/game']);
  }

}
