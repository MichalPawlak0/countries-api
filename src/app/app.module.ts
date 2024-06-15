import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  imports: [AppComponent],
  providers: [provideHttpClient()],
})
export class AppModule {}
