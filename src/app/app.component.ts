import { Component, OnInit } from '@angular/core';
import { TodoItem } from './interfaces/todo-item';
import { AccordionModule } from 'primeng/accordion';
import { MenuItem } from 'primeng/api';

import { PrimeNGConfig } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `


    <h1 class="text-900 text-xs font-bold text-6xl mb-4 text-center">
      Welcome to {{ title }}!
    </h1>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayDialog = true;
  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
  title = 'todo-list';
  isShow = true;

  hideListManage() {
    this.isShow = false;
  }
  // todoList : TodoItem[] = [
  //   { title: 'install NodeJS' },
  //   { title: 'install Angular CLI' },
  //   { title: 'create new app' },
  //   { title: 'serve app' },
  //   { title: 'develop app' },
  // ];
  // addItem(title: string) {
  //   this.todoList.push({ title });
  // }
}
