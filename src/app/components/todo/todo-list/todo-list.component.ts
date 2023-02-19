import { Component, OnInit, } from '@angular/core';

import { trigger, transition, style, animate } from '@angular/animations';
import { TodoService } from 'src/app/services/todo.service';
import { AuthService } from 'src/app/services/auth.service';
import { Todo } from 'src/app/interfaces/todo';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { TodosState } from 'src/app/store';
import { translateTodos, undoTranslateTodos } from 'src/app/store/actions/todo.actions';
import { selectTodos } from 'src/app/store/selectors/todo.selectors';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [
    TodoService,
    AuthService, 
  ],
  animations: [
    trigger('fade', [

      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(200, style({ opacity: 1, transform: 'translateY(0px)'}))
      ]),

      transition(':leave', [
        animate(200, style({ opacity: 0, transform: 'translateY(30px)' }))
      ]),

    ])
  ]
})
export class TodoListComponent implements OnInit {

  todoTitle: string = '';
  beforeEditCache: string = '';
  filter: string = 'all';
  anyRemainingModel: boolean = true;
  todos: Todo[] = [];

  translatedTodos: Observable<Todo[]>;
  translateClicked: boolean = false;

  constructor(
    public todoService : TodoService,
    public authService: AuthService,
    private store: Store<TodosState>,
    ) { 
  }

  ngOnInit() {
    this.todoTitle = '';
    this.getTodos();
    this.translatedTodos = this.store.pipe(select(selectTodos));
  }


  getTodos() {
    this.todoService.getTodos().subscribe((res: any)=>{
      this.todos=res;
    })
  }


  addTodo() {
    if (this.todoTitle.trim().length === 0) {
      return;
    }

    this.todoService.addTodo(this.todoTitle).subscribe((res: any)=>{
      this.todos.push({
        id: res.id,
        title: res.title,
        completed: res.completed,
        editing: false,
        userId: res.userId
      })
    });
    this.todoTitle = '';
  }


  editTodo(todo: Todo) {
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }


  doneEdit(todo: Todo) {
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    }

    this.anyRemainingModel = this.anyRemaining();
    todo.editing = false;

    this.todoService.doneEdit(todo).subscribe();
  }


  cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }


  deleteTodo(id: number) {
    this.todoService.deleteTodo(id)
    .subscribe(()=>{
      this.todos = this.todos.filter(todo => todo.id !== id);
    })
  }


  translate(): void{
    this.todoService.translate()
    .subscribe(((res:any)=>{
      this.store.dispatch(translateTodos({todos: res}))
      this.translateClicked = !this.translateClicked
    }))
  }


  undoTranslate(): void{
    this.translateClicked = !this.translateClicked
    this.store.dispatch(undoTranslateTodos())
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

    this.todoService.clearCompleted(completed)
    .subscribe(res=>{
      this.todos = this.todos.filter(todo => !todo.completed);
    })
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
