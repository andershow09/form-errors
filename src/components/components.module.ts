import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormErrorsComponent } from './form-errors/form-errors';
@NgModule({
	declarations: [FormErrorsComponent],
	imports: [CommonModule,
		IonicModule.forRoot(FormErrorsComponent),],
	exports: [FormErrorsComponent]
})
export class ComponentsModule { }
