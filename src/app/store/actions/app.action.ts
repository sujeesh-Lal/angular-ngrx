import { Action } from '@ngrx/store';

export enum EAppActionTypes {
    ReloadAppState = '[App] Reload App State',
    FetchData = '[App] Fetch App Data',
    FetchDataSuccess = '[App] Fetch App Success',
    FetchDataError = '[App] Fetch App Error',
}

export class ReloadAppState implements Action {
    public readonly type = EAppActionTypes.ReloadAppState;
    constructor(public readonly payload: any) { }
}

export class FetchData implements Action {
    public readonly type = EAppActionTypes.FetchData;
}

export class FetchDataSuccess implements Action {
    public readonly type = EAppActionTypes.FetchDataSuccess;
    constructor(public readonly payload: any) { }
}

export class FetchDataError implements Action {
    public readonly type = EAppActionTypes.FetchDataError;
    constructor(public readonly payload: any) { }
}

export type AppActions = ReloadAppState | FetchData | FetchDataSuccess | FetchDataError;
