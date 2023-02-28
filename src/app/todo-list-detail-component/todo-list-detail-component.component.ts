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
  template: `
    <div class="block-detail">
      <!-- <a class="details-more js-details-more" (click)="showDetailTodolist()">
        Details more >>
      </a> -->
      <div *ngIf="isShowDetail" class="block--table">
        <table class="table_todolist--detail">
          <tr class="tr-header_todolist--detail alpha-1">
            <th class="th_todolist--detail">
              <div class="flex align-items-center justify-content-center">
                <i class="pi pi-list mr-2"></i>
                <span> Work to do </span>
              </div>
            </th>
            <th class="th_todolist--detail">
              <div class="flex align-items-center justify-content-center">
                <i class="pi pi-verified mr-2"></i>
                <span> Status </span>
              </div>
            </th>
            <th class="th_todolist--detail">
              <div class="flex align-items-center justify-content-center">
                <i class="pi pi-clock mr-2"></i>
                <span> Creation time </span>
              </div>
            </th>

            <th class="th_todolist--detail">
              <div class="flex align-items-center justify-content-center">
                <i class="pi pi-stopwatch mr-2"></i>
                <span> Complete time </span>
              </div>
            </th>
            <th class="th_todolist--detail">
              <div class="flex align-items-center justify-content-center">
                <i class="pi pi-hourglass mr-2"></i>
                <span> Implementation time </span>
              </div>
            </th>
          </tr>

          <tr
            class="tr_todolist--detail"
            *ngFor="let todoItem of todoList"
            (click)="showDetailTodoItem(todoItem)"
          >
            <td class="td_todolist--detail">{{ todoItem.title }}</td>

            <td class="td_todolist--detail">
              <div
                class="border-status"
                [ngClass]="{
                  'status-complete': todoItem.completed,
                  'status-proses': !todoItem.completed
                }"
              >
                {{ setStatus(todoItem.completed) }}
              </div>
            </td>

            <td class="td_todolist--detail">
              {{ todoItem.cre_time | date : 'medium' }}
            </td>

            <td class="td_todolist--detail">
              {{
                isCompleteTime(todoItem)
                  ? (todoItem.comp_time | date : 'medium')
                  : '---'
              }}
            </td>

            <td class="td_todolist--detail">
              {{
                isCompleteTime(todoItem)
                  ? determineExecutionTime(todoItem)
                  : '---'
              }}
            </td>
          </tr>
        </table>


        <div
          class="flex align-item-center justify-content-start flex-direction-row text-sm font-italic back--button "
        >
          <i
            class="flex justify-content-center align-items-center pi pi-angle-double-left"
          ></i>
          <a routerLink="" class="p-1 font-semibold no-underline" style="color: #3399FF;"> Back </a>
        </div>


      </div>
    </div>

    <!-- <script>
      const blockTableDetail = document.querySelector('.js-block--table');
      const detailMore = document.querySelector('js-details-more');
      // console.log("detail:" + detailMore);


      function hideTableDetail() {
        blockTableDetail.classList.remove('show--table');
      }

      function showTableDetail() {
        // alert("show")
        blockTableDetail.classList.add('show--table');
      }

      detailMore.addEventListener('click', showTableDetail);
    </script> -->
  `,
  styleUrls: ['./todo-list-detail-component.component.scss'],
})
export class TodoListDetailComponentComponent implements OnInit {
  todoList: TodoItem[];
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

  setStatus(status?: boolean): string {
    return status ? 'Complete!' : 'Processing...';
  }

  // Thiết lập thời gian hoàn thành một đầu việc
  isCompleteTime(item: TodoItem) {
    return typeof item.comp_time == 'number';
  }

  determineExecutionTime(item: TodoItem): string {
    var milliSecondDiff =
      (item.comp_time == null ? 0 : parseInt(item.comp_time + '')) -
      (item.cre_time == null ? 0 : parseInt(item.cre_time + ''));
    var secondDiff = Math.floor(milliSecondDiff / 1000);
    var second = secondDiff % 60;
    var minutes = Math.floor(secondDiff / 60);
    var hour = Math.floor(minutes / 60);
    var minute = Math.floor(minutes % 60);

    return hour.toString() + ':' + minute.toString() + ':' + minute.toString();
    // var timeStart = new Date('01/01/2007 ' + item.cre_time).getHours();
    // var timeEnd = new Date('01/01/2007 ' + item.comp_time).getHours();

    // var hourDiff = timeEnd - timeStart;
    // return hourDiff;
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

  showDetailTodoItem(item: TodoItem) {
    const index = this.todoList.indexOf(item);
    this.router.navigate(['table-detail/' + index.toString()]);
  }
}
