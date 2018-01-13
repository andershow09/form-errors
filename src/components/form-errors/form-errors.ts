import { Component, Input, NgModule } from '@angular/core';

@Component({
  selector: 'form-errors',
  templateUrl: 'form-errors.html'
})
@NgModule({
  declarations: [FormErrorsComponent],
  imports: [],
  exports: [FormErrorsComponent]
})
export class FormErrorsComponent {

  @Input('control') control: any;
  @Input('required') required: string;
  @Input('minLength') minLength: string = '';
  @Input('maxLength') maxLength: string = '';
  @Input('email') email: string = '';
  @Input('custom') custom: string = '';
  @Input('pattern') pattern: string = '';
  error: string = 'teste';

  constructor() {
    console.log('Hello FormErrorsComponent Component');

  }
  ngAfterViewInit() {
    console.log(this.control);
  }
}
