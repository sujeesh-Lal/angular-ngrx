import { createSelector } from '@ngrx/store';

import { IDemoState } from './../state';
import { IAppState } from 'src/app/shared-service/models';

const demoItems = (state: IAppState) => state.demo;

export const demoItemsList = createSelector(
    demoItems,
    (state: IDemoState) => state.items
);
