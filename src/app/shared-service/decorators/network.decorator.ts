import { Injector } from '@angular/core';
// import { ModalService } from 'src/app/core/services/component-services/modal.service';

export let AppInjector: Injector;

export function setAppInjector(injector: Injector) {
    if (AppInjector) {
        // Should not happen
        console.error('Programming error: AppInjector was already set');
    } else {
        AppInjector = injector;
    }
}

export function Network(): MethodDecorator {
    return (target: any, key: string, descriptor: any) => {

        const originalMethod = descriptor.value;

        descriptor.value = async function(...args: any[]) {
            let result;
            if (window.localStorage.getItem('networkStatus') === 'true') {
                console.log('tessssss initiating original method call');
                result = await originalMethod.apply(this, args);
            } else {
                alert('No Connection');
                // const myService = AppInjector.get(ModalService);
                // myService.showAsComponent('no-connection-popup', `No connection. This action require network to be enabled.
                //  Please check your network connectivity.`, {
                //     rightAction: { label: 'OK', value: true }
                // }, 'info', false, () => { console.log('network alert pop-up closed.'); });
            }
            return result;
        };
        return descriptor;
    };
}
