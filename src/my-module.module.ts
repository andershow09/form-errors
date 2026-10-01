import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorsComponent, IconErrors } from './components/form-errors';

@NgModule({
  declarations: [FormErrorsComponent, IconErrors],
  imports: [CommonModule],
  exports: [FormErrorsComponent, IconErrors],
})
export class FormErrorsModule {
  static forRoot(): ModuleWithProviders<FormErrorsModule> {
    return {
      ngModule: FormErrorsModule,
    };
  }
}

/**
 * Backward compatibility alias for the module name used in earlier versions.
 */
export const ComponentsModule = FormErrorsModule;
