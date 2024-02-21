

function createSignal<T>(value: T) {
    // putting our value in an object so we can use it in proxy
    const target = { value };
    const proxy = new Proxy(target, {
        get(target, prop) {
            console.log('get', target, prop);
            if (prop === "value") {
                return target[prop];
            }
        },
        set(target, prop, value) {
            if (prop === "value") {
                target[prop] = value
            }

            return true
        }
    })


    return proxy;
}

let count = createSignal(0);

function createEffect(fn: () => void) {
    fn()
}

function renderApp() {
    const html = `<h1>${count.value}</h1>`

    if (app) {
        app.innerHTML = html;
    }
}

function increment() {
    count.value++;
}


window.increment = increment;
createEffect(renderApp);