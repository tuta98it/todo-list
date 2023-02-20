import { Component, Input, OnInit } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';

@Component({
  selector: 'app-todo-item',
  template: ` <p>{{ item }} </p> `,
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit{
  @Input()
  item!: TodoItem;



  constructor (){}

  ngOnInit() {

  }
}
