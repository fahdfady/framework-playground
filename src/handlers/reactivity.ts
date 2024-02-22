var activeEffect: null | (() => void) = null

// intercepts the count = count + 1 proceess 
function createSignal<T>(value: T, options?: T) {
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

            effects.forEach(effect => effect());

            return true;
        }
    })



    // implementing getter and setter {https://docs.solidjs.com/reference/basic-reactivity/create-signal}
    // the getter: a function returning the current value (and not the value itself. because it needs to read the last value to update it)
    const getter = () => proxy.value;
    // the setter: a function that changes the value
    const setter = (newValue: T) => proxy.value = newValue;

    return [getter, setter] as const;
}

const [count, setCount] = createSignal(0);

function createEffect(fn: () => void) {
    activeEffect = fn;
    fn();
    activeEffect = null;
}

function renderApp() {
    const html = `<h1>${count()}</h1>`

    if (app) {
        app.innerHTML = html;
    }
}

function increment() {
    setCount(count() + 1);
}


window.increment = increment;
createEffect(renderApp);