import { Action } from '@ngrx/store';

export enum EDemoActionTypes {
    LoadDemoItems = '[Demo] Load Data',
    UpdateDemoItems = '[Demo] Update Data',
}

export class LoadDemoItems implements Action {
    public readonly type = EDemoActionTypes.LoadDemoItems;
    constructor(public readonly payload: any) { }
}

export class UpdateDemoItems implements Action {
    public readonly type = EDemoActionTypes.UpdateDemoItems;
    constructor(public readonly payload: any) { }
}

export type DemoActions = LoadDemoItems | UpdateDemoItems;
