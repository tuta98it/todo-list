import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { TodoListService } from '../services/todo-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list-detail-component',
  templateUrl: './todo-list-detail-component.component.html',
  styleUrls: ['./todo-list-detail-component.component.scss'],
})
export class TodoListDetailComponentComponent implements OnInit {
  todoList: any[];
  todoListService: TodoListService;
  // @Output() hide: EventEmitter<string> = new EventEmitter<string>();

  isShowDetail = true;

  // statusTable = false;

  constructor(
    private todoListService_t: TodoListService,
    private detailMore: ElementRef,
    private blockTableDetail: ElementRef,
    private router: Router
  ) {
    this.todoListService = todoListService_t;
    this.todoList = todoListService_t.getTodoList();
  }
  ngOnInit(): void {
    // this.detailMore.nativeElement.querySelector('ts_details_more').addEventListener('click',  ()=>{
    //   // this.blockTableDetail.nativeElement.querySelector('ts-block--table').add('show--table');
    //   console.log("ts-details-more click")
    // });
    ///
    /// Ẩn cái TodoList đi;
    // this.hideTodoList();
  }

  // hideTodoList() {
  //   this.hide.emit();
  // }

  setStatus(item: any): string {
    var status: string;
    status = '';
    console.log('item.fm_status_completed: ' +item.fm_status_completed);
    if (item.fm_status_completed) {
      status.concat('Complete!');
      var milliSecondDiff =
        new Date(item.fm_time_completed).getTime() -
        new Date(item.fm_time_deadline).getTime();
      if (milliSecondDiff < 0) {
        status = 'Completed ahead of schedule!';
      } else if (milliSecondDiff > 0) {
        status = 'Completed is slow!';
      } else {
        status = 'Completed on schedule!';
      }
    }else{
      status = "Procseting ..."
    }
    return status;
  }

  // Thiết lập thời gian hoàn thành một đầu việc
  // isCompleteTime(item: TodoItem) {
  //   return typeof item.comp_time == 'number';
  // }

  determineExecutionTime(item: any): string {
    var time = '---';
    if (item.fm_time_completed && item.fm_time_start) {
      var milliSecondDiff =
        new Date(item.fm_time_completed).getTime() -
        new Date(item.fm_time_start).getTime();
      // console.log('milliSecondDiff : ' + milliSecondDiff);

      var secondDiff = Math.floor(milliSecondDiff / 1000);
      var second = secondDiff % 60;
      var minutes = Math.floor(secondDiff / 60);
      var hour = Math.floor(minutes / 60);
      var minute = Math.floor(minutes % 60);
      time =
        hour.toString() + ':' + minute.toString() + ':' + second.toString();
    }
    return time;
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

  showDetailTodolist() {
    this.router.navigate(['']);
  }

  showDetailTodoItem(item: any) {
    const index = this.todoList.indexOf(item);
    this.router.navigate(['table-detail/' + index.toString()]);
  }
}
