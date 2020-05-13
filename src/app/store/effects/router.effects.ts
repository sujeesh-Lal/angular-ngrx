import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ERouterActionTypes } from './../actions/index';


@Injectable()
export class RouterEffects {

    constructor(private actions$: Actions, private location: Location) { }

    @Effect({ dispatch: false })
    navigateBack$ = this.actions$
        .pipe(
            ofType(ERouterActionTypes.Back),
            pipe(
                tap(() => {
                    this.location.back();
                })
            ),
        );

    @Effect({ dispatch: false })
    navigateForward$ = this.actions$
        .pipe(
            ofType(ERouterActionTypes.Forward),
            pipe(
                tap(() => {
                    this.location.forward();
                })
            ),
        );
}

