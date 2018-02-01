import { Observable } from 'rxjs';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormErrors } from './components/form-errors';
import { IconErrors } from './components/form-errors';

@NgModule({
  declarations: [
    FormErrors,
    IconErrors
  ],
  exports: [
    FormErrors,
    IconErrors
  ]
})
export class FormErrorsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FormErrors
    };
  }
}

