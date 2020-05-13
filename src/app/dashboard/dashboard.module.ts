import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DemoComponent } from './demo/demo.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { dashboardEffects, dashboardReducers } from './store';


@NgModule({
  declarations: [DemoComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    StoreModule.forFeature('dashboardFeature', dashboardReducers),
    EffectsModule.forFeature(dashboardEffects)
  ]
})
export class DashboardModule { }
