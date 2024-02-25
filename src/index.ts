import { renderAppDDOM, template } from "./handlers/ddom";
import { nest } from "./handlers/nest";
import { createEffect, createSignal } from "./handlers/reactivity";
import { h, renderAppVDOM } from "./handlers/vdom";
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

const [getCount, setCount] = createSignal(0);
// setCount("some string"); type error

const countElement = template('h1', { style: 'margin:0; margin-top:20px;' }, getCount().toString());
const increaseBtn = template('button', { style: "my-p2", onclick: "setCount(getCount() + 1)" }, 'increase number')

// Create an effect that updates the count element whenever the count changes
createEffect(() => {
    countElement.textContent = getCount().toString();
});


nest(div,
    [h1, p,
        [template('div'), p2,
        nest(template('span', { id: "play" }, "testing"), template('p', {}, "string")),
            countElement,
            increaseBtn
        ],
        // template('h1', { id: "counter" }, count().toString())

    ]);
renderAppDDOM(app, div);
