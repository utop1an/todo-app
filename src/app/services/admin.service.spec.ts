import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { baseUrl } from 'src/environments/environment';

import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;
  let httpTestingController: HttpTestingController;
  const testData = [
    {
      id: 1, 
      username: "test1", 
      loginCount: 1,
      createTodoCount: 1,
      completeTodoCount: 1,
      translateTodoCount: 1,
      roles: ["admin"]
    },
    {
      id: 2, 
      username: "test2", 
      loginCount: 2,
      createTodoCount: 2,
      completeTodoCount: 2,
      translateTodoCount: 2,
      roles: ["admin"]
    },
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AdminService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it("[getUsers] should return users infos", ()=>{
    
    service.getUsers().subscribe((data)=>{
      expect(data).toEqual(testData);
    });
    const request = httpTestingController.expectOne(baseUrl+"user");
    request.flush(testData);
    expect(request.request.method).toBe('GET');
  
  })
});
