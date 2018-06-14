import { Injectable } from '@angular/core';

@Injectable()
export class StorageNumberService {

  constructor() { }

  reset() {
    localStorage.clear();
  }

  setValues(data : any, key: string) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getValues(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

}