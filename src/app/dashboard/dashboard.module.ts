import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DemoComponent } from './demo/demo.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { dashboardEffects, dashboardReducers } from './store';
import { FormElementsModule } from './../form-elements/form-elements.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeThemeComponent } from './prime-theme/prime-theme.component';
import { InputTextModule } from 'primeng/inputtext';
import { SwitchComponent } from './switch/switch.component';
import { HomeComponent } from './home/home.component';
import { RatingComponent } from './rating/rating.component';

@NgModule({
  declarations: [DemoComponent, PrimeThemeComponent, SwitchComponent, HomeComponent, RatingComponent],
  imports: [
    CommonModule,
    FormElementsModule,
    ReactiveFormsModule,
    InputTextModule,
    FormsModule,
    DashboardRoutingModule,
    StoreModule.forFeature('dashboardFeature', dashboardReducers),
    EffectsModule.forFeature(dashboardEffects)
  ]
})
export class DashboardModule { }
