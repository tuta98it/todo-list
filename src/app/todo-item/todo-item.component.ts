import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
// import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-todo-item',
  template: `
    <div class="todo-item">
      <div class="wrap-check-text-edit-save-remove">
        <div class="wrap-check-text-edit-save">
          <div class="check-text" [ngClass]="{ 'bg-done': item.completed }">
            <!-- Check text -->
            <!-- item.completed? true : false -->

            <p-checkbox
              name="groupname"
              value="val1"
              [binary]="
                !(item.completed != null
                  ? item.completed == true
                    ? true
                    : false
                  : false)
              "
              [(ngModel)]="selectedValues"
              (onChange)="completeItem()"
              inputId="binary"
            ></p-checkbox>

            <!-- <label
              class="ml-2"
              [ngClass]="{
                'todo-complete': item.completed
              }"
              for=""
              (keyup.Enter)="saveItem()"
              [contentEditable]="isExpression"
              >{{ item.title }}</label> -->

            <!-- [ngClass]="{ 'todo-complete' : item.completed, }" -->
            <!-- <input
              type="checkbox"
              class="todo-checkbox"
              (click)="completeItem()"
              [checked]="item.completed"
            /> -->

            <!-- title doing -->
            <input
              [disabled]="isExpression"
              class="todo-title ml-1"
              type="text"
              [ngClass]="{
                'todo-complete' : item.completed,
                'bg-done': item.completed,
                'bg-edit': !isEdit
              }"
              [(ngModel)]="item.title"
              (keyup.Enter)="saveItem()"

            />
          </div>

          <div class="edit-save-button">
            <!-- Edit and Save button -->

            <!-- <div *ngIf="isExpression" class="w-6 md:w-2 flex justify-content-end">
                <button pButton pRipple label="Edit" icon="pi pi-pencil" class="p-button-text"></button>
            </div> -->

            <button *ngIf="isExpression" class="btn" (click)="editItem()">
              <div class="flex flex-direction-row align-items-center">
                <i class="pi pi-pencil mr-2 text-xs"></i>
                <span>Edit</span>
              </div>
            </button>

            <!-- <p-button label="Small" icon="pi pi-check" styleClass="p-button-sm p-button-secondary"></p-button> -->

            <button *ngIf="!isExpression" class="btn ml-2" (click)="saveItem()">
              <div class="flex flex-direction-row align-items-center">
                <i class="pi pi-check mr-1 text-xs"></i>
                <span>Save</span>
              </div>
            </button>

            <!-- <p-button label="Small" icon="pi pi-check" styleClass="p-button-sm"></p-button> -->
          </div>
        </div>
        <!-- Remove button -->
        <button class="btn btn-red" (click)="removeItem()">
          <div class="flex flex-direction-row align-items-center">
            <i class="pi pi-trash mr-1 text-xs"></i>
            <span>Remove</span>
          </div>
        </button>
        <!-- <button class="btn btn-red" (click)="removeItem()">Remove</button> -->
      </div>
      <div class="flex align-items-center mt-1 ml-2 text-xs">
        <i class="pi pi-clock mr-2"></i>
        <span><b>Time to start:</b> {{ item.cre_time | date : 'medium' }}</span>
      </div>
    </div>
  `,
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input()
  item!: TodoItem;
  isExpression = true;
  isEdit = true;
  b = true;
  selectedValues: string[] = ['val1', 'val2'];

  @Output() remove: EventEmitter<TodoItem> = new EventEmitter<TodoItem>();
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}
  removeItem(): void {
    this.remove.emit(this.item);
  }

  editItem() {
    this.isExpression = !this.isExpression;
    this.isEdit = !this.isEdit;
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
    } else {
      this.update.emit({
        item: this.item,
        changes: { completed: !this.item.completed, comp_time: null },
      });
    }
  }
}
