import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
    private router: Router) { }

  
  login(data: any): Observable<any>{
    return this.httpClient.post(`${baseUrl}auth/login`, data)
  }

  register(data: any): Observable<any>{
    return this.httpClient.post(`${baseUrl}auth/register`, data)
  }

  adminLogin(data: any): Observable<any>{
    return this.httpClient.post(`${baseUrl}auth/admin/login`, data)
  }

  adminRegister(data: any): Observable<any>{
    return this.httpClient.post(`${baseUrl}auth/admin/register`, data)
  }

  logOut(){
    localStorage.removeItem("access_token");
    localStorage.removeItem("currentUser")
    this.router.navigate([""])
  }

  adminLogOut(){
    localStorage.removeItem("access_token");
    localStorage.removeItem("currentAdmin")
    this.router.navigate(["/admin-login"])
  }


}
