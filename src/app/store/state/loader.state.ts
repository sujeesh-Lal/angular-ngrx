export interface ILoader {
    active: number;
    actionsInProgress: any[];
}
export const initialLoaderState: ILoader = {
    active: 0,
    actionsInProgress: []
};
