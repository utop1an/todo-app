import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { AppModule } from 'src/app/app.module';
import { AdminService } from 'src/app/services/admin.service';

import { UsersInfoComponent } from './users-info.component';

describe('UsersInfoComponent', () => {
  let component: UsersInfoComponent;
  let fixture: ComponentFixture<UsersInfoComponent>;
  let mockAdminService: AdminService;

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
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppModule],
      declarations: [ UsersInfoComponent, AppComponent ],
      providers: []
    })
    .compileComponents();
    mockAdminService = TestBed.inject(AdminService);

    fixture = TestBed.createComponent(UsersInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  

  it('should get and render users info in the table', () => {
    spyOn(mockAdminService, "getUsers").and.returnValue(of(testData))
    component.getUsers()
    fixture.detectChanges();
    let tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(3);

    // Header row
    let headerRow = tableRows[0];
    expect(headerRow.cells[0].textContent).toBe(' User ID ');
    expect(headerRow.cells[1].textContent).toBe(' Username ');
    expect(headerRow.cells[2].textContent).toBe(' Login Count ');

    // Data rows
    let row1 = tableRows[1];
    expect(row1.cells[0].innerHTML).toBe(' 1 ');
    expect(row1.cells[1].innerHTML).toBe(' test1 ');
    expect(row1.cells[2].innerHTML).toBe(' 1 ');
  });
});
