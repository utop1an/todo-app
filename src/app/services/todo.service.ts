import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import { Todo } from '../interfaces/todo';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  
  constructor(
    private httpClient: HttpClient,
  ) { }
  
  

  getTodos(): Observable<any>{
    return this.httpClient.get(baseUrl+'todo/user' + localStorage.getItem("currentUser"))    
  };


  addTodo(todoTitle : string): Observable<any> {
    return this.httpClient.post(baseUrl+"todo", {
      title: todoTitle,
      userId: localStorage.getItem('currentUser')
    })
  }


  doneEdit(todo: Todo): Observable<any> {
    return this.httpClient.patch(baseUrl+"todo/"+todo.id, {
      title: todo.title,
      completed: todo.completed
    })
  }


  deleteTodo(id: number): Observable<any> {
    return this.httpClient.delete(baseUrl+"todo/"+id)
  }

  

  clearCompleted(completed : number[]): Observable<any> {
    return this.httpClient.post(baseUrl+"todo/deleteCompleted", {
      todos: completed
    })
  }


  translate(): Observable<any>{
    return this.httpClient.post(baseUrl+"todo/translate", {
      userId: localStorage.getItem("currentUser")
    })
  }


}
