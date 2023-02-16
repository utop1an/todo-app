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
    
    

    interface STORE {
      [key: string]: string
    }
    let store : STORE = {};
    const mockLocalStorage = {
      getItem: (key: string): string | null => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
    };
    

    spyOn(localStorage, 'getItem')
    .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
    .and.callFake(mockLocalStorage.setItem);
    
    localStorage.setItem("currentUser", "1");
    });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("[getTodos] should return todos for current user", ()=>{
    
    service.getTodos().subscribe((data)=>{
      expect(data).toEqual(TODOS);
    });
    expect(localStorage.getItem).toHaveBeenCalledTimes(1)
    const request = httpTestingController.expectOne(baseUrl+"todo/user"+localStorage.getItem("currentUser"));
    request.flush(TODOS);
    expect(request.request.method).toBe('GET');
  
  })

  it("[addTodo] should add todo for current user", ()=>{
    const testData = {
      title: "Test",
      userId: 1,
      completed: false
    }
    service.addTodo(testData.title).subscribe((data)=>{
      expect(data).toEqual(testData);
    });
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem("currentUser")).toEqual("1");
    const request = httpTestingController.expectOne(baseUrl+"todo");
    request.flush(testData);
    expect(request.request.method).toBe('POST');
  
  })

  it("[doneEdit] should update todo", ()=>{
    const testData: Todo = {
      title: "TestEdit",
      id: 1,
      userId: 1,
      completed: true,
      editing: false
    }
    service.doneEdit(testData).subscribe((data)=>{
      expect(data).toEqual(testData);
    });
    const request = httpTestingController.expectOne(baseUrl+"todo/"+testData.id);
    request.flush(testData);
    expect(request.request.method).toBe('PATCH');
  
  })

  it("[deleteTodo] should delete todo", ()=>{
    
    service.deleteTodo(1).subscribe(()=>{
    });
    const request = httpTestingController.expectOne(baseUrl+"todo/1");
    expect(request.request.method).toBe('DELETE');
  
  })

  it("[clearCompleted] should clear completed todos for current user", ()=>{
    
    service.clearCompleted([1,2,3]).subscribe((data)=>{
    });
    const request = httpTestingController.expectOne(baseUrl+"todo/deleteCompleted");
    expect(request.request.method).toBe('POST');
  
  })

  it("[translate] should translate todo", ()=>{
    
    
    service.translate().subscribe((data)=>{
      expect(data).toEqual(TODOS);
    });
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem("currentUser")).toEqual("1");
    const request = httpTestingController.expectOne(baseUrl+"todo/translate");
    request.flush(TODOS);
    expect(request.request.method).toBe('POST');

  })

  


})