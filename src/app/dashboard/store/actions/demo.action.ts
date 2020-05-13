import { Action } from '@ngrx/store';

export enum EDemoActionTypes {
    FetchData = '[Demo] Fetch App Data',
    FetchDataSuccess = '[Demo] Fetch App Success',
    FetchDataError = '[Demo] Fetch App Error',
}

export class FetchData implements Action {
    public readonly type = EDemoActionTypes.FetchData;
}

export class FetchDataSuccess implements Action {
    public readonly type = EDemoActionTypes.FetchDataSuccess;
    constructor(public readonly payload: any) { }
}

export class FetchDataError implements Action {
    public readonly type = EDemoActionTypes.FetchDataError;
    constructor(public readonly payload: any) { }
}

export type DemoActions = FetchData | FetchDataError | FetchDataSuccess;
