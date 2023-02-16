import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AppComponent } from '../app.component';
import { AppModule } from '../app.module';

import { AuthInterceptor } from './auth.interceptor';



describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let routerSpy: jasmine.SpyObj<Router>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [
        AuthInterceptor
        ],
      
      
    })
    interceptor = TestBed.inject(AuthInterceptor);
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

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
  });

  it('should be created', () => {
    
    expect(interceptor).toBeTruthy();
  });

  it('should add token', () => {
    localStorage.setItem("access_token", "test_token")
    const mockReq = new HttpRequest('GET', '/test'); 
    const requestCloneSpy = spyOn(mockReq, 'clone');
    const next: any = {
      handle: () => {
        return of({ statuscode: 200, message: "OK" });
      }
    };
    interceptor.intercept(mockReq, next).subscribe(()=>{
      expect(requestCloneSpy).toHaveBeenCalledTimes(1);
    })

  });

  it('should do nothing', () => {
    const mockReq = new HttpRequest('GET', '/test'); 
    const requestCloneSpy = spyOn(mockReq, 'clone');
    const next: any = {
      handle: () => {
        return of({ statuscode: 200, message: "OK" });
      }
    };
    interceptor.intercept(mockReq, next).subscribe(()=>{
      expect(requestCloneSpy).toHaveBeenCalledTimes(0);
    })

  });

});
