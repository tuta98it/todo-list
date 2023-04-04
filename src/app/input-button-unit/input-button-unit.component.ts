import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Priority } from '../interfaces/priority';
import { TodoItemComponent } from '../todo-item/todo-item.component';

import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';
import { TitleService } from '../services/title.service';
@Component({
  selector: 'app-input-button-unit',
  templateUrl: './input-button-unit.component.html',
  styleUrls: ['./input-button-unit.component.scss'],
  providers: [MessageService],
})
export class InputButtonUnitComponent implements OnInit {
  title: string;
  // msgs?: MessageService[];
  @Input() input_item: any;

  titles: any[] = [];
  selectedTitle: any[] = [];
  filteredTitles: any[] = [];




  listPriority: Priority[];

  // isExpression
  // @Input() input_isExpression!: boolean;
  //  @Output() input_isExpressionChange: EventEmitter<any> =
  //   new EventEmitter<any>();
  // Điều khiển giao diện nút submit và save
  input_isExpression = true;

  // Date
  value: Date;
  minDate?: Date;
  maxDate?: Date;
  invalidDates?: Array<Date>;



  // Form
  @Input() input_form!: FormGroup;
  @Output() input_formChange: EventEmitter<any> = new EventEmitter<any>();

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  @Output() notification: EventEmitter<any> = new EventEmitter<any>();

  // static form: FormGroup<any>;
  // TodoItemComponent: any;
  // private messageService: MessageService

  constructor(fb: FormBuilder, private titleService: TitleService) {
    this.value = new Date();
    this.title = '';
    // this.item = {
    //   title: '',
    //   description: '',
    //   completed: false,
    //   cre_time: undefined,
    //   start_time: undefined,
    //   deadline_time: undefined,
    //   comp_time: undefined,
    //   priority: undefined,
    // };
    this.listPriority = [
      {
        name: 'Critical',
        short_key: 'P1',
        descripsion:
          ' finish this task to unblock someone else, required to be done before other things',
      },
      {
        name: 'High',
        short_key: 'P1',
        descripsion: 'ordinary flow of work',
      },
      {
        name: 'Medium',
        short_key: 'P3',
        descripsion: 'nice to have, but not required',
      },
      {
        name: 'Low',
        short_key: 'P4',
        descripsion: 'informational only',
      },
    ];

    this.titleService.getTitles().then((titles) => {
      this.titles = titles;
    })
    // this.listPriority = [{name:'p1'}];
  }

  ngOnInit(): void {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = month === 0 ? 11 : month - 1;
    let prevYear = prevMonth === 11 ? year - 1 : year;
    let nextMonth = month === 11 ? 0 : month + 1;
    let nextYear = nextMonth === 0 ? year + 1 : year;
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setMonth(nextMonth);
    this.maxDate.setFullYear(nextYear);

    let invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [today, invalidDate];
  }

  submitValue() {
    // this.form.controls['fm_title'].setValue('Trần Anh Tú');
    // var obj = this.form.value;

    //Nạp dữ liệu xuống local store
    if (this.input_form.value.fm_title != null) {
      // this.item.title = this.title;
      this.input_form.controls['fm_time_creation'].setValue(new Date());
      this.submit.emit(this.input_form.value);

      // Enable notification add success item
      // this.messageService.add({
      //   severity: 'success',
      //   summary: 'Service Message',
      //   detail: 'Todo has been created successfully',
      // });
      this.notification.emit({
        content: {
          severity: 'success',
          summary: 'Success',
          detail:
            'Todo has been created successfully todo item "' +
            this.input_form.value.fm_title +
            '"',
        },
        option: 'add',
      });
    } else {
      // Enable notification add erro item
      // this.messageService.add({
      //   severity: 'error',
      //   summary: 'Service Message',
      //   detail: 'An error has occurred. Title cannit be empty!',
      // });
      this.notification.emit({
        content: {
          severity: 'error',
          summary: 'Error',
          detail: 'An error has occurred. Title cannit be empty!',
        },
        option: 'add',
      });
    }

    //Xoá dữ liệu trên form
    this.resetForm();
  }

  saveValue() {
    //Lưu dữ liệu lại story
    this.update.emit({
      item: this.input_item,
      changes: this.input_form.value,
    });

    // Đổi trạng thái nút Save -> submit trên giao diện Input
    this.input_form.controls['fm_btn_submit'].setValue(
      !this.input_form.value.fm_btn_submit
    );
  }

  resetAll() {
    //Xoá tất cả trường đăng nhập
    this.resetForm();

    //Xoá tất cả thông báo
    this.removeAllNotification();
  }

  resetForm() {
    // Reset value input fiels.
    this.input_form.controls['fm_title'].setValue(null);
    this.input_form.controls['fm_description'].setValue(null);
    this.input_form.controls['fm_time_start'].setValue(null);
    this.input_form.controls['fm_time_deadline'].setValue(null);
    this.input_form.controls['fm_priority'].setValue(null);
  }

  removeAllNotification() {
    //remove all notification
    this.notification.emit({
      option: 'clean',
    });
    this.notification.emit({
      content: {
        severity: 'warn',
        summary: 'Warning',
        detail: 'You jusst deleted all notifications web-app todo-list!'
      },
      option: 'add'
    });

  }

  isEmpty(str: string) {
    return !str || str.length === 0;
  }

  generateTitle(): string {
    return 'This title was generated by a method.';
  }

  filterItem(event:any){
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.titles.length; i++) {
        let title = this.titles[i];
        if (title.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(title);
        }
    }

    this.filteredTitles = filtered;
  }
}
