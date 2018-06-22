import { Injectable } from '@angular/core';

import { UserJSON, User } from './init';
import { Observable, Subject } from 'rxjs';

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

  game(uid: string): Observable<any> {

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
  getUser(uid: string): Promise<User> {

    return firebase.database().ref('/players/' + uid + '/user').once('value').then(
      user => { return user.val() }
    );

  }

  updateGame(uid: string, user: User, possibles: Array<number>, choices: Array<number>, status: string = "progress") {

    let userChoices = user.choices();

    userChoices = userChoices.filter((num, pos) => { return choices.indexOf(num) == pos; })

    let User = { 'score': user.score, 'status': user.status, 'choices': userChoices, 'pseudo': user.pseudo };
    let Data;

    choices = choices.filter((num, pos) => { return choices.indexOf(num) == pos; })

    let Information = { 'possibles': possibles, 'choices': choices, "lastChoice": choices[choices.length - 1], 'status': status }

    if (user.pseudo == 'chewbaca') {
      Data = { 'computer': User, 'information': Information }
    } else {
      Data = { 'user': User, 'information': Information }
    }

    let ref = firebase.database().ref('/players/' + uid);
    ref.update(Data);

    let information = firebase.database().ref('/players/' + uid + '/information/tour').transaction(tour => {
      return (tour || 0) + 1;
    });
  }

  async resetGame(uid: string) {

    let user = await this.getUser(uid);

    let Information = { 'possibles': "", 'choices': "", "lastChoice": "", 'status': "start" }
    let User = { 'score': 0, 'status': 0, 'choices': "", 'pseudo': user.pseudo };
    let Chewbaca = { 'score': 0, 'status': 0, 'choices': "", 'pseudo': 'chewbaca' };

    let Data = {
      'user': User,
      'computer': Chewbaca,
      'information': Information
    };

    let ref = firebase.database().ref('/players/' + uid);
    ref.update(Data);

  }

  connectedUsers() : Observable<number> {
    const connectedRef = firebase.database().ref(".info/connected");
    let num = 0;

    return new Observable(observer => {
      connectedRef.once('value').then((snap) => {
        if (snap.val() == true) num++;
        else { if (num > 0) num--; }

        observer.next(num);
      });

    })



  }

}