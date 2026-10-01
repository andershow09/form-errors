import { ValidationErrors } from '@angular/forms';
import {
  ErrorMessageEntry,
  ErrorMessages,
  ResolvedError,
} from '../models/error-messages.interface';

/**
 * Resolves a single error message entry into a displayable string.
 *
 * If the entry is a function, it's called with the validator's error params.
 * If it's a string, it's returned as-is.
 * If it's undefined, a generic fallback message with the validator key is returned.
 *
 * @param key - The validator key (e.g. 'required', 'minlength').
 * @param entry - The message entry (string, function, or undefined).
 * @param params - The validation error parameters from Angular's validator.
 * @returns The resolved message string.
 */
export function resolveErrorMessage(
  key: string,
  entry: ErrorMessageEntry | undefined,
  params: unknown,
): string {
  if (typeof entry === 'function') {
    return entry(params as Record<string, unknown>);
  }

  if (typeof entry === 'string') {
    return entry;
  }

  return `Validation error: ${key}`;
}

/**
 * Maps Angular `ValidationErrors` into an array of `ResolvedError` objects,
 * using component-level messages first and falling back to global defaults.
 *
 * @param errors - The `ValidationErrors` object from an `AbstractControl`.
 * @param componentMessages - Messages provided at the component/directive level.
 * @param globalMessages - Messages from the global `IonFormErrorsConfig`.
 * @param maxErrors - Maximum number of resolved errors to return.
 * @returns An array of resolved errors, up to `maxErrors` in length.
 */
export function resolveErrors(
  errors: ValidationErrors | null,
  componentMessages: ErrorMessages,
  globalMessages: ErrorMessages,
  maxErrors: number,
): ResolvedError[] {
  if (!errors) {
    return [];
  }

  const errorKeys = Object.keys(errors);
  const limit = maxErrors > 0 ? maxErrors : errorKeys.length;

  return errorKeys.slice(0, limit).map((key) => {
    const entry = componentMessages[key] ?? globalMessages[key];
    const message = resolveErrorMessage(key, entry, errors[key]);
    return { key, message };
  });
}
