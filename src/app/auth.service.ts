import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  constructor() { }

  createUser(email: string, password: string, pseudo: string): Promise<any> {

    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          (user) => {
            // c'est uid de l'utilisateur qui servira de repère dans les données de la base firebase
            this.updateGame(pseudo, user.uid).then(
              () => {
                resolve("start a new game ...");
              },
              error => {
                reject(`error update game database ${error}`);
              }
            )
          },
          (error) => {
            reject(`error created user ${error}`);
          }
        );
      }
    );
  }

  login(email: string, password: string): Promise<string> {

    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          (user) => {
            resolve('connected');
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  logout() {
    firebase.auth().signOut();
  }

  isValidUser(pseudo: string): Promise<boolean> {

    return new Promise(
      (resolve, reject) => {
        firebase.database().ref("players").equalTo("pseudo", pseudo).once("value", snapshot => {
          const userData = snapshot.val();
          if (userData) {
            console.log("exists!");

            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
  }

  canActivate(): Promise<boolean> {

    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if (user) {
              resolve(true);
            } else {
              resolve(false);
            }
          }
        );
      }
    );
  }


  updateGame(pseudo: string, uid : string): PromiseLike<any> {

    const date = (new Date()).toDateString();

    return firebase.database().ref("players/" + uid).set(
      {
        "user": {
          "pseudo": pseudo,
          "score": 0,
          "choices": [
            0
          ],
          "status": 0
        },
        "computer": {
          "pseudo": "chewbaca",
          "score": 0,
          "choices": [
            0
          ],
          "status": 0
        },
        "information": {
          "tour": 0,
          "created": date
        }
      }
    );
  }
}