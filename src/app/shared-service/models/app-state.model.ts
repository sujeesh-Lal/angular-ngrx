import { RouterReducerState } from '@ngrx/router-store';
import { IRouterState } from './router-state.model';
import { ILoader } from 'src/app/store';
// import { IDemoState } from './../../store/state';

export interface IAppState {
    router?: RouterReducerState<IRouterState>;
    loader?: ILoader;
}
