
import * as fromRouter from '@ngrx/router-store';

import { IRouterState } from './../../shared-service/models';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';


export class CustomSerializer implements fromRouter.RouterStateSerializer<IRouterState> {

    serialize(routerState: RouterStateSnapshot): IRouterState {
        const { url } = routerState;
        const { queryParams } = routerState.root;
        let state: ActivatedRouteSnapshot = routerState.root;

        while (state.firstChild) {
            state = state.firstChild;
        }
        const { params } = state;
        return { url, queryParams, params };
    }

}
