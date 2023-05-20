import { Injectable } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { StorageService } from './storage.service';

const todoListStorageKey = 'Todo_List';

const defaultTodoList: TodoItem[] = [
  { title: 'install NodeJS' },
  { title: 'install Angular CLI' },
  { title: 'create new app' },
  { title: 'serve app' },
  { title: 'develop app' },
  { title: 'deploy app' },
];

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  // private todoList: TodoItem[] = [
  //   { title: 'install NodeJS' },
  //   { title: 'install Angular CLI' },
  //   { title: 'create new app' },
  //   { title: 'serve app' },
  //   { title: 'develop app' },
  //   { title: 'deploy app' },
  // ];

  todoList: any[];
  isSelect = true;

  constructor(private storageService: StorageService) {
    this.todoList =
      storageService.getData(todoListStorageKey) || defaultTodoList;
  }

  saveList(): void {
    this.storageService.setData(todoListStorageKey, this.todoList);
  }

  addItem(item: any): void {
    this.todoList.push(item);
    // this.todoList = [...this.todoList,item];
    this.saveList();
  }

  updateItem(item: any, changes: any): void {
    const index = this.todoList.indexOf(item);
    this.todoList[index] = { ...item, ...changes };
    // item.complete = changes;
    // item.comp_time = time_complte;
    // this.todoList[index] = item;
    this.saveList();
  }

  checkAllTodo(): void {
    // const index = this.todoList.indexOf(item);
    // this.todoList[index] = { ...item, ...changes };
    // item.complete = changes;
    // item.comp_time = time_complte;
    // this.todoList[index] = item;

    for (let index in this.todoList) {
      var changes = {};
      if (this.isSelect) {
        changes = { fm_status_completed: this.isSelect, fm_time_completed: Date.now() };
        this.todoList[index] = { ...this.todoList[index], ...changes };
      } else {
        changes = { fm_status_completed: this.isSelect, fm_time_completed: null };
        this.todoList[index] = { ...this.todoList[index], ...changes };
      }
    }
    this.isSelect = !this.isSelect;
    this.saveList();
  }

  deleteItem(item: any): void {
    const index = this.todoList.indexOf(item);
    this.todoList.splice(index, 1);
    this.saveList();
  }

  removeAllTodo() {
    // console.log('removeAllTodo()');
    //console.log(this.todoList);
    //this.todoList.length = 0;
    //this.todoList = [];
    console.log(this.todoList);
    this.todoList.length = 0;
    console.log(this.todoList);
    this.saveList();
  }

  getTodoList(): TodoItem[] {
    return this.todoList;
  }

  getTitleList(): string[]{
    var lsStr:string[] = [];
    this.todoList.forEach(item => {
      lsStr.push(item.fm_title);
    });
    return lsStr;
  }
}
