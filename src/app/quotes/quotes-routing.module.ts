import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BenefitMinMaxComponent } from './containers/benefit-min-max/benefit-min-max.component';



const routes: Routes = [
  { path: 'benefit', component: BenefitMinMaxComponent },
  {
    path: '',
    redirectTo: '/benefit',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotesRoutingModule { }
