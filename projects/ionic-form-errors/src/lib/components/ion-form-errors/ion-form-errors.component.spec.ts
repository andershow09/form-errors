import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonFormErrorsComponent } from './ion-form-errors.component';
import { provideIonFormErrors } from '../../providers/provide-ion-form-errors';

@Component({
  standalone: true,
  imports: [IonFormErrorsComponent, ReactiveFormsModule],
  template: `
    <ion-form-errors
      [control]="control"
      [messages]="messages"
      [maxErrors]="maxErrors" />
  `,
})
class TestHostComponent {
  control = new FormControl('', [Validators.required, Validators.email, Validators.minLength(3)]);
  messages: Record<string, string | ((p: Record<string, unknown>) => string)> = {
    required: 'Campo obrigatório',
    email: 'E-mail inválido',
  };
  maxErrors: number | undefined = undefined;
}

/**
 * Helper: marks a control dirty and triggers statusChanges + change detection.
 */
function markDirtyAndDetect(
  control: FormControl,
  fixture: ComponentFixture<TestHostComponent>,
): void {
  control.markAsDirty();
  control.updateValueAndValidity(); // Triggers statusChanges observable
  fixture.detectChanges();
}

describe('IonFormErrorsComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        provideIonFormErrors({
          defaultMessages: {
            required: 'Default required',
            email: 'Default email',
            minlength: ({ requiredLength }) => `Default min ${requiredLength}`,
          },
          displayStrategy: 'dirty',
          maxErrors: 1,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges(); // Initial render + ngOnInit
  });

  it('should not display errors when control is pristine (dirty strategy)', () => {
    const messages = fixture.nativeElement.querySelectorAll('.ion-form-errors__message');
    expect(messages.length).toBe(0);
  });

  it('should display errors when control is dirty and invalid', () => {
    markDirtyAndDetect(host.control, fixture);

    const messages = fixture.nativeElement.querySelectorAll('.ion-form-errors__message');
    expect(messages.length).toBeGreaterThan(0);
  });

  it('should use component-level messages over global defaults', () => {
    markDirtyAndDetect(host.control, fixture);

    const text = fixture.nativeElement.querySelector('.ion-form-errors__text');
    expect(text?.textContent?.trim()).toBe('Campo obrigatório');
  });

  it('should fall back to global message when component message is missing', () => {
    host.messages = {};
    fixture.detectChanges(); // Propagate messages change
    markDirtyAndDetect(host.control, fixture);

    const text = fixture.nativeElement.querySelector('.ion-form-errors__text');
    expect(text?.textContent?.trim()).toBe('Default required');
  });

  it('should respect maxErrors from component input', () => {
    host.maxErrors = 3;
    host.control.markAsDirty();
    host.control.setErrors({
      required: true,
      email: true,
      minlength: { requiredLength: 3, actualLength: 1 },
    });
    fixture.detectChanges();

    const messages = fixture.nativeElement.querySelectorAll('.ion-form-errors__message');
    expect(messages.length).toBe(3);
  });

  it('should respect maxErrors from global config when not overridden', () => {
    host.control.markAsDirty();
    host.control.setErrors({
      required: true,
      email: true,
      minlength: { requiredLength: 3, actualLength: 1 },
    });
    fixture.detectChanges();

    const messages = fixture.nativeElement.querySelectorAll('.ion-form-errors__message');
    // Global config has maxErrors = 1
    expect(messages.length).toBe(1);
  });

  it('should hide errors when control becomes valid', () => {
    host.control.markAsDirty();
    host.control.setValue('test@test.com');
    fixture.detectChanges();

    const messages = fixture.nativeElement.querySelectorAll('.ion-form-errors__message');
    expect(messages.length).toBe(0);
  });

  it('should include a warning icon SVG in each error message', () => {
    markDirtyAndDetect(host.control, fixture);

    const icon = fixture.nativeElement.querySelector('.ion-form-errors__icon');
    expect(icon).toBeTruthy();
    expect(icon.tagName.toLowerCase()).toBe('svg');
  });

  it('should set role="alert" on error messages for accessibility', () => {
    markDirtyAndDetect(host.control, fixture);

    const message = fixture.nativeElement.querySelector('.ion-form-errors__message');
    expect(message?.getAttribute('role')).toBe('alert');
  });

  it('should render nothing when control has no errors', () => {
    host.control = new FormControl('valid@email.com', [Validators.email]);
    fixture.detectChanges(); // Re-bind the new control
    host.control.markAsDirty();
    host.control.updateValueAndValidity();
    fixture.detectChanges();

    const messages = fixture.nativeElement.querySelectorAll('.ion-form-errors__message');
    expect(messages.length).toBe(0);
  });
});

describe('IonFormErrorsComponent with immediate strategy', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        provideIonFormErrors({
          displayStrategy: 'immediate',
          maxErrors: 1,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should display errors immediately without marking as dirty', () => {
    const messages = fixture.nativeElement.querySelectorAll('.ion-form-errors__message');
    expect(messages.length).toBeGreaterThan(0);
  });
});
