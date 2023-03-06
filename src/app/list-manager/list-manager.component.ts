import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { TodoListService } from '../services/todo-list.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-list-manager',
  templateUrl: './list-manager.component.html',
  styleUrls: ['./list-manager.component.scss'],
})
export class ListManagerComponent implements OnInit {
  isShowTodoList = true;
  isEdit = true;

  isExpression = true;
  // Form
  public form: FormGroup;
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

  // Biến quản lý dữ liệu từ local store
  todoListMain: TodoItem[];
  todoListServiceMain: TodoListService;


  manager_item: any;
  // todoListDetail: TodoItem[];
  // todoListServiceDetail: TodoListService;



  constructor(
    private todoListServiceMain_t: TodoListService,
    // private todoListServiceDetail_t: TodoListService,
    private router: Router,
    fb: FormBuilder
  ) {
    this.todoListServiceMain = todoListServiceMain_t;
    this.todoListMain = todoListServiceMain_t.getTodoList();

    //Form
    this.form = fb.group({
      fm_title: [null, Validators.required],
      fm_status_completed: [false, Validators.required],
      fm_description: [null, Validators.required],
      fm_time_creation: [null, Validators.required],
      fm_time_start: [null, Validators.required],
      fm_time_deadline: [null, Validators.required],
      fm_time_completed: [null, Validators.required],
      fm_priority: [null, Validators.required],
      fm_btn_reset: [null, Validators.required],
      fm_btn_submit: [true, Validators.required],
    });
    // this.todoListServiceDetail = todoListServiceDetail_t;
    // this.todoListDetail = todoListServiceDetail_t.getTodoList();
  }

  ngOnInit(): void {
    // this.hideTodoList();
  }

  hideTodoList() {
    this.isShowTodoList = false;
  }

  addItem(item: any): void {
    this.todoListServiceMain.addItem(item);

    // addItem(item: TodoItem): void {
    //   this.todoListServiceMain.addItem({
    //     title: item.title,
    //     description: item.description,
    //     completed: item.completed,
    //     cre_time: new Date(),
    //     start_time: item.start_time,
    //     deadline_time: item.deadline_time,
    //     comp_time: item.comp_time,
    //     priority: item.priority
    //   });

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
