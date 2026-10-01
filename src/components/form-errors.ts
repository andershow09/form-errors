import { Component, Input } from '@angular/core';

/**
 * Universal FormErrors component for Ionic 2, 3, 4, 5, and 6.
 *
 * Compatible with all Angular versions from 2 to 15.
 * Zero external dependencies (no ionic-angular, no ionicons, no fontawesome required).
 */
@Component({
  selector: 'form-errors',
  template: `
    <div class="form-errors-container" *ngIf="isVisible">
      <svg
        *ngIf="showIcon"
        class="form-errors-icon"
        viewBox="0 0 512 512"
        width="14"
        height="14"
        fill="currentColor">
        <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7.2 40.1S489.3 480 475.1 480H36.9c-14.3 0-27.6-7.7-34.8-20.2s-7-27.8.2-40.1l216-368C225.6 39.5 238.7 32 253 32h3zm0 128c-13.3 0-24 10.7-24 24v112c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 256a32 32 0 1 0-64 0 32 32 0 1 0 64 0z" />
      </svg>
      <span class="form-errors-text">{{ errorMessage }}</span>
    </div>
  `,
  styles: [`
    .form-errors-container {
      display: flex;
      align-items: center;
      color: var(--ion-color-danger, #f04141);
      font-size: 12px;
      margin: 4px 16px;
      line-height: 1.4;
    }
    .form-errors-icon {
      flex-shrink: 0;
      margin-right: 6px;
    }
    .form-errors-text {
      flex: 1;
    }
  `]
})
export class FormErrorsComponent {
  /**
   * The form control instance (AbstractControl) OR the control.errors object directly.
   */
  @Input('control') control: any;

  @Input('required') required: string = '';
  @Input('minLength') minLength: string = '';
  @Input('minlength') set minLengthAlias(val: string) { if (val) this.minLength = val; }
  @Input('maxLength') maxLength: string = '';
  @Input('maxlength') set maxLengthAlias(val: string) { if (val) this.maxLength = val; }
  @Input('min') min: string = '';
  @Input('max') max: string = '';
  @Input('email') email: string = '';
  @Input('pattern') pattern: string = '';
  @Input('custom') custom: string = '';
  @Input('showIcon') showIcon: boolean = true;

  constructor() {}

  get isVisible(): boolean {
    return Boolean(this.errorMessage);
  }

  get errorMessage(): string {
    const errors = this.extractErrors();
    if (!errors) {
      return '';
    }

    if (errors.required && this.required) {
      return this.required;
    }

    if (errors.email && this.email) {
      return this.email;
    }

    if (errors.minlength) {
      const actual = errors.minlength.actualLength ?? '';
      const req = errors.minlength.requiredLength ?? '';
      return this.minLength ? `${this.minLength} ${actual}/${req}`.trim() : (this.custom || '');
    }

    if (errors.maxlength) {
      const actual = errors.maxlength.actualLength ?? '';
      const req = errors.maxlength.requiredLength ?? '';
      return this.maxLength ? `${this.maxLength} ${actual}/${req}`.trim() : (this.custom || '');
    }

    if (errors.min && this.min) {
      return this.min;
    }

    if (errors.max && this.max) {
      return this.max;
    }

    if (errors.pattern && this.pattern) {
      return this.pattern;
    }

    return this.custom || '';
  }

  private extractErrors(): any {
    if (!this.control) {
      return null;
    }

    // When an AbstractControl is passed
    if (typeof this.control === 'object' && 'errors' in this.control) {
      if (!this.control.dirty && !this.control.touched) {
        return null;
      }
      return this.control.errors;
    }

    // When control.errors was passed directly
    return this.control;
  }
}

/**
 * Backward compatibility alias for the component name used in v0.0.10.
 */
export const FormErrors = FormErrorsComponent;

/**
 * Backward compatibility component stub for IconErrors (deprecated).
 */
@Component({
  selector: 'icon-error',
  template: ''
})
export class IconErrors {}
