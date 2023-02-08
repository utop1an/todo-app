import { TestBed } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { AppModule } from '../app.module';

import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [AppModule],
    declarations: [AppComponent],
    providers: [
      AuthInterceptor
      ],
    
      
  }));

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
