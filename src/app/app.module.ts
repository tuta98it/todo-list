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
import {MessagesModule} from 'primeng/messages';
import {DialogModule} from 'primeng/dialog';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import {ToastModule} from 'primeng/toast';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MenubarModule } from 'primeng/menubar';
import {MenuModule} from 'primeng/menu';
import { AutoCompleteModule } from 'primeng/autocomplete';
registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    InputButtonUnitComponent,
    TodoItemComponent,
    ListManagerComponent,
    TodoListDetailComponentComponent,
    DetailTodoItemComponent,
    PagenotfoundComponent
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
    MessageModule,
    MessagesModule,
    DialogModule,
    ToastModule,
    HttpClientModule,
    MenubarModule,
    NzResultModule,
    NzButtonModule,
    NzIconModule,
    MenuModule,
    AutoCompleteModule
  ],
  providers: [TodoListService, StorageService, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
