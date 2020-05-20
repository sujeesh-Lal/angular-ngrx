import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { appReducers, reloadStateMeta, CustomSerializer, debug, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/effects/app.effects';
import { getInitialAppState } from './store/state/app.state';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { MockService } from './shared-service/services/mock.services';
import { HttpClientModule } from '@angular/common/http';
import { SharedServiceModule } from './shared-service/shared-service.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedServiceModule,
    StoreModule.forRoot(appReducers, {
      metaReducers,
      initialState: getInitialAppState,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    StoreRouterConnectingModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(AppEffects)
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    MockService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
