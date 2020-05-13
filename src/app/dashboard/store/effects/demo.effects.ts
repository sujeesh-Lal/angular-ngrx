import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { OnRunEffects, EffectNotification, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { exhaustMap, takeUntil, switchMap, map, mergeMap, catchError } from 'rxjs/operators';
import { MockService } from './../../../shared-service/services/mock.services';
import { FetchDataSuccess, FetchDataError, EDemoActionTypes } from './../actions/index';
import { Mock } from 'protractor/built/driverProviders';


@Injectable()
export class DemoEffects {

    constructor(private actions$: Actions, private mockService: MockService) { }

    @Effect()
    fetchData$ = this.actions$
        .pipe(
            ofType(EDemoActionTypes.FetchData),
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
