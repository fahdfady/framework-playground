"use strict";
renderAppVDOM(h('div', { id: 'my-id' }, [
    h('h1', { class: 'title' }, 'Hello World')
]));
const div = template('div', { style: "text-align:center; background-color:#222; max-width:600px; margin:auto;" });
const h1 = template('h1', { class: 'title ddom', id: "title2" }, "Hello World from Direct DOM");
const p = template('p', { id: "my-p" }, 'just testing if i can nest multiple elements under one parent');
nest(div, [h1, p]);
renderAppDDOM(div);
