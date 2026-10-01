import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideIonFormErrors, ION_FORM_ERRORS_CONFIG } from './provide-ion-form-errors';
import {
  DEFAULT_ION_FORM_ERRORS_CONFIG,
} from '../models/form-errors-config.interface';

describe('provideIonFormErrors', () => {
  beforeEach(() => {
    TestBed.resetTestingModule();
  });

  it('should provide merged config when partial config is given', () => {
    TestBed.configureTestingModule({
      providers: [
        provideIonFormErrors({
          defaultMessages: {
            required: 'Obrigatório',
          },
          maxErrors: 3,
        }),
      ],
    });

    const config = TestBed.inject(ION_FORM_ERRORS_CONFIG);

    expect(config.maxErrors).toBe(3);
    expect(config.defaultMessages.required).toBe('Obrigatório');
    // Should preserve defaults for unspecified keys
    expect(config.defaultMessages.email).toBe(
      DEFAULT_ION_FORM_ERRORS_CONFIG.defaultMessages.email,
    );
    expect(config.displayStrategy).toBe(
      DEFAULT_ION_FORM_ERRORS_CONFIG.displayStrategy,
    );
  });

  it('should use defaults when no provider is configured', () => {
    TestBed.configureTestingModule({});

    const config = TestBed.inject(ION_FORM_ERRORS_CONFIG);

    expect(config).toEqual(DEFAULT_ION_FORM_ERRORS_CONFIG);
  });

  it('should override displayStrategy when provided', () => {
    TestBed.configureTestingModule({
      providers: [
        provideIonFormErrors({
          displayStrategy: 'touched',
        }),
      ],
    });

    const config = TestBed.inject(ION_FORM_ERRORS_CONFIG);

    expect(config.displayStrategy).toBe('touched');
  });

  it('should override maxErrors to 0 (show all)', () => {
    TestBed.configureTestingModule({
      providers: [
        provideIonFormErrors({
          maxErrors: 0,
        }),
      ],
    });

    const config = TestBed.inject(ION_FORM_ERRORS_CONFIG);

    expect(config.maxErrors).toBe(0);
  });

  it('should support function-based messages in overrides', () => {
    TestBed.configureTestingModule({
      providers: [
        provideIonFormErrors({
          defaultMessages: {
            minlength: (params) => `Min: ${params['requiredLength']}`,
          },
        }),
      ],
    });

    const config = TestBed.inject(ION_FORM_ERRORS_CONFIG);
    const minlengthMsg = config.defaultMessages.minlength;

    expect(typeof minlengthMsg).toBe('function');
    if (typeof minlengthMsg === 'function') {
      expect(minlengthMsg({ requiredLength: 5 })).toBe('Min: 5');
    }
  });
});
