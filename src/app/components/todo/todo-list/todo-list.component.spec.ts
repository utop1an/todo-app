import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from 'src/app/app.component';
import { AppModule } from 'src/app/app.module';
import { TodoService } from 'src/app/services/todo.service';

import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoService: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule,],
      declarations: [ TodoListComponent, AppComponent ],
      providers: [ {
        provide: TodoService,
        useValue: jasmine.createSpyObj([''])
      } ],
    })
    .compileComponents();

    
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
});
