import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './components/todo/todo-list/todo-list.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { AdminLoginComponent } from './components/user/admin-login/admin-login.component';
import { UsersInfoComponent } from './components/user/users-info/users-info.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: UserLoginComponent},
  {path: 'todo-list', component: TodoListComponent, canActivate: [AuthGuard]},
  {path: 'admin-login', component: AdminLoginComponent},
  {path: 'users-info', component: UsersInfoComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
