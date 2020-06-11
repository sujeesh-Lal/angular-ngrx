import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputBoxComponent } from './components/input-box/input-box.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GpInputBoxComponent } from './components/gp-input-box/gp-input-box.component';
import { DynamicFormBuilder } from './dynamic-form-builder/dynamic-form-builder';
import { GpSelectButtonsComponent } from './components/gp-select-buttons/gp-select-buttons.component';


@NgModule({
  declarations: [InputBoxComponent, GpInputBoxComponent, DynamicFormBuilder, GpSelectButtonsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    FormsModule,
  ],
  exports: [InputBoxComponent, GpInputBoxComponent, GpSelectButtonsComponent, DynamicFormBuilder]
})
export class FormElementsModule { }
