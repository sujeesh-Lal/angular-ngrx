export interface IDemoState {
    items?: IdemoItem[];
}

export interface IdemoItem {
    brand?: string;
    year?: number;
    color?: string;
    vin?: string;
}

export const initialDemoState: IDemoState = {
    items: [
        { brand: 'VW', year: 2012, color: 'Orange', vin: 'dsad231ff' },
        { brand: 'Audi', year: 2011, color: 'Black', vin: 'gwregre345' },
        { brand: 'Renault', year: 2005, color: 'Gray', vin: 'h354htr' },
        { brand: 'BMW', year: 2003, color: 'Blue', vin: 'j6w54qgh' }
    ]
};
