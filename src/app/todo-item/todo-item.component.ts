import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';

@Component({
  selector: 'app-todo-item',
  template: `
    <div class="todo-item">
      <!-- warp button -->
      <div>
        <!-- Input text -->
        <input
          type="checkbox"
          class="todo-checkbox"
          (click)="completeItem()"
          [checked]="item.completed"
        />

        <!-- title doing -->
        <span
          class="todo-title"
          [ngClass]="{ 'todo-complete': item.completed }"
        >
          {{ item.title }}
        </span>
       </div>

       <!-- Remove button -->
      <button class="btn btn-red" (click)="removeItem()">Remove to-do</button>
    </div>
  `,
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input()
  item!: TodoItem;

  @Output() remove: EventEmitter<TodoItem> = new EventEmitter<TodoItem>();
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}
  removeItem(): void {
    this.remove.emit(this.item);
  }
  completeItem(): void {
    this.update.emit({
      item: this.item,
      changes: { completed: !this.item.completed },
    });
  }
}
