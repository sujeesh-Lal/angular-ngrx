import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputBoxComponent } from './components/input-box/input-box.component';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [InputBoxComponent],
  imports: [
    CommonModule,
    InputTextModule,
  ],
  exports: [InputBoxComponent]
})
export class FormElementsModule { }
