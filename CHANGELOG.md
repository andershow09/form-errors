# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-09-30

### Added
- `IonFormErrorsComponent` — Standalone component for displaying form validation errors
- `IonFormErrorsDirective` — Directive for inline error display via Ionic's `errorText` API
- `provideIonFormErrors()` — Global configuration provider with default messages
- `ErrorMessages` interface supporting both static strings and dynamic functions
- `DisplayStrategy` type for controlling error visibility (`dirty`, `touched`, `dirtyOrTouched`, `immediate`)
- Unit tests with Vitest and 80%+ coverage thresholds
- Full documentation with API reference and migration guide

### Changed
- Complete rewrite from scratch — no code from v1 was reused
- Angular 17-19+ support (was Angular 5)
- Ionic 7/8 support (was Ionic 2/3)
- Standalone components (was NgModule-based)
- Angular Signals (was imperative)
- TypeScript strict mode (was `any`-typed)

### Removed
- `FormErrorsModule` (NgModule) — replaced by Standalone imports
- `ionic-angular` dependency — replaced by `@ionic/angular`
- `font-awesome` dependency — uses inline SVG icon
- `IonicModule.forRoot()` circular reference
