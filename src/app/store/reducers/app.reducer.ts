import {
    ActionReducer,
    ActionReducerMap,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';

import { routerReducer } from '@ngrx/router-store';
import { IAppState } from './../../shared-service/models';
import { EAppActionTypes } from './../actions';

export const appReducers: ActionReducerMap<IAppState, any> = {
    router: routerReducer,
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


