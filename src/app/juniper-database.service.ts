import { Injectable } from '@angular/core';

import { UserJSON, User } from './init';
import { Observable, Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';
import * as firebase from 'firebase';

@Injectable()
export class JuniperDatabaseService {

  users: User[] = [];
  usersSubject = new Subject<User[]>();

  emitUsers() {
    this.usersSubject.next(this.users);
  }

  constructor(private http: HttpClient) {

    firebase.initializeApp(environment.firebase);

  }

  getUserJSON(user: UserJSON): UserJSON {
    return {
      key: user.key,
      name: user.name,
      score: user.score,
      created: user.created.toString(),
      choices: user.choices,
      avatar: user.avatar,
      status: user.status
    };
  }

  getUsers(room: number | string): Observable<User> {

    return new Observable(observer => {
      let ref = firebase.database().ref("rooms/" + room + "/users").orderByKey()
        .once("value")
        .then(function (user) {
          observer.next(user.val());
        });
    });
  }

  getUser(room: number | string, id: number): Observable<User> {

    return new Observable(
      (observer) => {
        firebase.database().ref('/rooms/' + room + '/users/' + id).once('value').then(
          (data) => {
            observer.next(data.val());
          }, (error) => {
            console.error('error getSingleUser')
          }
        );
      }
    );
  }

  updateUser(room: number, user: User) {
    let userJson: UserJSON = new UserJSON;

    userJson.name = user.name;
    userJson.score = user.score;
    userJson.status = user.status;
    userJson.choices = user.choices();

    console.log(user.key)

    firebase.database().ref().child('/rooms/' + room + '/users/' + user.key)
      .update(userJson);
  }

  updateInformation(room: number, tour: number) {

    firebase.database().ref().child('/rooms/' + room + '/informations/')
      .update({ 'tour': tour });
  }
}