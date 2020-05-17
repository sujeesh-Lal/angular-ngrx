import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromSpinner from '../reducers';
import { ILoader } from './../state';

// export const getLoadingState = (state: IAppState) => state.loading;
// export const isLoadingSpinnerActive = createSelector(
// getLoadingState,
// (state: ILoader) => state.active
// );

export const getLoadingState = (state: ILoader) => state;

export const isLoadingSpinnerActiveSelector = createSelector(
    getLoadingState,
    fromSpinner.isLoadingSpinnerActive
);
