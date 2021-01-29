import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {
  todo : string ='';
  todoID : number = 1;
  todoList : {id: number, name:string, checked:boolean}[] = [];
  todoChecked : {id: number, name:string, checked:boolean}[] = [];
  todoDefault  : {id: number, name:string, checked:boolean}[] = []
  selectItem : string = 'All';
  constructor() { }

  ngOnInit(): void {

  }

  checkDefault(){
    if(this.selectItem === 'All'){
      this.todoDefault = this.todoList;
    } else if (this.selectItem === 'Checked'){
      this.todoDefault =this.todoChecked;
    } else if(this.selectItem === 'Unchecked'){
      this.todoDefault = this.todoList.map(object => object).filter((element)=>{return element['checked']===false});
    }
  }

  addTodo(){
    if(this.todo === ''){
      alert('შემოიტანეთ არაცარიელი ელეენტი')
    } else {
      this.todoList.push({id : this.todoID,name : this.todo, checked : false});
      this.checkDefault();
      this.todoID++;
      this.todo = '';
    }
  }

  removeTodo(id: number){
    this.todoList = this.todoList.map(object => object).filter((element)=>{return element['id']!==id});
    this.todoChecked =  this.todoList.map(object => object).filter((element)=>{return element['checked']===true})
    this.checkDefault();
  }

  checkTodo(id: number){
    this.todoList.map(object => object).map((element) =>{
      if(element['id'] === id){
        element['checked'] = !element['checked'];
      }
    })
    this.todoChecked =  this.todoList.map(object => object).filter((element)=>{return element['checked']===true})
    this.checkDefault();
  }

  selectChange(){
    this.checkDefault();
  }
}
