import * as fromDashboardDemoReducer from './demo.reducer';
import { ActionReducerMap, createFeatureSelector, ActionReducer } from '@ngrx/store';
import { IDashboardState } from 'src/app/shared-service/models';

export const dashboardReducers: ActionReducerMap<IDashboardState, any> = {
    demo: fromDashboardDemoReducer.demoReducers
};

export * from './demo.reducer';

export const getDashboardState = createFeatureSelector<IDashboardState>('dashboardFeature');
