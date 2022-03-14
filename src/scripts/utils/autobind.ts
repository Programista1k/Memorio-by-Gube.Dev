export function Autobind(_: any, __: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjustedMethod: PropertyDescriptor = {
        configurable: true,
        get() {
            return originalMethod.bind(this);
        },
    };
    return adjustedMethod;
}
