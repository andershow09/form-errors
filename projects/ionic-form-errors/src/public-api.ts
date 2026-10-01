/*
 * Public API Surface of ionic-form-errors
 */

// Models
export { ErrorMessages, ErrorMessageEntry, ErrorMessageFn, ResolvedError, DisplayStrategy } from './lib/models/error-messages.interface';
export { IonFormErrorsConfig, DEFAULT_ION_FORM_ERRORS_CONFIG } from './lib/models/form-errors-config.interface';

// Providers
export { provideIonFormErrors, ION_FORM_ERRORS_CONFIG } from './lib/providers/provide-ion-form-errors';

// Components
export { IonFormErrorsComponent } from './lib/components/ion-form-errors/ion-form-errors.component';

// Directives
export { IonFormErrorsDirective } from './lib/directives/ion-form-errors.directive';
