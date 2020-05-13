import { IDashboardState } from './../../../shared-service/models';
import { initialDemoState } from './demo.state';

export * from './demo.state';

export const DashboardState: IDashboardState = {
    demo: initialDemoState
};
