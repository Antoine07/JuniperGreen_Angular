import { Injectable } from '@angular/core';

@Injectable()
export class StorageNumberService {

  constructor() { }

  reset() {
    localStorage.clear();
  }

  setValue(data : {}, key: string) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getValue(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

}