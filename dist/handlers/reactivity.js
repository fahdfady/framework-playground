let activeEffect = null;
export function createSignal(value) {
    const listeners = new Set();
    const target = { value };
    const proxy = new Proxy(target, {
        get(target, prop) {
            if (activeEffect) {
                listeners.add(activeEffect);
            }
            ;
            if (prop === "value") {
                return target[prop];
            }
        },
        set(target, prop, newValue) {
            if (prop !== newValue) {
                target.value = newValue;
            }
            for (const effect of listeners) {
                effect();
            }
            return true;
        }
    });
    const getter = () => proxy.value;
    const setter = (newValue) => proxy.value = newValue;
    return [getter, setter];
}
export function createEffect(effect) {
    activeEffect = effect;
    effect();
    activeEffect = null;
}
