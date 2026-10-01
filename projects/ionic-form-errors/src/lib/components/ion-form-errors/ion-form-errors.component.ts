import {
  Component,
  DestroyRef,
  DoCheck,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ErrorMessages, ResolvedError } from '../../models/error-messages.interface';
import { IonFormErrorsConfig } from '../../models/form-errors-config.interface';
import { ION_FORM_ERRORS_CONFIG } from '../../providers/provide-ion-form-errors';
import { shouldDisplayErrors } from '../../utils/display-strategy';
import { resolveErrors } from '../../utils/error-mapper';

/**
 * Displays validation error messages for an Angular Reactive Forms control.
 *
 * Integrates visually with Ionic's design system using danger-colored text
 * and an optional warning icon.
 *
 * ## Features
 * - Accepts an `AbstractControl` and automatically resolves error messages
 * - Supports both static string messages and dynamic functions
 * - Merges component-level messages with global defaults
 * - Configurable display strategy (dirty, touched, immediate)
 * - Configurable max number of errors to display
 * - Standalone component — no NgModule required
 *
 * @example
 * ```html
 * <ion-input formControlName="email" />
 * <ion-form-errors
 *   [control]="form.controls.email"
 *   [messages]="{ required: 'Required', email: 'Invalid email' }" />
 * ```
 */
@Component({
  selector: 'ion-form-errors',
  standalone: true,
  template: `
    @if (visible) {
      @for (error of activeErrors; track error.key) {
        <div class="ion-form-errors__message" role="alert">
          <svg
            class="ion-form-errors__icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            aria-hidden="true"
            width="14"
            height="14">
            <path
              fill="currentColor"
              d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7.2 40.1S489.3 480
                475.1 480H36.9c-14.3 0-27.6-7.7-34.8-20.2s-7-27.8.2-40.1l216-368C225.6
                39.5 238.7 32 253 32h3zm0 128c-13.3 0-24 10.7-24 24v112c0 13.3 10.7 24 24
                24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 256a32 32 0 1 0-64 0 32 32
                0 1 0 64 0z" />
          </svg>
          <span class="ion-form-errors__text">{{ error.message }}</span>
        </div>
      }
    }
  `,
  styles: [`
    :host {
      display: block;
    }

    .ion-form-errors__message {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px 16px;
      color: var(--ion-color-danger, #eb445a);
      font-size: 12px;
      line-height: 1.4;
      animation: ionFormErrorsFadeIn 200ms ease-out;
    }

    .ion-form-errors__icon {
      flex-shrink: 0;
    }

    .ion-form-errors__text {
      flex: 1;
    }

    @keyframes ionFormErrorsFadeIn {
      from {
        opacity: 0;
        transform: translateY(-4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `],
})
export class IonFormErrorsComponent implements OnChanges, DoCheck, OnDestroy {
  private readonly config: IonFormErrorsConfig = inject(ION_FORM_ERRORS_CONFIG);
  private readonly destroyRef = inject(DestroyRef);
  private statusSubscription: Subscription | null = null;

  /** The form control to observe for validation errors. */
  @Input() control: AbstractControl | null = null;

  /**
   * Component-level error messages that override global defaults.
   * Keys must match Angular validator names (e.g. 'required', 'minlength').
   */
  @Input() messages: ErrorMessages = {};

  /**
   * Maximum number of errors to display.
   * When not provided, falls back to the global config value.
   */
  @Input() maxErrors: number | undefined = undefined;

  /** Whether any errors should be visible based on the display strategy. */
  visible = false;

  /** The list of resolved error messages currently active on the control. */
  activeErrors: ResolvedError[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['control']) {
      this.unsubscribe();
      if (this.control) {
        this.subscribeToStatusChanges(this.control);
      }
    }
    this.updateState();
  }

  ngDoCheck(): void {
    this.updateState();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  private subscribeToStatusChanges(control: AbstractControl): void {
    this.statusSubscription = control.statusChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updateState());
  }

  private unsubscribe(): void {
    this.statusSubscription?.unsubscribe();
    this.statusSubscription = null;
  }

  private updateState(): void {
    if (!this.control) {
      this.visible = false;
      this.activeErrors = [];
      return;
    }

    this.visible = shouldDisplayErrors(this.control, this.config.displayStrategy);

    if (this.visible) {
      const max = this.maxErrors ?? this.config.maxErrors;
      this.activeErrors = resolveErrors(
        this.control.errors,
        this.messages,
        this.config.defaultMessages,
        max,
      );
    } else {
      this.activeErrors = [];
    }
  }
}
