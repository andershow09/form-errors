import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorsComponent } from './form-errors.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FormErrorsComponent],
  exports: [FormErrorsComponent]
})
export class FormErrorsModule { }
