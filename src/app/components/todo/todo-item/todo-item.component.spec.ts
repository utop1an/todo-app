import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';
import { TodoService } from 'src/app/services/todo.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import { AppComponent } from 'src/app/app.component';
import { AppModule } from 'src/app/app.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let todoService: TodoService;

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      imports: [
        
      ],
      declarations: [ TodoItemComponent ],
      providers: [{
        provide: TodoService, useValue: jasmine.createSpyObj([''])
      }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    
  });

  beforeEach(()=> {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    
    
    const todoMock = { id: 1, title: 'Test Todo', completed: false, editing: false };
    component.todo = todoMock;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
