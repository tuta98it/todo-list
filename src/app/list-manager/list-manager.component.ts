import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { TodoListService } from '../services/todo-list.service';

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
            (update)="updateItem($event.item, $event.changes)"></app-todo-item>
        </li>
      </ul>
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

  constructor(private todoListService_t: TodoListService) {
    this.todoListService = todoListService_t;
    this.todoList = todoListService_t.getTodoList();
  }

  ngOnInit(): void {}

  addItem(title: string): void {
    this.todoListService.addItem({ title });
  }

  removeItem(item: any): void {
    this.todoListService.deleteItem(item);
  }

  updateItem(item : any, changes : any): void {
    this.todoListService.updateItem(item, changes);
  }
}
