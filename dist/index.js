"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ddom_1 = require("./handlers/ddom");
const nest_1 = require("./handlers/nest");
const reactivity_1 = require("./handlers/reactivity");
const vdom_1 = require("./handlers/vdom");
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
(0, reactivity_1.createEffect)(() => {
    countElement.textContent = getCount().toString();
});
(0, nest_1.nest)(div, [h1, p,
    [(0, ddom_1.template)('div'), p2,
        (0, nest_1.nest)((0, ddom_1.template)('span', { id: "play" }, "testing"), (0, ddom_1.template)('p', {}, "string")),
        countElement,
        increaseBtn
    ],
]);
(0, ddom_1.renderAppDDOM)(app, div);
