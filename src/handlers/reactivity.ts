var activeEffect: null | (() => void) = null

// intercepts the count = count + 1 proceess 
function createSignal<T>(value: T) {
    // putting our value in an object so we can use it in proxy
    const target = { value };

    // contains all effects (functions) that accessed the target.value (changes the render)
    const effects: (() => void)[] = [];

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

            // console.log(effects)
            effects.forEach(effect => effect());

            return true
        }
    })


    return proxy;
}

let count = createSignal(0);

function createEffect(fn: () => void) {
    activeEffect = fn;
    fn();
    activeEffect = null;
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