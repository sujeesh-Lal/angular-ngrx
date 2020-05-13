import { createSelector } from '@ngrx/store';

import { IDemoState } from './../state';
import * as fromFeature from './../reducers';
import { IDashboardState } from 'src/app/shared-service/models';

const demoItems = (state: IDashboardState) => state.demo;

export const demoItemsList = createSelector(
    fromFeature.getDashboardState,
    (state: IDashboardState) => state.demo.items
);
