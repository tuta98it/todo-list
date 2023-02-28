import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { TodoListService } from '../services/todo-list.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-manager',
  template: `
    <div *ngIf="isShowTodoList" class="todo-app">
      <app-input-button-unit (submit)="addItem($event)"></app-input-button-unit>

      <div class="block-button-all">
        <button class="btn" (click)="selectAll()">Select All</button>

        <button class="btn btn-red" (click)="removeAll()">Remove All</button>
      </div>

      <ul>
        <li *ngFor="let todoItem of todoListMain">
          <app-todo-item
            [item]="todoItem"
            (remove)="removeItem($event)"
            (update)="updateItem($event.item, $event.changes)"
          ></app-todo-item>
        </li>
      </ul>

      <!-- Detail -->

      <div class="block-detail">
        <!-- <a class="details-more--button" (click)="showDetailTodolist()">
          Details more >>
        </a> -->

        <div class="flex align-item-center justify-content-end flex-direction-row text-sm font-italic details-more--button">
          <a routerLink="table-detail" class="p-1 font-semibold no-underline"  style="color: #3399FF; ">
            Details more
          </a>
          <i
            class="flex justify-content-center align-items-center pi pi-angle-double-right"
          ></i>
        </div>
      </div>
      <!--  -->

      <router-outlet></router-outlet>
    </div>

    <!-- <app-todo-list-detail-component  (hide)="hideTodoList()"></app-todo-list-detail-component> -->
  `,
  styleUrls: ['./list-manager.component.scss'],
})
export class ListManagerComponent implements OnInit {
  isShowTodoList = true;

  // todoList: TodoItem[] = [
  //   { title: 'install NodeJS' },
  //   { title: 'install Angular CLI' },
  //   { title: 'create new app' },
  //   { title: 'serve app' },
  //   { title: 'develop app' },
  //   { title: 'deploy app' },
  // ];

  // constructor(todoListService: TodoListService) {
  //   todoListService.getTodoList();
  // }

  todoListMain: TodoItem[];
  todoListServiceMain: TodoListService;

  todoListDetail: TodoItem[];
  todoListServiceDetail: TodoListService;

  // router: any;

  constructor(
    private todoListServiceMain_t: TodoListService,
    private todoListServiceDetail_t: TodoListService,
    private router: Router
  ) {
    this.todoListServiceMain = todoListServiceMain_t;
    this.todoListMain = todoListServiceMain_t.getTodoList();

    this.todoListServiceDetail = todoListServiceDetail_t;
    this.todoListDetail = todoListServiceDetail_t.getTodoList();
  }

  ngOnInit(): void {
    // this.hideTodoList();
  }

  hideTodoList() {
    this.isShowTodoList = false;
  }

  addItem(title: string): void {
    this.todoListServiceMain.addItem({
      title: title,
      completed: false,
      cre_time: Date.now(),
    });

    // this.todoListServiceDetail.addItem({
    //   title: title,
    //   completed: false,
    //   cre_time: this.currentDate(),
    //   comp_time: 'unspecified time',
    // });
  }

  currentDate(): string {
    var currentdate = new Date();
    var datetime =
      currentdate.getDate() +
      '/' +
      (currentdate.getMonth() + 1) +
      '/' +
      currentdate.getFullYear() +
      ' @ ' +
      currentdate.getHours() +
      ':' +
      currentdate.getMinutes() +
      ':' +
      currentdate.getSeconds();

    return datetime;
  }

  removeItem(item: any): void {
    this.todoListServiceMain.deleteItem(item);
  }

  updateItem(item: any, changes: any): void {
    this.todoListServiceMain.updateItem(item, changes);
    // this.todoListServiceDetail.updateItem(item, changes);
  }

  selectAll() {
    // this.todoListServiceMain.addItem({
    //   title: title,
    //   completed: false,
    //   cre_time: Date.now(),
    // });

    this.todoListServiceMain.checkAllTodo();
  }

  removeAll() {
    this.todoListServiceMain.removeAllTodo();
  }

  // //Hiện thị ra thời điểm tạo(dd/MM/YYYY), trạng thái (Hoàn thành, đang thực hiện), thời điểm hoàn thành(dd/MM/YYYY).
  showDetailTodolist() {
    this.router.navigate(['table-detail']);

    //1. Chạy tính năng ẩn TodoList
    // this.hideTodoList();
  }
}
