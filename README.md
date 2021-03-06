# Ionic Form Errors
[![npm version](https://badge.fury.io/js/form-errors.svg)](https://badge.fury.io/js/form-errors)

This is a component for managing error messages within the form of Ionic pages..

## How To install

To Install it run:  `npm install form-errors`.


## Using form-errors in an Ionic 2 app

Import the module in app.modules.ts in session imports 

```typescript
import { FormErrorsModule } from 'form-errors';

  imports: [
    IonicModule.forRoot(MyApp),
    FormErrorsModule 
  ]
  ```

## Using form-errors in an Ionic 3 app

Import module into the module of the page you want to use in session imports 
  ```typescript  
  import { FormErrorsModule } from 'form-errors';

  imports: [
    IonicPageModule.forChild(LoginPage),
    FormErrorsModule
  ]
  ```


  ## How to use

  In your HTML, declare your formGroup and formControlName inside the form-item;
  Out of your ion-item use the <form-errors> tag with the desired parameters 

  Ex:

  ```html
   <form [formGroup]="formLogin" (submit)="doLogin()">
    <ion-list>

      <ion-item>
        <ion-label fixed>{{ 'EMAIL' | translate }}</ion-label>
        <ion-input type="email" [(ngModel)]="account.email" formControlName="email"></ion-input>
      </ion-item>
      <form-errors [control]="formLogin.controls.email" required="Campo obrigatório"></form-errors>
  ```

  In your .ts, declare and initialize your formGroup by validating the fields according to rules applicable to each field;

  Ex:

  ```typescript
     this.formLogin = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$")], //Letters And numbers min 8 characters
    })
  ```
  
### Sample:
![alt text](https://github.com/andershow09/form-erorrs/blob/master/samples/sample.jpg)
  
Enjoy

## Available parameters 

##### [control] (required) - is the formControlName inside the FormGroup control;
##### requided             - Mandatory field message;
##### email                - Email validation;
##### min                  - Validation of minimum value of the input (number);
##### max                  - Validation of maximum value of the input (number);
##### minLength            - Validation of minimum input character size;
##### maxLength            - Validation of maximum input character size;
##### maxLength            - Validation of maximum input character size;
##### pattern              - Validation of regex defined in formGroup;
##### custom               - Custom error message;

# License
[![GitHub license](https://img.shields.io/github/license/andershow09/form-errors.svg)](https://github.com/andershow09/form-errors/blob/master/LICENSE)
  

