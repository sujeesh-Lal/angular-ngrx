import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotesRoutingModule } from './quotes-routing.module';
import { BenefitMinMaxComponent } from './containers/benefit-min-max/benefit-min-max.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { KeyFilterModule } from 'primeng/keyfilter';

import { InputMaskModule } from 'primeng/inputmask';

@NgModule({
  declarations: [BenefitMinMaxComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputNumberModule,
    InputTextModule,
    InputMaskModule,
    KeyFilterModule,
    QuotesRoutingModule
  ]
})
export class QuotesModule { }
