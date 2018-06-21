import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as firebase from 'firebase';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

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

  constructor( private authService: AuthService) {
    firebase.initializeApp(environment.firebase);
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

  ngAfterViewInit() {
    console.log('init ... view')

  }

  deconnection() {
    this.authService.logout();
  }
}