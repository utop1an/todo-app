import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService} from '@auth0/angular-jwt'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogSuccess } from '../user-login/user-login.component';

@Component({
  selector: 'admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  constructor(
    private authSerive: AuthService,
    private router: Router,
    public dialog: MatDialog,
    ){}

  loginForm: FormGroup;
  registerForm: FormGroup;

  hidepwd = true;
  hidekey = true;
  login = true;

  jwtHelper = new JwtHelperService();


  ngOnInit(): void {
    this.loginForm = this.registerForm = new FormGroup({
      username: new FormControl ('', [Validators.required]),
      password: new FormControl ('', [Validators.required]),
    });
    this.registerForm = new FormGroup({
      username: new FormControl ('', [Validators.required]),
      password: new FormControl ('', [Validators.required]),
      admin_secret: new FormControl ('', [Validators.required]),
    });
  
  }

  // get f(){
  //   return this.form.controls;
  // }


  onLogin(){
    if (this.loginForm.valid){
      this.authSerive.adminLogin(this.loginForm.value).subscribe(res=>{
        if (res.statuscode===200){
          
          const token = res.token;
          localStorage.setItem("access_token", res.token)
          
          const decoded = this.jwtHelper.decodeToken(token);
          const userId = decoded.id;
          localStorage.setItem("currentAdmin", userId);

          this.router.navigate(['/users-info'])
        }
       
      })
    }
    
  }

  onRegister(){
    if (this.registerForm.valid){
      this.authSerive.adminRegister(this.registerForm.value).subscribe(res=>{
        console.log(res)
        if (res.statuscode==200){
          
          this.dialog.open(DialogSuccess);
          this.dialog.afterAllClosed.subscribe(()=>{
            window.location.reload();
          })
        }
      })
    }
  }

  toUser(){
    this.router.navigate([''])
  }

}

