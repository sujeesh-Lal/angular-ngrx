import { Params } from '@angular/router';

export interface IRouterState {
    url: string;
    queryParams: Params;
    params: Params;
}
