import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
// import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-todo-item',
  template: `
    <div class="todo-item">
      <div class="wrap-check-text-edit-save">
        <div class="check-text">

          <!-- Check text -->
          <input
            type="checkbox"
            class="todo-checkbox"
            (click)="completeItem()"
            [checked]="item.completed"
          />

          <!-- title doing -->
          <input
            [disabled]="isExpression"
            class="todo-title"
            nz-input
            type="text"
            [ngClass]="{ 'todo-complete': item.completed }"
            [(ngModel)]="item.title"
          />
        </div>

        <div class="edit-save-button">
          <!-- Edit and Save button -->
          <button *ngIf="isExpression" class="btn " (click)="editItem()">
            Edit
          </button>
          <button *ngIf="!isExpression" class="btn " (click)="saveItem()">
            Save
          </button>
        </div>
      </div>

      <!-- Remove button -->
      <button class="btn btn-red" (click)="removeItem()">Remove</button>
    </div>
  `,
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input()
  item!: TodoItem;
  isExpression = true;

  @Output() remove: EventEmitter<TodoItem> = new EventEmitter<TodoItem>();
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}
  removeItem(): void {
    this.remove.emit(this.item);
  }

  editItem() {
    this.isExpression = !this.isExpression;
  }

  saveItem() {
    this.isExpression = !this.isExpression;
    this.update.emit({
      item: this.item,
    });
  }

  completeItem(): void {
    console.log('this.item.completed) == ' + this.item.completed);
    if (!this.item.completed) {
      this.update.emit({
        item: this.item,
        changes: { completed: !this.item.completed, comp_time: Date.now() },
      });
    }else{
      this.update.emit({
        item: this.item,
        changes: { completed: !this.item.completed, comp_time: null },
      });
    }
    ;
  }
}
