import { IAppState, IRouterState } from './../../shared-service/models';
import { initialDemoState, IDemoState } from './demo.state';
import { RouterReducerState } from '@ngrx/router-store';

export const InitAppRouteState: IRouterState = {
    url: '/',
    params: {},
    queryParams: {},
};

export const InitAppRouteReducerState: RouterReducerState<IRouterState> = {
    state: InitAppRouteState,
    navigationId: 0
};

export const AppState: IAppState = {
    router: InitAppRouteReducerState,
    demo: initialDemoState
};

export function getInitialAppState() {
    return AppState;
}
