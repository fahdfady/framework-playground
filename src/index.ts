import { renderAppDDOM, template } from "./handlers/ddom.js";
import { nest } from "./handlers/nest.js";
import { createEffect, createSignal } from "./handlers/reactivity.js";
import { h, renderAppVDOM } from "./handlers/vdom.js";
const app = <HTMLElement>document.getElementById("root");

// using virtual dom
renderAppVDOM(app,
    h('div', { id: 'my-id' }, [
        h('h1', { class: 'title' }, 'Hello World'),
        h('p', {}, "lorem ipsum dolor"),
    ]));

// using direct dom
const div = template('div', { style: "text-align:center; background-color:#222; max-width:600px; margin:auto;" });
const h1 = template('h1', { class: 'title ddom', id: "title2" }, "Hello World from Direct DOM");
const p = template('p', { id: "my-p" }, 'just testing if i can nest multiple elements under one parent')
const p2 = template('p', { id: "my-p2" }, 'just testing if i can nest multiple elements under two parents')
const table = template('table', {}, '')
const tr = template('tr', {}, 'header1')
const td = template('td', {}, 'header2')
const th = template('th', {}, '')


const [getCount, setCount] = createSignal(0);
const countElement = template('h1', { style: 'margin:0; margin-top:20px;' }, getCount().toString());
const increment = () => {
    setCount(getCount() + 1);
    console.log(getCount());
    console.log("hello world!");
};
const increaseBtn = template('button', { style: "my-p2", onclick: increment }, 'increase number')

// Create an effect that updates the count element whenever the count changes
createEffect(() => {
    console.log("effect");
    countElement.textContent = getCount().toString();
});

nest(div,
    [h1, p,
        [template('div'), p2,
        nest(template('span', { id: "play" }, "testing"), template('p', {}, "string")),
            // countElement,
            // increaseBtn
        ],
        countElement,
        increaseBtn
    ]);

renderAppDDOM(app, div);