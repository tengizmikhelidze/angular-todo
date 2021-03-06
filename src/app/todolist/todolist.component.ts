import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SessionStorageService } from '../shared/services/session/session-storage.service';
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
  providers: [MessageService]
})
export class TodolistComponent implements OnInit {
  todo : string ='';
  todoID : number = 1;
  todoList : {id: number, name:string, checked:boolean}[] = [];
  todoChecked : {id: number, name:string, checked:boolean}[] = [];
  todoDefault  : {id: number, name:string, checked:boolean}[] = []
  selectItem : string = 'All';
  constructor(private session: SessionStorageService, private messageService: MessageService) { }

  ngOnInit(): void {
    window.onbeforeunload =(event)=>{
      this.session.setStorage(this.todoList);
    }
    if(this.session.getStorage() && this.session.getStorage().length !==0 ){
      this.todoList = this.session.getStorage();
      this.checkDefault();
    }
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
      this.messageService.add({severity:'error', summary:'Please Enter Your Todo', detail:'Error'});
    }else if(this.todoList.filter(item=>this.todo===item.name).length !== 0){
      this.messageService.add({severity:'error', summary:'Todo Already Exists', detail:'Error'});
    } else {
      this.messageService.add({severity:'success', summary:'Todo Added', detail:'Updated Todolist'});
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
