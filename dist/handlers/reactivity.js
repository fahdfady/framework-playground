"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEffect = exports.createSignal = void 0;
let activeEffect = null;
function createSignal(value) {
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
exports.createSignal = createSignal;
function createEffect(effect) {
    activeEffect = effect;
    effect();
    activeEffect = null;
}
exports.createEffect = createEffect;
