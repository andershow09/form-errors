import { describe, it, expect } from 'vitest';
import { resolveErrorMessage, resolveErrors } from './error-mapper';
import { ErrorMessages } from '../models/error-messages.interface';

describe('resolveErrorMessage', () => {
  it('should return the string message when entry is a string', () => {
    const result = resolveErrorMessage('required', 'This field is required', true);
    expect(result).toBe('This field is required');
  });

  it('should call the function entry with params and return its result', () => {
    const fn = (params: Record<string, unknown>) =>
      `Minimum ${params['requiredLength']} characters`;

    const result = resolveErrorMessage('minlength', fn, {
      requiredLength: 5,
      actualLength: 3,
    });

    expect(result).toBe('Minimum 5 characters');
  });

  it('should return a generic fallback when entry is undefined', () => {
    const result = resolveErrorMessage('customValidator', undefined, true);
    expect(result).toBe('Validation error: customValidator');
  });
});

describe('resolveErrors', () => {
  it('should return an empty array when errors is null', () => {
    const result = resolveErrors(null, {}, {}, 1);
    expect(result).toEqual([]);
  });

  it('should return an empty array when errors is an empty object', () => {
    const result = resolveErrors({}, {}, {}, 1);
    expect(result).toEqual([]);
  });

  it('should resolve a single required error with component-level message', () => {
    const errors = { required: true };
    const componentMessages: ErrorMessages = { required: 'Campo obrigatório' };

    const result = resolveErrors(errors, componentMessages, {}, 1);

    expect(result).toEqual([
      { key: 'required', message: 'Campo obrigatório' },
    ]);
  });

  it('should fall back to global messages when component message is missing', () => {
    const errors = { email: true };
    const globalMessages: ErrorMessages = { email: 'Invalid email' };

    const result = resolveErrors(errors, {}, globalMessages, 1);

    expect(result).toEqual([
      { key: 'email', message: 'Invalid email' },
    ]);
  });

  it('should prefer component messages over global messages', () => {
    const errors = { required: true };
    const componentMessages: ErrorMessages = { required: 'Obrigatório' };
    const globalMessages: ErrorMessages = { required: 'Required' };

    const result = resolveErrors(errors, componentMessages, globalMessages, 1);

    expect(result).toEqual([
      { key: 'required', message: 'Obrigatório' },
    ]);
  });

  it('should resolve multiple errors respecting maxErrors limit', () => {
    const errors = {
      required: true,
      minlength: { requiredLength: 3, actualLength: 1 },
      email: true,
    };
    const componentMessages: ErrorMessages = {
      required: 'Required',
      minlength: 'Too short',
      email: 'Invalid',
    };

    const result = resolveErrors(errors, componentMessages, {}, 2);

    expect(result).toHaveLength(2);
    expect(result[0].key).toBe('required');
    expect(result[1].key).toBe('minlength');
  });

  it('should return all errors when maxErrors is 0', () => {
    const errors = {
      required: true,
      email: true,
      minlength: { requiredLength: 3, actualLength: 1 },
    };
    const messages: ErrorMessages = {
      required: 'R',
      email: 'E',
      minlength: 'M',
    };

    const result = resolveErrors(errors, messages, {}, 0);

    expect(result).toHaveLength(3);
  });

  it('should resolve function-based messages with validator params', () => {
    const errors = {
      minlength: { requiredLength: 8, actualLength: 3 },
    };
    const componentMessages: ErrorMessages = {
      minlength: (params) => `Min ${params['requiredLength']} chars (got ${params['actualLength']})`,
    };

    const result = resolveErrors(errors, componentMessages, {}, 1);

    expect(result).toEqual([
      { key: 'minlength', message: 'Min 8 chars (got 3)' },
    ]);
  });

  it('should generate a fallback message for unknown validators without messages', () => {
    const errors = { myCustomValidator: { someData: true } };

    const result = resolveErrors(errors, {}, {}, 1);

    expect(result).toEqual([
      { key: 'myCustomValidator', message: 'Validation error: myCustomValidator' },
    ]);
  });
});
