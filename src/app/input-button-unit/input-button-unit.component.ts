import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';

@Component({
  selector: 'app-input-button-unit',
  template: `
    <!-- <p>input-button-unit works!</p> -->

    <div class="todo_setup--input">
      <form action="">
        <div class="todo-setup-content">
          <div class="todo_setup-content--title">
            <span class="p-float-label">
              <input
                id="float-input"
                type="text"
                pInputText
                [(ngModel)]="title"
              />
              <label for="float-input">Username</label>
            </span>
          </div>

          <div class="todo_setup-content--description">
            <textarea rows="5" cols="30" pInputTextarea></textarea>
          </div>
        </div>

        <div class="todo_setup-time">
          <div class="todo_setup-time--start">
            <div class="field col-12 md:col-4">
              <label for="time">Todo start</label>
              <p-calendar
                [(ngModel)]="item.start_time"
                [showTime]="true"
                [showSeconds]="true"
                [showIcon]="true"
                inputId="start"
              ></p-calendar>
            </div>
          </div>

          <div class="todo_setup-time--deadline">
            <div class="field col-12 md:col-4">
              <label for="time">Todo deadline</label>
              <p-calendar
                [(ngModel)]="item.deadline_time"
                [showTime]="true"
                [showSeconds]="true"
                [showIcon]="true"
                inputId="deadline"
              ></p-calendar>
            </div>
          </div>
        </div>

        <div class="todo_setup-priority">
          <h5>Basic</h5>
          <p-dropdown
            [options]="listPriority"
            [(ngModel)]="item.priority"
            placeholder="Select the priority of the todo"
            optionLabel="priority"
            [showClear]="true"
          ></p-dropdown>
        </div>

        <div class="todo_setup-btn--submit">
          <p-button
            label="Submit"
            icon="pi pi-check"
            iconPos="right"
            class=""
            (click)="submitValue()"
          ></p-button>
        </div>
      </form>
    </div>
    <!-- <span class="p-float-label">
      <input
        id="float-input"
        class=""
        style="width: 200%"
        #inputElementRef
        type="text"
        [(ngModel)]="title"
        (keyup.enter)="submitValueKeyEnter($event)"
        pInputText
      />
      <label for="float-input" class="text-sm">Title</label>
    </span> -->

    <!-- <input
      class="todo-input"
      #inputElementRef
      type="text"
      [value]="title"
      (keyup.enter)="submitValueKeyEnter($event)"
    /> -->

    <!-- Button save -->
    <!-- <button class="btn" (click)="submitValue(inputElementRef.value)">
      Set up to-do
    </button> -->

    <!-- <button class="btn" (click)="submitValue(inputElementRef.value)">
      <div class="flex flex-direction-row align-items-center">
        <span>Set up to-do </span>
        <i class="pi pi-plus ml-1 text-xs"></i>
      </div>
    </button> -->

    <!-- <button (click)="changeTitle_ext(inputElementRef)">Save</button> -->
    <!-- <button>Save</button> -->
    <!-- (keyup.enter)="submitValue($event.target.value)" -->
  `,
  styleUrls: ['./input-button-unit.component.scss'],
})
export class InputButtonUnitComponent implements OnInit {
  title: string;
  item: TodoItem;
  listPriority: string[];
  @Output() submit: EventEmitter<TodoItem> = new EventEmitter<TodoItem>();

  constructor() {
    this.title = '';
    this.item = {
      title: '',
      description: '',
      completed: false,
      cre_time: undefined,
      start_time: undefined,
      deadline_time: undefined,
      comp_time: undefined,
      priority: undefined,
    };
    this.listPriority = ['P1', 'P2', 'P3', 'P4'];
  }

  ngOnInit(): void {}

  submitValue() {
    if (!this.isEmpty(this.title)) {
      this.item.title = this.title;
      this.submit.emit(this.item);
      this.title = '';
      // console.log('inputElementRef.value = ' + inputElementRef.value)
    }
  }

  // submitValueKeyEnter(e: Event) {
  //   var target = e.target as HTMLInputElement;
  //   if (!this.isEmpty(target.value)) {
  //     this.item.title = this.title;
  //     this.submit.emit(this.item);
  //     this.title = '';
  //   }
  // }

  isEmpty(str: string) {
    return !str || str.length === 0;
  }

  generateTitle(): string {
    return 'This title was generated by a method.';
  }
}
