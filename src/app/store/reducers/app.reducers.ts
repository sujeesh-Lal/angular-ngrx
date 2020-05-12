import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';


// export interface State {

// }

// export const reducers: ActionReducerMap<State> = {

// };


// export const metaReducers: MetaReducer<State>[] = !environment.production ? [debug] : [];



import { routerReducer } from '@ngrx/router-store';
import { IAppState } from './../../shared-service/models';
import { EAppActionTypes } from './../actions';

export const appReducers: ActionReducerMap<IAppState, any> = {
    router: routerReducer,
};

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action) => {
        console.log(state);
        return reducer(state, action);
    };
}



export function reloadStateMeta(reducer: ActionReducer<any>): ActionReducer<any> {
    return (state, action: any) => {

        function reloadAppState() {
            return { ...state, ...action.payload };
        }

        if (action.type === EAppActionTypes.ReloadAppState) {
            return reloadAppState();
        } else {
            return reducer(state, action);
        }
    };
}

export const metaReducers: MetaReducer<IAppState>[] = !environment.production ? [debug] : [];

