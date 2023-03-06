import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoListService } from '../services/todo-list.service';

@Component({
  selector: 'app-detail-todo-item',
  template: `
    <div class="block-detail-todo-item">
      <h2>Infomation detail todo:</h2>
      <ul>
        <li class="text-item"><b>Work to do:</b> {{ item.fm_title }}</li>

        <li class="text-item">
          <b>Status:</b> {{ setStatus(item.fm_status_completed) }}
        </li>

        <!-- Creation time -->
        <li class="text-item">
          <b>Creation time: </b>{{ item.fm_time_creation? (item.fm_time_creation | date : 'medium') : '---' }}
        </li>

        <!-- Start time -->
        <li class="text-item">
          <b>Start time: </b>{{item.fm_time_start? (item.fm_time_start | date : 'medium') : '---' }}
        </li>

        <!-- Component time: -->
        <li class="text-item">
          <b>Component time:</b>
          {{
            item.fm_time_completed
              ? (item.fm_time_completed | date : 'medium')
              : '---'
          }}
        </li>

        <!--  Implementation time -->
        <li class="text-item">
          <b>Implementation time:</b>
          {{ item.fm_time_completed ? determineExecutionTime(item) : '---' }}
        </li>
      </ul>
      <!-- <a class="back--button" (click)="showDetailTodolist()"> << Back </a> -->

      <div
        class="flex align-item-center justify-content-start flex-direction-row text-sm font-italic back--button "
      >
        <i
          class="flex justify-content-center align-items-center pi pi-angle-double-left"
          style=" font-weight: 00"
        ></i>
        <a
          routerLink=""
          class="p-1 font-semibold no-underline"
          style="color: #3399FF;"
        >
          Back
        </a>
      </div>
    </div>
  `,
  styleUrls: ['./detail-todo-item.component.scss'],
})
export class DetailTodoItemComponent implements OnInit {
  private sub: any;
  id!: number;
  todoList: any[];
  todoListService: TodoListService;
  item!: any;
  constructor(
    private route: ActivatedRoute,
    private todoListService_t: TodoListService,
    private router: Router
  ) {
    this.todoListService = todoListService_t;
    this.todoList = todoListService_t.getTodoList();
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });

    this.item = this.todoList[this.id];
  }

  setStatus(status?: boolean): string {
    return status ? 'Complete!' : 'Processing...';
  }

  determineExecutionTime(item: any): string {
    // var milliSecondDiff =
    //   (item.fm_time_completed == null ? 0 : parseInt(item.comp_time)) -
    //   (item.fm_time_start == null ? 0 : parseInt(item.cre_time));
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
    this.router.navigate(['table-detail']);
  }
}
