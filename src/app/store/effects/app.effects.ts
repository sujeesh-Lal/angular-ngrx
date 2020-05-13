import { Injectable } from '@angular/core';
import { Actions, createEffect, OnRunEffects, EffectNotification, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { exhaustMap, takeUntil, switchMap, map, mergeMap, catchError } from 'rxjs/operators';
import { MockService } from './../../shared-service/services/mock.services';
import { EAppActionTypes, LoadDemoItems, FetchDataSuccess, FetchDataError } from './../actions/index';
import { Mock } from 'protractor/built/driverProviders';


@Injectable()
export class AppEffects {

  constructor(private actions$: Actions, private mockService: MockService) { }

  // @Effect()
  // fetchData$ = this.actions$
  //   .pipe(
  //     ofType(EAppActionTypes.FetchData),
  //     switchMap((action: any) => {
  //       return this.mockService.getBulkData(1, 100, true);
  //     })
  //     , map((data: any) => {
  //       // console.log(data);
  //       return new ConfigLoaded(data);
  //     }));

  @Effect()
  fetchData$ = this.actions$
    .pipe(
      ofType(EAppActionTypes.FetchData),
      mergeMap((action: any) => {
        return this.mockService.getJSON().pipe(
          mergeMap((data: any) => {
            return [
              new FetchDataSuccess(data),
            ];
          }),
          catchError((error: any) => {
            return [new FetchDataError(error)];
          })
        );
      }),
    );

}

