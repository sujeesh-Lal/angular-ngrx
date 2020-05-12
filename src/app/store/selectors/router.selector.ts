import { createSelector } from '@ngrx/store';

// import { IRo } from './../state';
import { IAppState, IRouterState } from 'src/app/shared-service/models';
import { RouterReducerState } from '@ngrx/router-store';

const routerObject = (state: IAppState) => state.router.state;

export const routerState = createSelector(
    routerObject,
    (state: IRouterState) => state
);
