import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListDetailComponentComponent } from './todo-list-detail-component/todo-list-detail-component.component';
import { ListManagerComponent } from './list-manager/list-manager.component';
import { DetailTodoItemComponent } from './detail-todo-item/detail-todo-item.component';

export const appRoutes: Routes = [
  // {path: "home", component: HomeComponent, children:[
  //   { path: 'child', component: ChildHomeComponent, },
  // ]},

  // {
  //   path: '', component: ListManagerComponent, children:[
  //     {
  //       path: 'table-detail', component: TodoListDetailComponentComponent
  //     }
  //   ]
  // },
  {
    path: '',
    component: ListManagerComponent,
  },

  {
    path: 'table-detail',
    component: TodoListDetailComponentComponent,
  },

  {
    path: 'table-detail/:id',
    component: DetailTodoItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
