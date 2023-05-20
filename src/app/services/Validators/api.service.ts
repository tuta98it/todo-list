import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { TodoListService } from '../todo-list.service';

@Injectable({providedIn:'root'})
export class ApiService {
  todoList: any[];
  todoListService: TodoListService;
  titleList: string[];
  constructor(private todoListServiceT: TodoListService,) {

    this.todoListService = todoListServiceT;
    this.todoList = todoListServiceT.getTodoList();
    this.titleList = todoListServiceT.getTitleList();
  }

  validateTitlename(newTitle: string): Observable<boolean> {
    console.log(`Trigger API call ${newTitle}`);
    this.updateListTitle();
    let existedTitles = this.titleList;
    // console.log('existedTitles : ', existedTitles);
    let isValid = existedTitles.every((title) => title !== newTitle);
    return of(isValid).pipe(delay(500));
  }

  updateListTitle(){
    this.titleList = this.todoListServiceT.getTitleList();
  }
}
