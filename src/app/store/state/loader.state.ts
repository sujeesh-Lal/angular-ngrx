export interface ILoader {
    active: number;
    actionsInProgress: any[];
    message?: string;
}
export const initialLoaderState: ILoader = {
    active: 0,
    actionsInProgress: []
};
