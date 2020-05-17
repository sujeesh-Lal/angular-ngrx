import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromSpinner from '../reducers';
import { ILoader } from './../state';
import { IAppState } from 'src/app/shared-service/models';

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


const loaderObject = (state: IAppState) => state.loader;

export const loaderState = createSelector(
    loaderObject,
    (state: ILoader) => state
);
