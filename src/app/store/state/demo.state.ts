export interface IDemoState {
    // beginTillStatusFlag?: any;
    // tillSessionDetails?: ITillSessionDetails;
    items?: IdemoItem[];
}

export interface IdemoItem {
    a?: string;
    b?: string;
    c?: string;
}

export const initialDemoState: IDemoState = {
    items: [
        {
            a: 'aaa',
            b: 'bbb',
            c: 'ccc'
        },
        {
            a: 'aaa1',
            b: 'bbb1',
            c: 'ccc1'
        },
        {
            a: 'aaa2',
            b: 'bbb2',
            c: 'ccc2'
        },
        {
            a: 'aaa3',
            b: 'bbb3',
            c: 'ccc3'
        }
    ]
};
