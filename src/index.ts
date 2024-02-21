// using virtual dom
renderAppVDOM(
    h('div', { id: 'my-id' }, [
        h('h1', { class: 'title' }, 'Hello World')
    ]));


// using direct dom
const div = template('div', { style: "text-align:center; background-color:#222; max-width:600px; margin:auto;" });
const h1 = template('h1', { class: 'title ddom', id: "title2" }, "Hello World from Direct DOM");
const p = template('p', { id: "my-p" }, 'just testing if i can nest multiple elements under one parent')
const p2 = template('p', { id: "my-p2" }, 'just testing if i can nest multiple elements under two parents')
// [template('span', {}, "testing"), template('p', {}, "string")],
nest(div,
    [h1, p,
        [template('div'), p2,
        nest(template('span', { id: "play" }, "testing"), template('p', {}, "string"))
        ]
    ]);

renderAppDDOM(div);