import { ValidationErrors } from '@angular/forms';

/**
 * Function that receives validation error parameters and returns a formatted message string.
 *
 * Useful for dynamic messages like:
 * `(params) => \`Minimum ${params.requiredLength} characters\``
 */
export type ErrorMessageFn = (params: Record<string, unknown>) => string;

/**
 * A single error message entry — either a static string or a dynamic function.
 */
export type ErrorMessageEntry = string | ErrorMessageFn;

/**
 * Map of Angular validator keys to their corresponding error messages.
 *
 * Supports both built-in Angular validators (required, minlength, maxlength, email, etc.)
 * and custom validators via the index signature.
 *
 * @example
 * ```typescript
 * const messages: ErrorMessages = {
 *   required: 'This field is required',
 *   minlength: ({ requiredLength }) => `Minimum ${requiredLength} characters`,
 *   email: 'Please enter a valid email',
 *   myCustomValidator: 'Custom validation failed',
 * };
 * ```
 */
export interface ErrorMessages {
  required?: ErrorMessageEntry;
  minlength?: ErrorMessageEntry;
  maxlength?: ErrorMessageEntry;
  email?: ErrorMessageEntry;
  pattern?: ErrorMessageEntry;
  min?: ErrorMessageEntry;
  max?: ErrorMessageEntry;
  [key: string]: ErrorMessageEntry | undefined;
}

/**
 * Represents a resolved error ready for display.
 */
export interface ResolvedError {
  /** The validator key that triggered this error (e.g. 'required', 'minlength'). */
  readonly key: string;
  /** The human-readable error message to display. */
  readonly message: string;
}

/**
 * Controls when errors become visible to the user.
 *
 * - `'dirty'`: Errors appear after the field value has been changed.
 * - `'touched'`: Errors appear after the field has lost focus.
 * - `'dirtyOrTouched'`: Errors appear when either condition is met.
 * - `'immediate'`: Errors appear immediately, regardless of interaction state.
 */
export type DisplayStrategy = 'dirty' | 'touched' | 'dirtyOrTouched' | 'immediate';
