import { RouterReducerState } from '@ngrx/router-store';
import { IRouterState } from './router-state.model';
import { IDemoState } from './../../store/state';

export interface IAppState {
    router?: RouterReducerState<IRouterState>;
    demo?: IDemoState;
}
