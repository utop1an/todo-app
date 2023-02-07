import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { provideStore } from '@ngrx/store';

import { AppModule } from './app/app.module';
import { reducers } from './app/store';


platformBrowserDynamic().bootstrapModule(
  AppModule,)
  .catch(err => console.error(err));
