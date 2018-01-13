import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.css']
})
export class FormErrorsComponent implements OnInit {
  /*  @Input('control') control: any;
   @Input('required') required: string;
   @Input('minLength') minLength: string = '';
   @Input('maxLength') maxLength: string = '';
   @Input('email') email: string = '';
   @Input('custom') custom: string = '';
   @Input('pattern') pattern: string = '';
   error: string = 'teste'; */

  constructor() { }

  ngOnInit() {
    //console.log(this.control);
  }

}
