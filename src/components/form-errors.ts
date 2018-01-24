import { Component, Input } from '@angular/core';

@Component({
    selector: 'form-errros',
    template: `<div 
    style="color: red;
    margin-left: 16px;
    margin-right: 16px;
    font-weight: 10px;">
    {{control== null? '':control.required? required : control.email? email: control.minlength? minLength + ' ' + control.minlength.actualLength
  + '/'+control.minlength.requiredLength : control.maxlength? maxLength + ' ' + control.maxlength.actualLength + '/'+control.maxlength.requiredLength:
  control.pattern? pattern: custom}}
 </div>`
})
export class FormErrors {
    @Input('control') control: any;
    @Input('required') required: string;
    @Input('minLength') minLength: string = '';
    @Input('maxLength') maxLength: string = '';
    @Input('email') email: string = '';
    @Input('custom') custom: string = '';
    @Input('pattern') pattern: string = '';
    constructor() { }
}


