import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import * as firebase from 'firebase';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { JuniperDatabaseService } from './juniper-database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  levelForm: FormGroup;
  isConnect: boolean;
  key: string;

  uid: string;

  constructor(private authService: AuthService, private router: Router, private database: JuniperDatabaseService) {
    firebase.initializeApp(environment.firebase);

    if(firebase.auth().currentUser)
      this.uid = firebase.auth().currentUser.uid;
  }

  ngOnInit() {
    this.levelForm = new FormGroup({
      'range': new FormControl('', [
      ])
    });

    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isConnect = true;
          this.key = user.uid; // uid de l'utilisateur sert à se repérer dans les données de l'application
        } else {
          this.isConnect = false;
          this.key = null;
        }
      }
    );
  }

  deconnection() {
    this.authService.logout();

    if (this.uid)
      this.database.resetGame(this.uid);

    return this.router.navigate(['/rule']);

  }
}