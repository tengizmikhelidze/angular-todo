import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  private storage = sessionStorage;

  constructor() { }

  setStorage(obj: {id: number, name:string, checked:boolean}[]){
    this.storage.setItem('todoList',JSON.stringify(obj));
  }
  getStorage(): {id: number, name:string, checked:boolean}[]{
    return JSON.parse(this.storage.getItem('todoList'));
  }
}
