import { Action } from '@ngrx/store';

export enum ERouterActionTypes {
    Back = '[Router] Back',
    Forward = '[Router] Forward',
}

export class Back implements Action {
    public readonly type = ERouterActionTypes.Back;
    constructor(public readonly payload: any) { }
}

export class Forward implements Action {
    public readonly type = ERouterActionTypes.Forward;
    constructor(public readonly payload: any) { }
}

export type RouterActions = Back | Forward;
