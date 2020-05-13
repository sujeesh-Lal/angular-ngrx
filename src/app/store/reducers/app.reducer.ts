import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
// import { demoReducers } from './demo.reducer';
import * as fromRouter from '@ngrx/router-store';

import { dashboardReducers } from './../../dashboard/store';

import { routerReducer } from '@ngrx/router-store';
import { IAppState, IRouterState } from './../../shared-service/models';
import { EAppActionTypes } from './../actions';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

export const appReducers: ActionReducerMap<IAppState, any> = {
    router: routerReducer,
    // demo: demoReducers
};

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action) => {
        // console.log(state);
        return reducer(state, action);
    };
}

export function reloadStateMeta(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action: any) => {

        function reloadAppState() {
            return { ...state, ...action.payload };
        }

        switch (action.type) {
            case EAppActionTypes.ReloadAppState:
                {
                    state = reloadAppState();
                    return reducer(state, action);
                }
            default: {
                return reducer(state, action);
            }
        }
    };
}

console.log(environment.production);

export const metaReducers = !environment.production ? [debug, reloadStateMeta] : [reloadStateMeta];


