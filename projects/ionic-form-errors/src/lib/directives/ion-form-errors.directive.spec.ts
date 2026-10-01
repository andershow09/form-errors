import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonFormErrorsDirective } from './ion-form-errors.directive';
import { provideIonFormErrors } from '../providers/provide-ion-form-errors';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, IonFormErrorsDirective],
  template: `
    <form [formGroup]="form">
      <input formControlName="email"
             ionFormErrors
             [errorMessages]="{ required: 'Required field', email: 'Invalid email' }" />
    </form>
  `,
})
class TestHostComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
}

describe('IonFormErrorsDirective', () => {
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
          },
          displayStrategy: 'dirty',
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  function getInputElement(): HTMLInputElement {
    return fixture.nativeElement.querySelector('input');
  }

  it('should not set error-text when control is pristine', () => {
    const input = getInputElement();
    const errorAttr = input.getAttribute('error-text');
    expect(!errorAttr || errorAttr === '').toBe(true);
  });

  it('should set error-text attribute when control is dirty and invalid', () => {
    host.form.controls.email.markAsDirty();
    host.form.controls.email.updateValueAndValidity();
    fixture.detectChanges();

    const input = getInputElement();
    const errorAttr = input.getAttribute('error-text');
    expect(errorAttr).toBe('Required field');
  });

  it('should clear error-text when control becomes valid', () => {
    host.form.controls.email.markAsDirty();
    host.form.controls.email.setValue('test@example.com');
    fixture.detectChanges();

    const input = getInputElement();
    const errorAttr = input.getAttribute('error-text');
    expect(!errorAttr || errorAttr === '').toBe(true);
  });

  it('should show email error when value is invalid email', () => {
    host.form.controls.email.markAsDirty();
    host.form.controls.email.setValue('not-an-email');
    fixture.detectChanges();

    const input = getInputElement();
    const errorAttr = input.getAttribute('error-text');
    expect(errorAttr).toBe('Invalid email');
  });

  it('should support error messages provided via [ionFormErrors] alias', () => {
    const directive = fixture.debugElement.children[0].children[0].injector.get(IonFormErrorsDirective);
    directive.ionFormErrorsAlias = { required: 'Alias required' };
    host.form.controls.email.markAsDirty();
    fixture.detectChanges();

    const input = getInputElement();
    expect(input.getAttribute('error-text')).toBe('Alias required');
  });

  it('should set errorText property directly when present on element', () => {
    const input = getInputElement();
    // Simulate Ionic web component with errorText property
    (input as unknown as { errorText: string }).errorText = '';
    host.form.controls.email.markAsDirty();
    fixture.detectChanges();

    expect((input as unknown as { errorText: string }).errorText).toBe('Required field');
  });

  it('should clean up subscription on destroy', () => {
    expect(() => fixture.destroy()).not.toThrow();
  });
});
