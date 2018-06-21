import { Injectable } from '@angular/core';

import { UserJSON, User } from './init';
import { Observable } from 'rxjs';

import * as firebase from 'firebase';

@Injectable()
export class JuniperDatabaseService {

  constructor() { }

  getUserJSON(user: UserJSON): UserJSON {
    return {
      pseudo: user.pseudo,
      score: user.score,
      choices: user.choices,
      status: user.status
    };
  }

  getUsers(uid: string): Observable<User> {

    return new Observable(observer => {
      let ref = firebase.database().ref("/players/" + uid)
        .once("value")
        .then((data) => {
          observer.next(data.val());
        });
    });
  }

  /**
   * 
   * @param key 
   * @param id 
   * @description id offset 0 user and 1 chewbaca
   */
  getUser(key: number | string, id: number): Observable<User> {

    return new Observable(
      (observer) => {
        firebase.database().ref('/rooms/' + key + '/users/').once('value').then(
          (data) => {
            observer.next(data.val()[id]);
          }, (error) => {
            console.error('error getUser')
          }
        );
      }
    );
  }

  updateUser(uid: string, user: User) {

    let User = { 'score': user.score, 'status': user.status, 'choices': user.choices() };
    let Data;

    if (user.pseudo == 'chewbaca') {
      Data = {
        'computer': User
      }
    } else {
      Data = { 'user': User }
    }

    let ref = firebase.database().ref('/players/' + uid);
    ref.update(Data);

    let information = firebase.database().ref('/players/' + uid + '/information/tour').transaction(tour => {
      return (tour || 0) + 1;
    });
  }
}