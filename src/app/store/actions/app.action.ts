import { Action } from '@ngrx/store';

export enum EAppActionTypes {
    ReloadAppState = '[App] Reload App State',
}

export class ReloadAppState implements Action {
    public readonly type = EAppActionTypes.ReloadAppState;
    constructor(public readonly payload: any) { }
}

export type AppActions = ReloadAppState;
