import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService} from '@auth0/angular-jwt'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit{

  constructor(
    private authSerive: AuthService,
    private router: Router,
    public dialog: MatDialog,
    ){}
  
  form: FormGroup;

  hide = true;
  login = true;

  jwtHelper = new JwtHelperService();


  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl ('', [Validators.required]),
      password: new FormControl ('', [Validators.required]),
    });
  
  }

  get f(){
    return this.form.controls;
  }


  onLogin(){
    if (this.form.valid){
      this.authSerive.login(this.form.value).subscribe(res=>{
        console.log(res)
        if (res.statuscode===200){
          
          const token = res.token;
          localStorage.setItem("access_token", res.token)
          
          const decoded = this.jwtHelper.decodeToken(token);
          const userId = decoded.id;
          localStorage.setItem("currentUser", userId);

          this.router.navigate(['/todo-list'])
        }
        
      })
    }
    
  }

  onRegister(){
    if (this.form.valid){
      this.authSerive.register(this.form.value).subscribe(res=>{
        if (res.statuscode==200){
          
          this.dialog.open(DialogSuccess);
          this.dialog.afterAllClosed.subscribe(()=>{
            window.location.reload();
          })
        }    
      })
    }
  }

  toAdmin(){
    this.router.navigate(['/admin-login'])
  }

}

@Component({
  selector: 'dialog-success',
  templateUrl: '../dialog.success.html',
  // styleUrls: ['./user-login.component.scss'],
})
export class DialogSuccess {

  constructor(
    public dialogRef: MatDialogRef<DialogSuccess>,
  ){}


  close() {
    this.dialogRef.close();

  }
}
