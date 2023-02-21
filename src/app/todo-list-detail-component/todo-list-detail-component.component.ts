import { Component } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { TodoListService } from '../services/todo-list.service';

@Component({
  selector: 'app-todo-list-detail-component',
  template: `
    <div class="block--table">
      <table class="table_todolist--detail">
        <tr class="tr_todolist--detail">
          <th class="th_todolist--detail">Work to do</th>
          <th class="th_todolist--detail">Status</th>
          <th class="th_todolist--detail">Creation time</th>
          <th class="th_todolist--detail">Component time</th>
        </tr>
        <tr class="tr_todolist--detail" *ngFor="let todoItem of todoList">
          <td class="td_todolist--detail">{{todoItem.title}}</td>
          <td class="td_todolist--detail">{{setStatus(todoItem.completed)}}</td>
          <td class="td_todolist--detail">{{todoItem.cre_time}}</td>
          <td class="td_todolist--detail">{{todoItem.comp_time}}</td>
        </tr>
        <!-- <tr class="tr_todolist--detail">
          <td class="td_todolist--detail">x</td>
          <td class="td_todolist--detail">x</td>
          <td class="td_todolist--detail">x</td>
          <td class="td_todolist--detail">x</td>
        </tr> -->
      </table>
    </div>
  `,
  styleUrls: ['./todo-list-detail-component.component.scss'],
})
export class TodoListDetailComponentComponent {
  todoList: TodoItem[];
  todoListService: TodoListService;

  constructor(private todoListService_t: TodoListService) {
    this.todoListService = todoListService_t;
    this.todoList = todoListService_t.getTodoList();
  }

  setStatus(status?: boolean): string{
    return status? "Complete!": "Processing...";
  }
}
