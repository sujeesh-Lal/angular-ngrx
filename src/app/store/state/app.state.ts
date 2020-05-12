import { IAppState, IRouterState } from './../../shared-service/models';
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
};

export function getInitialAppState() {
    return AppState;
}
