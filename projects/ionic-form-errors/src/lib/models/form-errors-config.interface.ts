import { DisplayStrategy, ErrorMessages } from './error-messages.interface';

/**
 * Global configuration for ionic-form-errors components and directives.
 *
 * Provided via `provideIonFormErrors()` at the application level.
 *
 * @example
 * ```typescript
 * provideIonFormErrors({
 *   defaultMessages: {
 *     required: 'This field is required',
 *     email: 'Invalid email address',
 *     minlength: ({ requiredLength }) => `At least ${requiredLength} characters`,
 *   },
 *   displayStrategy: 'dirty',
 *   maxErrors: 1,
 * });
 * ```
 */
export interface IonFormErrorsConfig {
  /**
   * Default error messages applied globally when no component-level override is provided.
   * Component-level messages take precedence over these defaults.
   */
  readonly defaultMessages: ErrorMessages;

  /**
   * Controls when validation errors become visible.
   * @default 'dirty'
   */
  readonly displayStrategy: DisplayStrategy;

  /**
   * Maximum number of errors to display simultaneously.
   * Set to `0` or `Infinity` to show all errors.
   * @default 1
   */
  readonly maxErrors: number;
}

/** Sensible defaults used when no explicit configuration is provided. */
export const DEFAULT_ION_FORM_ERRORS_CONFIG: IonFormErrorsConfig = {
  defaultMessages: {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    minlength: ({ requiredLength }) => `Minimum ${requiredLength} characters required`,
    maxlength: ({ requiredLength }) => `Maximum ${requiredLength} characters allowed`,
    min: ({ min }) => `Value must be at least ${min}`,
    max: ({ max }) => `Value must be at most ${max}`,
    pattern: 'Invalid format',
  },
  displayStrategy: 'dirty',
  maxErrors: 1,
};
