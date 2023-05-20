import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { TodoListService } from '../services/todo-list.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { Observable, from, fromEvent, fromEventPattern, interval, of, timer, defer, merge } from 'rxjs';
import { filter, first, map, startWith, switchMap, take, tap, throttle, throttleTime, finalize, pairwise, endWith, delay, mapTo, withLatestFrom} from "rxjs/operators";
import { ApiService } from '../services/Validators/api.service';
@Component({
  selector: 'app-list-manager',
  templateUrl: './list-manager.component.html',
  styleUrls: ['./list-manager.component.scss'],
  providers: [MessageService],
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

  // Thành phần trang menu
  items: MenuItem[];
  //Ẩn hiện dialog remove all
  displayDialogRemove = false;
  constructor(
    private todoListServiceMain_t: TodoListService,
    // private todoListServiceDetail_t: TodoListService,
    private messageService: MessageService, // Quản lý thông báo
    private router: Router,
    fb: FormBuilder,
    private _api: ApiService
  ) {
    this.todoListServiceMain = todoListServiceMain_t;
    this.todoListMain = todoListServiceMain_t.getTodoList();

    //Form
    this.form = fb.group({
      fm_title: ['',
        Validators.compose(
          [
            Validators.required,
            // Validators.minLength(6),
            // Validators.pattern(/^[a-z]{6,32}$/i)
          ]
        ),
        this.validateTitleNameFromAPIDebounce.bind(this)
      ],


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

    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Select all',
            icon: 'pi pi-check',
            command: () => {
              this.selectAll();
              // this.update();
            }
          },
          {
            label: 'Delete All',
            icon: 'pi pi-trash',
            command: () => {
              this.showDialogRemove();
              // this.delete();
            }
          }
        ]
      },
    ];
    // this.todoListServiceDetail = todoListServiceDetail_t;
    // this.todoListDetail = todoListServiceDetail_t.getTodoList();
  }

  ngOnInit(): void {

    // this.hideTodoList();
    // this.msgs = [
    //   { severity: 'success',
    //     summary: 'GeeksforGeeks',
    //     detail: "This is a message"
    //   },
    //   { severity: 'info',
    //     summary: 'GeeksforGeeks',
    //     detail: "This is a message"
    //   },
    //   { severity: 'warn',
    //     summary: 'GeeksforGeeks',
    //     detail: "This is a message"
    //   },
    //   { severity: 'error',
    //     summary: 'GeeksforGeeks',
    //     detail: "This is a message"
    //   }
    // ];

    // const rate = 1000;
    // let lastMove = Date.now() - rate;
    // document.addEventListener('mousemove', ev => {
    //   if(Date.now() - lastMove > rate){
    //     console.log(ev);
    //     lastMove = Date.now();
    //   }
    // })

    // fromEvent(document, 'mousemove').pipe(
    //   throttleTime(1000),
    //   // map((ev: MouseEvent) => ev.clientX + ' ' + ev.clientY),
    // ).subscribe(console.log);

    // const observable = new Observable(function subscribe(observer){
    //   const id = setInterval(() => {
    //     observer.next('Hello RxJS');
    //     // observer.error('Không có lỗi')
    //     observer.complete();
    //   }, 1000);

    //   return function unsubscribe() {
    //     clearInterval(id);
    //   }
    // });

    // const subscription = observable.subscribe(val => console.log(val), err => console.error(err), () => console.log('complete!'));


    // setTimeout(() => {
    //   subscription.unsubscribe();
    //   // console.log('complete!');
    // }, 10000)
    // // observable.subscribe(val => console.log(val), null, null);


    const observer = {
      next: (val: any) => console.log(val),
      error: (err: any) => console.log(err),
      comple: () => console.log('complete'),
    };

    // of('hello tu').subscribe(observer);
    // of('hello tu').subscribe(observer);

    // of(1, 2, 4, [1,2,3], {"Ho vag ten:" : "Tran Anh Tu"}).subscribe(observer);
    // from(Promise.resolve('trananhtu tutran98it tutait98')).subscribe(observer);

    // const map =  new Map();
    // map.set(1, 'Hello');
    // map.set(2, 'Tu');

    // output: [1, 'hello'], [2, 'bye']
    // complete: 'complete'
    // from(map).subscribe(observer);

    // from
    // form([1, 2, 3]).subscribe(observer)
    // fromEvent(document, 'click').subscribe(observer);

    // fromEventPattern(
    //   (handler) => {
    //     document.addEventListener('click', handler);
    //   },// addHandler

    //   (handler) => {
    //     document.removeEventListener('click', handler);
    //   } // removeHandler
    // ).subscribe(observer)

    // interval(1000).subscribe(observer); //setInterval

    // timer(1000).subscribe(observer); //setTimer

    // timer(1000, 1000).subscribe(observer)

    // const random$ = defer(() => of(Math.random()));

    // random$.subscribe(observer);
    // random$.subscribe(observer);
    // random$.subscribe(observer);


    // from([1, 2, 3, 4, 5, 6])
    // .pipe(
    //   filter((x) => x % 2 === 0) // số chẵn
    // ).subscribe(console.log); // output: 2, 4, 6

  // from([1, 2, 3, 4, 5, 6])
  // .pipe(
  //   first((x) => x > 6)
  // ) // with default value
  // .subscribe(console.log, null, () => console.log('complete'));

  // from([1, 2, 3, 4, 5])
  // .pipe(
  //   pairwise(),
  //   map((prev:any, cur:any) => prev[0] + prev[1])
  // )
  // .subscribe(observer);

  // of('hi', 'how are you?', 'sorry, i have to go now').pipe(endWith('goodbye!')).subscribe(observer)

    // merge(of(4, 5, 6).pipe(delay(1000)), of(1, 2, 3)).subscribe(observer);

    // merge(
    //   interval(2000).pipe(mapTo('emit every 2 seconds'), take(3)),
    //   interval(1000).pipe(mapTo('emit every 1 second'), take(3))
    // ).subscribe(observer)

    fromEvent(document, 'click').pipe(withLatestFrom(interval(1000))).subscribe(observer);
  }


  alidateTitleNameFromAPI(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return this._api.validateTitlename(control.value).pipe(
      map(isValid => {
        if (isValid) {
          return null;
        }
        return {
          titlenameDuplicated: true
        };
      })
    );
  }

  validateTitleNameFromAPIDebounce(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return timer(300).pipe(
      switchMap(() =>
        this._api.validateTitlename(control.value).pipe(
          map(isValid => {
            if (isValid) {
              return null;
            }
            return {
              titlenameDuplicated: true
            };
          })
        )
      )
    );
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
    this.messageService.add({
      severity: 'success',
      summary: 'Service Message',
      detail:
        'You have saved todo item "' +
        this.form.value.fm_title +
        '" successfully!',
    });
    // this.todoListServiceDetail.updateItem(item, changes);
  }

  // Hiện thông bá0
  showNotification(content: any, option: string) {
    if (option == 'add') {
      this.messageService.add(content);
    } else if (option == 'clean') {
      this.messageService.clear();
    }
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
    this.messageService.add({
      severity: 'warn',
      summary: 'Warning',
      detail:
        'You had delete all todo items'
    });
  }

  showDialogRemove() {
    this.displayDialogRemove = true;
  }

  cancelRemove() {
    this.displayDialogRemove = false;
  }

  agreeRemove() {
    this.removeAll();
    this.displayDialogRemove = false;
  }
  // //Hiện thị ra thời điểm tạo(dd/MM/YYYY), trạng thái (Hoàn thành, đang thực hiện), thời điểm hoàn thành(dd/MM/YYYY).
  showDetailTodolist() {
    this.router.navigate(['table-detail']);

    //1. Chạy tính năng ẩn TodoList
    // this.hideTodoList();
  }



}
