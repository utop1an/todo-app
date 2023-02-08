import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Todo } from '../interfaces/todo';
import { TodoService } from './todo.service';
import { TodosState } from '../store';
import { Store, StoreModule } from '@ngrx/store';
import { baseUrl } from 'src/environments/environment.dev';

describe('TodoService', () => {
  let service: TodoService;
  let httpTestingController: HttpTestingController;
  let store: Store<TodosState>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({})
      ],
      providers: [
        TodoService,
        { provide: Router, useValue: { navigate: () => {} } },
      ]
    });
    service = TestBed.inject(TodoService);
    httpTestingController = TestBed.inject(HttpTestingController);
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);

    
    });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created with getTodos()', () => {

    const mockCall = httpTestingController.expectOne(baseUrl+"todo/usernull")
    mockCall.flush([
      {
        title: "test todo",
        id: 1,
        completed: false,
        editing: false
      }
    ])
    expect(service.todos).toEqual([{
      title: "test todo",
      id: 1,
      completed: false,
      editing: false
    }])
    expect(service).toBeTruthy();
  });

  it('')

})