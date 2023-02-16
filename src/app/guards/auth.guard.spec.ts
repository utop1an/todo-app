import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;

  const dummyRoute = {} as ActivatedRouteSnapshot;
  function fakeRouterState(url: string): RouterStateSnapshot {
    return {
      url,
    } as RouterStateSnapshot;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ]
    });
    guard = TestBed.inject(AuthGuard)
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

  it('should return false if the user state is not logged in', () => {
    const canActivate = guard.canActivate(dummyRoute, fakeRouterState("/todo-list"))

    expect(localStorage.getItem).toHaveBeenCalledTimes(2);
    expect(localStorage.getItem("currentUser")).toEqual(null);

    expect(canActivate).toBeFalse();
    
  });

  it('should return true if the user state is logged in', () => {

    localStorage.setItem("currentUser", "1");

    
    const canActivate = guard.canActivate(dummyRoute, fakeRouterState("/todo-list"))
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem("currentUser")).toEqual("1");
    expect(canActivate).toBeTrue()
    
  });
});
