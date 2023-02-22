import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListDetailComponentComponent } from './todo-list-detail-component/todo-list-detail-component.component';
import { ShowDetailComponent } from './show-detail/show-detail.component';


export const appRoutes: Routes = [

  // {path: "home", component: HomeComponent, children:[
  //   { path: 'child', component: ChildHomeComponent, },
  // ]},



  {
    path: 'detail', component: TodoListDetailComponentComponent

  },

  // {
  //   path: 'todo', component: TodoListDetailComponentComponent

  // }


];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
