import { EDemoActionTypes, DemoActions } from './../actions';
import { IDemoState, initialDemoState } from './../state';

export function demoReducers(
    state = initialDemoState,
    action: DemoActions
): IDemoState {

    switch (action.type) {
        case EDemoActionTypes.FetchDataError: {
            return {
                ...state,
                ...action.payload
            };
        }
        case EDemoActionTypes.FetchDataSuccess: {
            return { ...state, items: action.payload.items };
        }
        default: {
            return state;
        }
    }
}


export interface IDashboard {
    demo?: IDemoState;
}
