import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InputButtonUnitComponent } from './input-button-unit/input-button-unit.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { ListManagerComponent } from './list-manager/list-manager.component';
import { TodoListService } from './services/todo-list.service';
import { StorageService } from './services/storage.service';
import { TodoListDetailComponentComponent } from './todo-list-detail-component/todo-list-detail-component.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailTodoItemComponent } from './detail-todo-item/detail-todo-item.component';
import {ChipsModule} from 'primeng/chips';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox'
import {CalendarModule} from 'primeng/calendar'
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DropdownModule} from 'primeng/dropdown';
import {PanelModule} from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MessageModule} from 'primeng/message';

@NgModule({
  declarations: [
    AppComponent,
    InputButtonUnitComponent,
    TodoItemComponent,
    ListManagerComponent,
    TodoListDetailComponentComponent,
    DetailTodoItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChipsModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    CalendarModule,
    InputTextareaModule,
    DropdownModule,
    PanelModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MessageModule
  ],
  providers: [TodoListService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
