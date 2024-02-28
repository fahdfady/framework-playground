define("handlers/nest", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.nest = void 0;
    function nest(parent, children) {
        if (Array.isArray(children)) {
            for (const child of children) {
                if (Array.isArray(child)) {
                    for (const nestedChild of child) {
                        parent.appendChild(nestedChild);
                    }
                }
                else {
                    parent.appendChild(child);
                }
            }
        }
        else {
            parent.appendChild(children);
        }
        return parent;
    }
    exports.nest = nest;
});
define("handlers/ddom", ["require", "exports", "handlers/nest"], function (require, exports, nest_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.renderAppDDOM = exports.template = void 0;
    function template(tag, props, text) {
        let element;
        function getElement() {
            if (!element) {
                element = document.createElement(tag);
                for (const propKey in props) {
                    const propValue = props[propKey];
                    if (propKey.startsWith("on") && typeof propValue === "function") {
                        element[propKey.toLowerCase()] = propValue;
                    }
                    else {
                        element.setAttribute(propKey, propValue);
                    }
                }
            }
            if (text) {
                element.textContent = `${text}`;
            }
            return element;
        }
        return getElement();
    }
    exports.template = template;
    function renderAppDDOM(app, containerElement) {
        app && (0, nest_1.nest)(app, containerElement);
    }
    exports.renderAppDDOM = renderAppDDOM;
});
define("handlers/reactivity", ["require", "exports"], function (require, exports) {
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
});
define("handlers/vdom", ["require", "exports", "handlers/nest"], function (require, exports, nest_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.renderAppVDOM = exports.h = void 0;
    function renderNode(vnode) {
        const el = document.createElement(vnode.tag);
        for (const [key, value] of Object.entries(vnode.props)) {
            el.setAttribute(key, value);
        }
        if (typeof vnode.children === "string") {
            el.textContent = vnode.children;
        }
        else {
            for (const child of vnode.children) {
                (0, nest_2.nest)(el, renderNode(child));
            }
        }
        return el;
    }
    function h(tag, props, children) {
        return {
            tag,
            props,
            children
        };
    }
    exports.h = h;
    function renderAppVDOM(app, fn) {
        app && (0, nest_2.nest)(app, renderNode(fn));
    }
    exports.renderAppVDOM = renderAppVDOM;
});
define("index", ["require", "exports", "handlers/ddom", "handlers/nest", "handlers/reactivity", "handlers/vdom"], function (require, exports, ddom_1, nest_3, reactivity_1, vdom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const app = document.getElementById("root");
    (0, vdom_1.renderAppVDOM)(app, (0, vdom_1.h)('div', { id: 'my-id' }, [
        (0, vdom_1.h)('h1', { class: 'title' }, 'Hello World'),
        (0, vdom_1.h)('p', {}, "lorem ipsum dolor"),
    ]));
    const div = (0, ddom_1.template)('div', { style: "text-align:center; background-color:#222; max-width:600px; margin:auto;" });
    const h1 = (0, ddom_1.template)('h1', { class: 'title ddom', id: "title2" }, "Hello World from Direct DOM");
    const p = (0, ddom_1.template)('p', { id: "my-p" }, 'just testing if i can nest multiple elements under one parent');
    const p2 = (0, ddom_1.template)('p', { id: "my-p2" }, 'just testing if i can nest multiple elements under two parents');
    const [getCount, setCount] = (0, reactivity_1.createSignal)(0);
    const countElement = (0, ddom_1.template)('h1', { style: 'margin:0; margin-top:20px;' }, getCount().toString());
    const increaseBtn = (0, ddom_1.template)('button', { style: "my-p2", onclick: "setCount(getCount() + 1)" }, 'increase number');
    (0, nest_3.nest)(div, [h1, p,
        [(0, ddom_1.template)('div'), p2,
            (0, nest_3.nest)((0, ddom_1.template)('span', { id: "play" }, "testing"), (0, ddom_1.template)('p', {}, "string")),
            countElement,
            increaseBtn
        ],
    ]);
    (0, ddom_1.renderAppDDOM)(app, div);
});
