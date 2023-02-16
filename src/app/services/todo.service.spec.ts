import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Todo } from '../interfaces/todo';
import { TodoService } from './todo.service';
import { baseUrl } from 'src/environments/environment';

describe('TodoService', () => {
  let service: TodoService;
  let httpTestingController: HttpTestingController;
  let TODOS = [
    {
      title: "Test todo 1",
      id: 1,
      userId: 1,
      completed: true,
      editing: false
    },
    {
      title: "Test todo 2",
      id: 2,
      userId: 2,
      completed: false,
      editing: false
    }
  ];


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,

      ],
      providers: [
        TodoService,
      ]
    });
    service = TestBed.inject(TodoService);
    httpTestingController = TestBed.inject(HttpTestingController);

    
    });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("[getTodos] should return todos for current user", ()=>{
    
    service.getTodos();
    
  })

  


})