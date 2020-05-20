import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DemoComponent } from './demo/demo.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { dashboardEffects, dashboardReducers } from './store';
import { FormElementsModule } from './../form-elements/form-elements.module';


@NgModule({
  declarations: [DemoComponent],
  imports: [
    CommonModule,
    FormElementsModule,
    DashboardRoutingModule,
    StoreModule.forFeature('dashboardFeature', dashboardReducers),
    EffectsModule.forFeature(dashboardEffects)
  ]
})
export class DashboardModule { }
