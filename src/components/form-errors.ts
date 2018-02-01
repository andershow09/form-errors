import { Component, Input } from '@angular/core';

@Component({
    selector: 'form-errors',
    template: `<div 
        style="color: red;
        margin-left: 16px;
        margin-right: 16px;
        font-weight: 10px;">
        {{control.errors== null? '' :
        !control.dirty?'' :
        control.errors.required? required :
        control.errors.email? email:
        control.errors.minlength? minLength + ' ' + control.errors.minlength.actualLength + '/'+control.errors.minlength.requiredLength :
        control.errors.min? min :
        control.errors.maxlength? maxLength + ' ' + control.errors.maxlength.actualLength + '/'+control.errors.maxlength.requiredLength :
        control.errors.max? max :
        control.errors.pattern? pattern: custom}}
    </div>`
})


export class FormErrors {
    @Input('control') control: any;
    @Input('required') required: string;
    @Input('minLength') minLength: string = '';
    @Input('min') min: string = '';
    @Input('maxLength') maxLength: string = '';
    @Input('max') max: string = '';
    @Input('email') email: string = '';
    @Input('custom') custom: string = '';
    @Input('pattern') pattern: string = '';

    constructor() { }
}
@Component({
    selector: 'icon-error',
    template: `<head>
         <script defer src="https://use.fontawesome.com/releases/v5.0.6/js/all.js"></script>
        </head>
        <div style="font-size:3em; color:Tomato">
            <i class="fas fa-exclamation-circle"></i> <h2>Teste teste</h2>
        </div>`
    //<ion-icon name="warning" color="danger" item-right *ngIf="error && dirty"></ion-icon>
})

export class IconErrors {
    constructor() { }
}


