import { EDemoActionTypes, DemoActions } from './../actions';
import { IDemoState, initialDemoState } from './../state';

export function demoReducers(
    state = initialDemoState,
    action: DemoActions
): IDemoState {

    switch (action.type) {
        case EDemoActionTypes.LoadDemoItems: {
            return {
                ...state,
                ...action.payload
            };
        }
        case EDemoActionTypes.UpdateDemoItems: {
            return { ...state, items: state.items.concat(action.payload) };
        }
        default: {
            return state;
        }
    }
}
