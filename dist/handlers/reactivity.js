"use strict";
var activeEffect = null;
function createSignal(value) {
    const target = { value };
    const effects = [];
    const proxy = new Proxy(target, {
        get(target, prop) {
            if (activeEffect) {
                effects.push(activeEffect);
            }
            if (prop === "value") {
                return target[prop];
            }
        },
        set(target, prop, value) {
            if (prop === "value") {
                target[prop] = value;
            }
            effects.forEach(effect => effect());
            return true;
        }
    });
    return proxy;
}
let count = createSignal(0);
function createEffect(fn) {
    activeEffect = fn;
    fn();
    activeEffect = null;
}
function renderApp() {
    const html = `<h1>${count.value}</h1>`;
    if (app) {
        app.innerHTML = html;
    }
}
function increment() {
    count.value++;
}
window.increment = increment;
createEffect(renderApp);
