import { InjectionToken, Provider } from '@angular/core';
import {
  DEFAULT_ION_FORM_ERRORS_CONFIG,
  IonFormErrorsConfig,
} from '../models/form-errors-config.interface';

/**
 * Injection token for the global ionic-form-errors configuration.
 *
 * Use `provideIonFormErrors()` to supply a custom configuration.
 * If not provided, `DEFAULT_ION_FORM_ERRORS_CONFIG` is used as fallback.
 */
export const ION_FORM_ERRORS_CONFIG = new InjectionToken<IonFormErrorsConfig>(
  'ION_FORM_ERRORS_CONFIG',
  {
    providedIn: 'root',
    factory: () => DEFAULT_ION_FORM_ERRORS_CONFIG,
  },
);

/**
 * Provides the global configuration for `ionic-form-errors` components and directives.
 *
 * Call this function in your application's `providers` array (e.g., in `app.config.ts`)
 * to customize default error messages, display strategy, and max errors.
 *
 * @param config - Partial configuration that will be merged with defaults.
 * @returns A provider that registers the merged configuration.
 *
 * @example
 * ```typescript
 * import { provideIonFormErrors } from 'form-errors';
 *
 * export const appConfig = {
 *   providers: [
 *     provideIonFormErrors({
 *       defaultMessages: {
 *         required: 'Campo obrigatório',
 *         email: 'E-mail inválido',
 *         minlength: ({ requiredLength }) => `Mínimo de ${requiredLength} caracteres`,
 *       },
 *       displayStrategy: 'dirtyOrTouched',
 *       maxErrors: 2,
 *     }),
 *   ],
 * };
 * ```
 */
export function provideIonFormErrors(
  config: Partial<IonFormErrorsConfig>,
): Provider {
  const mergedConfig: IonFormErrorsConfig = {
    ...DEFAULT_ION_FORM_ERRORS_CONFIG,
    ...config,
    defaultMessages: {
      ...DEFAULT_ION_FORM_ERRORS_CONFIG.defaultMessages,
      ...config.defaultMessages,
    },
  };

  return {
    provide: ION_FORM_ERRORS_CONFIG,
    useValue: mergedConfig,
  };
}
