import { RouterReducerState } from '@ngrx/router-store';
import { IRouterState } from './router-state.model';

export interface IAppState {
    router?: RouterReducerState<IRouterState>;
}
