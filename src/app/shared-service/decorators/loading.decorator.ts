export function ShowLoader(msg?: string) {
    return (Class: any) => {
        Object.defineProperty(Class.prototype, 'showLoader', {
            value: true
        });

        Object.defineProperty(Class.prototype, 'message', {
            value: msg ? msg : ''
        });
    };
}

export function HideLoader(triggerAction: string) {
    return (Class: any) => {
        Object.defineProperty(Class.prototype, 'triggerAction', {
            value: triggerAction
        });
    };
}
