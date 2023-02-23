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
          <tr class="tr_todolist--detail alpha-1">
            <th class="th_todolist--detail">Work to do</th>
            <th class="th_todolist--detail">Status</th>
            <th class="th_todolist--detail">Creation time</th>
            <th class="th_todolist--detail">Component time</th>
            <th class="th_todolist--detail">Implementation time</th>
          </tr>

          <tr class="tr_todolist--detail" *ngFor="let todoItem of todoList">
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
                  ? (determineExecutionTime(todoItem))
                  : '---'
              }}
            </td>
          </tr>

          <a class="back--button" (click)="showDetailTodolist()"> << Back </a>
        </table>
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
  @Output() hide: EventEmitter<string> = new EventEmitter<string>();

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
    this.hideTodoList();
  }

  hideTodoList() {
    this.hide.emit();
  }

  setStatus(status?: boolean): string {
    return status ? 'Complete!' : 'Processing...';
  }

  // Thiết lập thời gian hoàn thành một đầu việc
  isCompleteTime(item: TodoItem) {
    return typeof item.comp_time == 'number';
  }

  determineExecutionTime(item: TodoItem): string {
    var milliSecondDiff = (item.comp_time==null?0:parseInt(item.comp_time+'')) - (item.cre_time==null?0:parseInt(item.cre_time+''));
    var secondDiff = Math.floor(milliSecondDiff / 1000) ;
    var second = secondDiff % 60;
    var minutes = Math.floor(secondDiff / 60);
    var hour = Math.floor(minutes / 60);
    var minute = Math.floor(minutes % 60);


    return hour.toString()  + ":" + minute.toString() + ":" + minute.toString();
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

  // @ViewChild('ts-details-more') detailMore : any;

  // function hideTableDetail() {
  //   blockTableDetail.classList.remove('show--table');
  // }

  // function showTableDetail() {
  //   // alert("show")
  //   blockTableDetail.classList.add('show--table');
  // }

  // //Hiện thị ra thời điểm tạo(dd/MM/YYYY), trạng thái (Hoàn thành, đang thực hiện), thời điểm hoàn thành(dd/MM/YYYY).
  showDetailTodolist() {
    // Kỳ vọng thuộc tính display của table thành nome
    // block--table
    // [ngClass]="{ 'todo-complete': item.completed }"

    // this.detailMore.addEventListener( )
    // console.log('showDetailTodolist');

    // this.isShowDetail = !this.isShowDetail;

    this.router.navigate(['']);
  }
}
