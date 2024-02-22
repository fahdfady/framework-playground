let activeEffect: (() => void) | null = null;

// intercepts the change process
function createSignal<T>(value: T) {
    const listeners: Set<() => void> = new Set();

    // putting our value in an object so we can use it in proxy
    const target = { value }

    const proxy = new Proxy(target, {
        get(target, prop) {
            if (activeEffect) {
                listeners.add(activeEffect)
            };

            if (prop === "value") {
                return target[prop];
            }
        },
        set(target, prop, newValue:T) {
            if (prop !== newValue) {
                target.value = newValue;
            }

            for (const effect of listeners) {
                effect();
            }
            return true;
        }
    });


    // implementing getter and setter {https://docs.solidjs.com/reference/basic-reactivity/create-signal}
    // the getter: a function returning the current value (and not the value itself. because it needs to read the last value to update it)
    const getter = () => proxy.value;
    // the setter: a function that changes the value
    const setter = (newValue: any) => proxy.value = newValue;

    return [getter, setter] as const;
}

function createEffect(effect: (() => void)) {
    activeEffect = effect;
    effect(); // run the effect
    activeEffect = null;
}

