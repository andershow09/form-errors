# ionic-form-errors

[![npm version](https://badge.fury.io/js/%40AShows%2Fionic-form-errors.svg)](https://www.npmjs.com/package/@AShows/ionic-form-errors)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A modern Angular library for displaying reactive form validation errors in Ionic applications.

**Standalone components** · **Angular Signals** · **Zero dependencies** · **Ionic 7/8 integration**

---

## ✨ Features

- 🚀 **Standalone** — No `NgModule` required. Import and use directly.
- ⚡ **Angular Signals** — Reactive error resolution using `input()`, `computed()`.
- 🎨 **Ionic Design** — Integrates with `--ion-color-danger` and Ionic's `errorText` API.
- 🌍 **i18n Ready** — Messages can be static strings or dynamic functions.
- 🎯 **Flexible Display** — Configure when errors appear: `dirty`, `touched`, `dirtyOrTouched`, or `immediate`.
- 📦 **Two APIs** — Use `<ion-form-errors>` component or `ionFormErrors` directive.
- ⚙️ **Global Config** — Set default messages once with `provideIonFormErrors()`.

---

## 📋 Compatibility

| Technology | Supported Versions |
|---|---|
| Angular | 17, 18, 19+ |
| Ionic | 7, 8+ |
| TypeScript | 5.2+ |
| RxJS | 7.8+ |

---

## 📦 Installation

```bash
npm install @AShows/ionic-form-errors
```

---

## 🚀 Quick Start

### 1. Configure globally (optional)

```typescript
// app.config.ts
import { provideIonFormErrors } from '@AShows/ionic-form-errors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideIonFormErrors({
      defaultMessages: {
        required: 'This field is required',
        email: 'Please enter a valid email',
        minlength: ({ requiredLength }) => `At least ${requiredLength} characters`,
        maxlength: ({ requiredLength }) => `Maximum ${requiredLength} characters`,
      },
      displayStrategy: 'dirty',
      maxErrors: 1,
    }),
  ],
};
```

### 2. Use the Component

```typescript
import { IonFormErrorsComponent } from '@AShows/ionic-form-errors';

@Component({
  imports: [ReactiveFormsModule, IonFormErrorsComponent, IonInput, IonItem],
  template: `
    <ion-item>
      <ion-input formControlName="email" label="Email" type="email" />
    </ion-item>
    <ion-form-errors
      [control]="form.controls.email"
      [messages]="{ required: 'Email is required', email: 'Invalid email' }" />
  `,
})
export class MyFormComponent {
  form = inject(FormBuilder).group({
    email: ['', [Validators.required, Validators.email]],
  });
}
```

### 3. Or Use the Directive

```typescript
import { IonFormErrorsDirective } from '@AShows/ionic-form-errors';

@Component({
  imports: [ReactiveFormsModule, IonFormErrorsDirective, IonInput, IonItem],
  template: `
    <ion-item>
      <ion-input formControlName="email"
                 label="Email"
                 type="email"
                 ionFormErrors
                 [errorMessages]="{ required: 'Required', email: 'Invalid' }" />
    </ion-item>
  `,
})
export class MyFormComponent { }
```

---

## 📖 API Reference

### `<ion-form-errors>` Component

| Input | Type | Default | Description |
|---|---|---|---|
| `control` | `AbstractControl` | *required* | The form control to observe |
| `messages` | `ErrorMessages` | `{}` | Component-level error messages (overrides global) |
| `maxErrors` | `number` | global config | Max number of errors to display |

### `[ionFormErrors]` Directive

| Input | Type | Default | Description |
|---|---|---|---|
| `errorMessages` | `ErrorMessages` | `{}` | Error messages (overrides global) |

### `provideIonFormErrors(config)` Provider

| Property | Type | Default | Description |
|---|---|---|---|
| `defaultMessages` | `ErrorMessages` | Built-in English | Global default messages |
| `displayStrategy` | `DisplayStrategy` | `'dirty'` | When to show errors |
| `maxErrors` | `number` | `1` | Default max errors |

### `ErrorMessages` Interface

```typescript
interface ErrorMessages {
  required?: string | ((params: Record<string, unknown>) => string);
  minlength?: string | ((params: Record<string, unknown>) => string);
  maxlength?: string | ((params: Record<string, unknown>) => string);
  email?: string | ((params: Record<string, unknown>) => string);
  pattern?: string | ((params: Record<string, unknown>) => string);
  min?: string | ((params: Record<string, unknown>) => string);
  max?: string | ((params: Record<string, unknown>) => string);
  [key: string]: string | ((params: Record<string, unknown>) => string) | undefined;
}
```

### `DisplayStrategy` Type

| Value | Errors shown when... |
|---|---|
| `'dirty'` | Field value has been changed |
| `'touched'` | Field has been blurred (lost focus) |
| `'dirtyOrTouched'` | Either dirty or touched |
| `'immediate'` | Immediately, regardless of interaction |

---

## 🔄 Migration from `form-errors` v1.x

The legacy `form-errors` package for Ionic 2/3 is **no longer maintained**. This package is a complete rewrite:

| v1 (Legacy) | v2 (This Package) |
|---|---|
| `ionic-angular` | `@ionic/angular` 7/8 |
| Angular 5 | Angular 17-19+ |
| NgModule | Standalone |
| `@Input() control: any` | `input.required<AbstractControl>()` |
| Template ternary chain | Computed Signals + `@for` |
| No global config | `provideIonFormErrors()` |
| No tests | 80%+ coverage with Vitest |

---

## 📄 License

[MIT](LICENSE) © Anderson Pereira
