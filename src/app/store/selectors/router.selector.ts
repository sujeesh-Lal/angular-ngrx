import { createSelector } from '@ngrx/store';

import { IAppState, IRouterState } from 'src/app/shared-service/models';

const routerObject = (state: IAppState) => state.router.state;

export const routerState = createSelector(
    routerObject,
    (state: IRouterState) => state
);
