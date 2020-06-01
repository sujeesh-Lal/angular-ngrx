import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotesRoutingModule } from './quotes-routing.module';
import { BenefitMinMaxComponent } from './containers/benefit-min-max/benefit-min-max.component';


@NgModule({
  declarations: [BenefitMinMaxComponent],
  imports: [
    CommonModule,
    QuotesRoutingModule
  ]
})
export class QuotesModule { }
