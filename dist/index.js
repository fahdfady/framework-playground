"use strict";
renderAppVDOM(h('div', { id: 'my-id' }, [
    h('h1', { class: 'title' }, 'Hello World'),
    h('p', {}, "lorem ipsum dolor"),
]));
const div = template('div', { style: "text-align:center; background-color:#222; max-width:600px; margin:auto;" });
const h1 = template('h1', { class: 'title ddom', id: "title2" }, "Hello World from Direct DOM");
const p = template('p', { id: "my-p" }, 'just testing if i can nest multiple elements under one parent');
const p2 = template('p', { id: "my-p2" }, 'just testing if i can nest multiple elements under two parents');
const [count, setCount] = createSignal(0);
const countElement = template('h1', { style: 'margin:0; margin-top:20px;' }, count().toString());
const increaseBtn = template('button', { style: "my-p2", onclick: "setCount(count() + 1)" }, 'increase number');
createEffect(() => {
    countElement.textContent = count().toString();
});
nest(div, [h1, p,
    [template('div'), p2,
        nest(template('span', { id: "play" }, "testing"), template('p', {}, "string")),
        countElement,
        increaseBtn
    ],
]);
renderAppDDOM(div);
