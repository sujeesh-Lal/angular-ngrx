import { Action } from '@ngrx/store';
import { ShowLoader, HideLoader } from './../../../shared-service/decorators';

export enum EDemoActionTypes {
    FetchData = '[Demo] Fetch App Data',
    FetchDataSuccess = '[Demo] Fetch App Success',
    FetchDataError = '[Demo] Fetch App Error',
}

@ShowLoader()
export class FetchData implements Action {
    public readonly type = EDemoActionTypes.FetchData;
}

@HideLoader(EDemoActionTypes.FetchData)
export class FetchDataSuccess implements Action {
    public readonly type = EDemoActionTypes.FetchDataSuccess;
    constructor(public readonly payload: any) { }
}

@HideLoader(EDemoActionTypes.FetchData)
export class FetchDataError implements Action {
    public readonly type = EDemoActionTypes.FetchDataError;
    constructor(public readonly payload: any) { }
}

export type DemoActions = FetchData | FetchDataError | FetchDataSuccess;
