import { Component } from '@angular/core';
import { TodoItem } from './interfaces/todo-item';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `
    <h1 *ngIf="">Welcome to {{ title }}!</h1>
    <app-input-button-unit></app-input-button-unit>
    <app-input-button-unit></app-input-button-unit>
    <app-input-button-unit></app-input-button-unit>

    <ul>
      <li *ngFor="let todoItem of todoList">
        {{ todoItem.title }}
      </li>
    </ul>

    <ul>
      <li *ngFor="let todoItem of todoList">
        <app-todo-item [item] = "todoItem"></app-todo-item>
      </li>
    </ul>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo-list';
  todoList : TodoItem[] = [
    { title: 'install NodeJS' },
    { title: 'install Angular CLI' },
    { title: 'create new app' },
    { title: 'serve app' },
    { title: 'develop app' },
  ];
}
