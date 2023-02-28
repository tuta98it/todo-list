import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoListService } from '../services/todo-list.service';
import { TodoItem } from '../interfaces/todo-item';

@Component({
  selector: 'app-detail-todo-item',
  template: `
    <div class="block-detail-todo-item">
      <h2>Infomation detail todo:</h2>
      <ul>
        <li class="text-item"><b>Work to do:</b> {{ item.title }}</li>

        <li class="text-item">
          <b>Status:</b> {{ setStatus(item.completed) }}
        </li>

        <li class="text-item">
          <b>Creation time: </b>{{ item.cre_time | date : 'medium' }}
        </li>

        <li class="text-item">
          <b>Component time:</b>
          {{
            isCompleteTime(item) ? (item.comp_time | date : 'medium') : '---'
          }}
        </li>

        <li class="text-item">
          <b>Implementation time:</b>
          {{ isCompleteTime(item) ? determineExecutionTime(item) : '---' }}
        </li>
      </ul>
      <!-- <a class="back--button" (click)="showDetailTodolist()"> << Back </a> -->


      <div
        class="flex align-item-center justify-content-start flex-direction-row text-sm font-italic back--button "
      >
        <i
          class="flex justify-content-center align-items-center pi pi-angle-double-left" style=" font-weight: 00"
        ></i>
        <a routerLink="" class="p-1 font-semibold no-underline" style="color: #3399FF;">
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
  todoList: TodoItem[];
  todoListService: TodoListService;
  item!: TodoItem;
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
