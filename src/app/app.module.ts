import { FormErrorsModule } from './modules/form-errors/form-errors.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormErrorsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
