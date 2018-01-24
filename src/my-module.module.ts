import { Observable } from 'rxjs';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormErrors } from './components/form-errors';

@NgModule({
  declarations: [
    FormErrors
  ],
  exports: [
    FormErrors
  ]
})
export class FormErrorsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FormErrors
    };
  }
}

