import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { TodoListService } from '../services/todo-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-manager',
  template: `
    <div class="todo-app">
      <app-input-button-unit (submit)="addItem($event)"></app-input-button-unit>

      <ul>
        <li *ngFor="let todoItem of todoList">
          <app-todo-item
            [item]="todoItem"
            (remove)="removeItem($event)"
            (update)="updateItem($event.item, $event.changes)"
          ></app-todo-item>
        </li>
      </ul>

      <!-- Detail -->

      <div class="block-detail">
        <a class="details-more" (click)="showDetailTodolist()">
          Details more >>
        </a>
      </div>
      <!--  -->
    </div>
  `,
  styleUrls: ['./list-manager.component.scss'],
})
export class ListManagerComponent implements OnInit {
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

  todoList: TodoItem[];
  todoListService: TodoListService;
  // router: any;

  constructor(
    private todoListService_t: TodoListService,
    private router: Router
  ) {
    this.todoListService = todoListService_t;
    this.todoList = todoListService_t.getTodoList();
  }

  ngOnInit(): void {}

  addItem(title: string): void {
    this.todoListService.addItem({
      title: title,
      completed: false,
      cre_time: this.currentDate(),
      comp_time: 'unspecified time',
    });
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
    this.todoListService.deleteItem(item);
  }

  updateItem(item: any, changes: any): void {
    this.todoListService.updateItem(item, changes);
  }

  // //Hiện thị ra thời điểm tạo(dd/MM/YYYY), trạng thái (Hoàn thành, đang thực hiện), thời điểm hoàn thành(dd/MM/YYYY).
  showDetailTodolist() {
    this.router.navigate(['detail']);
  }
}
