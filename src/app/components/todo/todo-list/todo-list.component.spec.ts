import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from 'src/app/app.component';
import { AppModule } from 'src/app/app.module';
import { TodoService } from 'src/app/services/todo.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { translateTodos } from 'src/app/store/actions/todo.actions';

import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoService: TodoService;
  let mockStore: MockStore;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule,],
      declarations: [ TodoListComponent, AppComponent ],
      providers: [ 
        {
        provide: TodoService,
        useValue: jasmine.createSpyObj(['']),
      },
      provideMockStore({})
       ],
    })
    .compileComponents();

    mockStore = TestBed.inject(MockStore)
    
  });

  beforeEach(()=>{
    
    
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  })

  it('should create', () => {
    
    expect(component).toBeTruthy();
  });

  

  it('should initialize the `todoTitle` property with an empty string', () => {
    
    expect(component.todoTitle).toBe('');
  });

  it('should call the `addTodo` method of the TodoService', () => {
    
    
    
    // const addTodoSpy = spyOn(todoService, 'addTodo').and.returnValues(JSON.parse("{'title': 'Test todo', 'id': 1, 'completed': false, 'editing': false}"));

    // component.todoTitle = 'Test todo';
    // component.addTodo();

    
    // expect(addTodoSpy).toHaveBeenCalledWith('Test todo');
    
    expect(component.todoTitle).toBe('');
  });

  it("translate", ()=>{

    
    // const dispatchSpy = spyOn(mockStore, 'dispatch').and.callThrough();
    // const expectedAction = translateTodos({todos: TODOS});
    // expect(dispatchSpy).toHaveBeenCalledTimes(1)
    // expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  })
});
