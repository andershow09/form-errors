import {
  Directive,
  DoCheck,
  ElementRef,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ErrorMessages } from '../models/error-messages.interface';
import { IonFormErrorsConfig } from '../models/form-errors-config.interface';
import { ION_FORM_ERRORS_CONFIG } from '../providers/provide-ion-form-errors';
import { shouldDisplayErrors } from '../utils/display-strategy';
import { resolveErrors } from '../utils/error-mapper';

/**
 * Directive that automatically sets the `errorText` property on Ionic input components
 * (`ion-input`, `ion-textarea`, `ion-select`) based on the associated form control's
 * validation state.
 *
 * ## Features
 * - Attaches to any form element with a `formControlName` or `formControl` directive
 * - Automatically reads the `NgControl` from the host element
 * - Sets `errorText` on the native Ionic element for seamless UI integration
 * - Merges component-level messages with global defaults
 * - Standalone directive — no NgModule required
 *
 * @example
 * ```html
 * <ion-input formControlName="email"
 *            ionFormErrors
 *            [errorMessages]="{ required: 'Required', email: 'Invalid' }" />
 * ```
 */
@Directive({
  selector: '[ionFormErrors]',
  standalone: true,
})
export class IonFormErrorsDirective implements OnInit, OnChanges, DoCheck, OnDestroy {
  private readonly config: IonFormErrorsConfig = inject(ION_FORM_ERRORS_CONFIG);
  private readonly ngControl = inject(NgControl, { self: true, optional: true });
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  /**
   * Component-level error messages that override global defaults.
   */
  @Input() errorMessages: ErrorMessages = {};

  /**
   * Alias allowing binding directly to `[ionFormErrors]="messages"`.
   */
  @Input('ionFormErrors') set ionFormErrorsAlias(val: ErrorMessages | '' | null) {
    if (val && typeof val === 'object') {
      this.errorMessages = val;
    }
  }

  private statusSubscription: Subscription | null = null;

  ngOnInit(): void {
    const control = this.resolveControl();
    if (control) {
      this.subscribeToStatusChanges(control);
      this.updateErrorText(control);
    }
  }

  ngOnChanges(_changes: SimpleChanges): void {
    const control = this.resolveControl();
    if (control) {
      if (!this.statusSubscription) {
        this.subscribeToStatusChanges(control);
      }
      this.updateErrorText(control);
    }
  }

  ngDoCheck(): void {
    const control = this.resolveControl();
    if (control) {
      this.updateErrorText(control);
    }
  }

  ngOnDestroy(): void {
    this.statusSubscription?.unsubscribe();
    this.statusSubscription = null;
  }

  private resolveControl(): AbstractControl | null {
    return this.ngControl?.control ?? null;
  }

  private subscribeToStatusChanges(control: AbstractControl): void {
    this.statusSubscription?.unsubscribe();
    this.statusSubscription = control.statusChanges.subscribe(() => {
      this.updateErrorText(control);
    });
  }

  private updateErrorText(control: AbstractControl): void {
    const shouldShow = shouldDisplayErrors(control, this.config.displayStrategy);

    if (!shouldShow) {
      this.setErrorText('');
      return;
    }

    const resolved = resolveErrors(
      control.errors,
      this.errorMessages,
      this.config.defaultMessages,
      1, // Directive shows only the first error via errorText
    );

    const message = resolved.length > 0 ? resolved[0].message : '';
    this.setErrorText(message);
  }

  private setErrorText(text: string): void {
    const element = this.elementRef.nativeElement;

    // Ionic components expose `errorText` as a property on the custom element
    if ('errorText' in element) {
      (element as unknown as { errorText: string }).errorText = text;
    } else {
      // Fallback: set attribute for components that use attribute binding
      if (text) {
        this.renderer.setAttribute(element, 'error-text', text);
      } else {
        this.renderer.removeAttribute(element, 'error-text');
      }
    }
  }
}
