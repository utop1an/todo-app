import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { trigger, transition, style, animate } from '@angular/animations';
import { TodoService } from 'src/app/services/todo.service';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';

import { fromEvent } from 'rxjs';
import { TodosState } from 'src/app/store';

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

  todoTitle: string;

  constructor(
    public todoService : TodoService,
    public authService: AuthService,
    private store: Store<TodosState>,

    ) { 
  }

  ngOnInit() {
    this.todoTitle = '';
  
  }

  addTodo(): void {
    this.todoService.addTodo(this.todoTitle);
    this.todoTitle = '';
  }



  

}
