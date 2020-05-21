import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputBoxComponent } from './components/input-box/input-box.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GpInputBoxComponent } from './components/gp-input-box/gp-input-box.component';


@NgModule({
  declarations: [InputBoxComponent, GpInputBoxComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    FormsModule,
  ],
  exports: [InputBoxComponent, GpInputBoxComponent]
})
export class FormElementsModule { }
