export function ShowLoader() {
    return (Class: any) => {
        Object.defineProperty(Class.prototype, 'showLoader', {
            value: true
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
