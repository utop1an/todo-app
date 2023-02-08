import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import { Todo } from '../interfaces/todo';
import { Router } from '@angular/router';
import { TodosState } from '../store';
import { select, Store } from '@ngrx/store';
import { translateTodos, undoTranslateTodos } from '../store/actions/todo.actions';
import { Observable } from 'rxjs'
import { selectTodos } from '../store/selectors/todo.selectors';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoTitle: string = '';
  beforeEditCache: string = '';
  filter: string = 'all';
  anyRemainingModel: boolean = true;
  todos: Todo[] = [];

  translatedTodos: Observable<Todo[]>;
  translateClicked: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store<TodosState>,
 
  ) { 
    this.getTodos();
    this.translatedTodos = this.store.pipe(select(selectTodos));
  }


  getTodos() {
    this.httpClient.get(baseUrl+'todo/user' + localStorage.getItem("currentUser"))
    .subscribe((res: any)=>{
      this.todos=res;
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

    this.httpClient.patch(baseUrl+"todo/"+todo.id, {
      title: todo.title,
      completed: todo.completed
    })
      .subscribe(res=>{
      })
  }

  cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }

  deleteTodo(id: number): void {

    this.httpClient.delete(baseUrl+"todo/"+id)
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

    this.httpClient.post(baseUrl+"todo/deleteCompleted", {
      todos: completed
    })
    .subscribe(res=>{
      this.todos = this.todos.filter(todo => !todo.completed);
    })
  }

  translate(): void{
    const translating: number[] = this.todos
      .filter(todo=> todo.completed)
      .map(todo => todo.id)

    this.httpClient.post(baseUrl+"todo/translate", {
      userId: localStorage.getItem("currentUser")
    }).subscribe(((res:any)=>{
      

      this.store.dispatch(translateTodos({todos: res}))
      this.translateClicked = !this.translateClicked
      

    }))
  }

  undoTranslate(): void{
    this.translateClicked = !this.translateClicked
    this.store.dispatch(undoTranslateTodos())
  }


  anyRemaining(): boolean {
    return this.remaining() !== 0;
  }

  todosFiltered(): Todo[] {
    var tmpTodos = this.todos;
    this.translatedTodos.subscribe((data: Todo[])=> {
      if (data.length != 0) {
        tmpTodos = data;
      }
    })

    if (this.filter === 'all') {
      return tmpTodos;
    } else if (this.filter === 'active') {
      return tmpTodos.filter(todo => !todo.completed);
    } else if (this.filter === 'completed') {
      return tmpTodos.filter(todo => todo.completed);
    }

    return tmpTodos;
  }
}
