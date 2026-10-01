import { AbstractControl } from '@angular/forms';
import { DisplayStrategy } from '../models/error-messages.interface';

/**
 * Determines whether validation errors should be visible to the user
 * based on the configured display strategy and the control's current state.
 *
 * @param control - The form control to evaluate.
 * @param strategy - The display strategy governing visibility.
 * @returns `true` if errors should be displayed, `false` otherwise.
 */
export function shouldDisplayErrors(
  control: AbstractControl,
  strategy: DisplayStrategy,
): boolean {
  if (!control.errors) {
    return false;
  }

  switch (strategy) {
    case 'immediate':
      return true;
    case 'dirty':
      return control.dirty;
    case 'touched':
      return control.touched;
    case 'dirtyOrTouched':
      return control.dirty || control.touched;
  }
}
