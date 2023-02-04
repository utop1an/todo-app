import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment.dev';
import { Todo } from '../interfaces/todo';
import { catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoTitle: string = '';
  beforeEditCache: string = '';
  filter: string = 'all';
  anyRemainingModel: boolean = true;
  todos: Todo[] = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { 
    this.getTodos();
  }

  errorHandler(error: HttpErrorResponse){
    return observableThrowError(()=> new Error(error.message || 'Unknown error'));
  };

  getTodos() {

    this.httpClient.get(baseUrl+'todo/user' + localStorage.getItem("currentUser"))
    .pipe(catchError(this.errorHandler))
    .subscribe((res: any)=>{
      this.todos=res;
      console.log(this.todos);
    })
  };

  addTodo(todoTitle : string): void {
    if (todoTitle.trim().length === 0) {
      return;
    }

    this.httpClient.post(baseUrl+"todo", {
      title: todoTitle,
      userId: localStorage.getItem('currentUser')
    })
      .pipe(catchError(this.errorHandler))
      .subscribe((res: any)=>{
        this.todos.push({
          id: res.id,
          title: res.title,
          completed: res.completed,
          editing: false
        })
      })

  }

  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }

  doneEdit(todo: Todo): void {
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    }

    this.anyRemainingModel = this.anyRemaining();
    todo.editing = false;

    console.log(todo)
    this.httpClient.patch(baseUrl+"todo/"+todo.id, {
      title: todo.title,
      completed: todo.completed
    })
      .pipe(catchError(this.errorHandler))
      .subscribe(res=>{
      })
  }

  cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }

  deleteTodo(id: number): void {

    this.httpClient.delete(baseUrl+"todo/"+id)
      .pipe(catchError(this.errorHandler))
      .subscribe(res=>{
        this.todos = this.todos.filter(todo => todo.id !== id);
      })
  }

  remaining(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  atLeastOneCompleted(): boolean {
    return this.todos.filter(todo => todo.completed).length > 0;
  }

  clearCompleted(): void {
    

    const completed: number[] = this.todos
      .filter(todo=> todo.completed)
      .map(todo => todo.id)

    console.log(completed)  
    this.httpClient.post(baseUrl+"todo/deleteCompleted", {
      todos: completed
    })
    .pipe(catchError(this.errorHandler))
    .subscribe(res=>{
      this.todos = this.todos.filter(todo => !todo.completed);
    })
  }

  translate(id:number): void{
    // call ms/google api to translate
  }


  anyRemaining(): boolean {
    return this.remaining() !== 0;
  }

  todosFiltered(): Todo[] {
    if (this.filter === 'all') {
      return this.todos;
    } else if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    } else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    }

    return this.todos;
  }
}
