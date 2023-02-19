import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { UserInfo } from 'src/app/interfaces/user-info';
import { AuthService } from 'src/app/services/auth.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'users-info',
  templateUrl: './users-info.component.html',
  styleUrls: ['./users-info.component.scss']
})
export class UsersInfoComponent implements AfterViewInit {

  constructor(
    private adminService: AdminService,
    public authService: AuthService,
    private _liveAnnouncer: LiveAnnouncer
  ){}

  displayedColumns: string[] = ['id', 'username', 'loginCount', 'createTodoCount', 'completeTodoCount', 'translateTodoCount', 'roles'];
  usersInfo: UserInfo[] = []
  dataSource = new MatTableDataSource(this.usersInfo);
  
  @ViewChild(MatSort) sort: MatSort;
  
  ngOnInit(){
    this.getUsers()
  }

  

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  
  

  getUsers(){
    this.adminService.getUsers().subscribe((res=>{
      
      this.usersInfo = res;
      this.dataSource = new MatTableDataSource(this.usersInfo);
      this.dataSource.sort = this.sort;
    }))
  }

  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
