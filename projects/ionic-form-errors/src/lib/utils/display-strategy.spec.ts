import { describe, it, expect } from 'vitest';
import { shouldDisplayErrors } from './display-strategy';
import { AbstractControl } from '@angular/forms';
import { DisplayStrategy } from '../models/error-messages.interface';

/**
 * Creates a minimal mock of AbstractControl with the specified state.
 */
function createMockControl(overrides: {
  errors?: Record<string, unknown> | null;
  dirty?: boolean;
  touched?: boolean;
}): AbstractControl {
  return {
    errors: overrides.errors ?? null,
    dirty: overrides.dirty ?? false,
    touched: overrides.touched ?? false,
  } as unknown as AbstractControl;
}

describe('shouldDisplayErrors', () => {
  it('should return false when control has no errors regardless of strategy', () => {
    const strategies: DisplayStrategy[] = ['immediate', 'dirty', 'touched', 'dirtyOrTouched'];

    strategies.forEach((strategy) => {
      const control = createMockControl({ errors: null, dirty: true, touched: true });
      expect(shouldDisplayErrors(control, strategy)).toBe(false);
    });
  });

  describe('immediate strategy', () => {
    it('should return true when control has errors, even if pristine and untouched', () => {
      const control = createMockControl({ errors: { required: true } });
      expect(shouldDisplayErrors(control, 'immediate')).toBe(true);
    });
  });

  describe('dirty strategy', () => {
    it('should return true when control is dirty and has errors', () => {
      const control = createMockControl({ errors: { required: true }, dirty: true });
      expect(shouldDisplayErrors(control, 'dirty')).toBe(true);
    });

    it('should return false when control is pristine even with errors', () => {
      const control = createMockControl({ errors: { required: true }, dirty: false });
      expect(shouldDisplayErrors(control, 'dirty')).toBe(false);
    });

    it('should return false when control is touched but not dirty', () => {
      const control = createMockControl({ errors: { required: true }, touched: true, dirty: false });
      expect(shouldDisplayErrors(control, 'dirty')).toBe(false);
    });
  });

  describe('touched strategy', () => {
    it('should return true when control is touched and has errors', () => {
      const control = createMockControl({ errors: { required: true }, touched: true });
      expect(shouldDisplayErrors(control, 'touched')).toBe(true);
    });

    it('should return false when control is untouched even with errors', () => {
      const control = createMockControl({ errors: { required: true }, touched: false });
      expect(shouldDisplayErrors(control, 'touched')).toBe(false);
    });
  });

  describe('dirtyOrTouched strategy', () => {
    it('should return true when control is dirty (not touched) and has errors', () => {
      const control = createMockControl({ errors: { required: true }, dirty: true, touched: false });
      expect(shouldDisplayErrors(control, 'dirtyOrTouched')).toBe(true);
    });

    it('should return true when control is touched (not dirty) and has errors', () => {
      const control = createMockControl({ errors: { required: true }, dirty: false, touched: true });
      expect(shouldDisplayErrors(control, 'dirtyOrTouched')).toBe(true);
    });

    it('should return true when control is both dirty and touched and has errors', () => {
      const control = createMockControl({ errors: { required: true }, dirty: true, touched: true });
      expect(shouldDisplayErrors(control, 'dirtyOrTouched')).toBe(true);
    });

    it('should return false when control is pristine and untouched even with errors', () => {
      const control = createMockControl({ errors: { required: true }, dirty: false, touched: false });
      expect(shouldDisplayErrors(control, 'dirtyOrTouched')).toBe(false);
    });
  });
});
