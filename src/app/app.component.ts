import { Component, OnInit } from '@angular/core';
import { TodoItem } from './interfaces/todo-item';
import {AccordionModule} from 'primeng/accordion';
import {MenuItem} from 'primeng/api';

import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `
    <!-- <p-chips [(ngModel)]="values"></p-chips>

    <h1 class="app-title">
      Welcome to {{ title }}!
    </h1>
    <div class="card">
			<h5>Severities</h5>
			<div class="flex flex-wrap gap-2">
				<button pButton pRipple type="button" label="Primary"></button>
				<button pButton pRipple type="button" label="Secondary" class="p-button-secondary"></button>
				<button pButton pRipple type="button" label="Success" class="p-button-success"></button>
				<button pButton pRipple type="button" label="Info" class="p-button-info"></button>
				<button pButton pRipple type="button" label="Warning" class="p-button-warning"></button>
				<button pButton pRipple type="button" label="Help" class="p-button-help"></button>
				<button pButton pRipple type="button" label="Danger" class="p-button-danger"></button>
			</div>
		</div> -->

    <h1 class="text-900 text-xs font-bold text-6xl mb-4 text-center">
      Welcome to {{ title }}!
    </h1>

    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent  implements OnInit{
  values='đasa'

  constructor (private primengConfig: PrimeNGConfig) {

  }


  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
  title = 'todo-list';
  isShow = true;

  hideListManage(){
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
