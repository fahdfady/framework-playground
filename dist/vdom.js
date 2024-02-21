"use strict";
`<div id="my-id" class="my-class">
    <h1>Hello World</h1>
</div>`;
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
            el.appendChild(renderNode(child));
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
function renderAppVDOM() {
    const app = document.getElementById('root');
    app === null || app === void 0 ? void 0 : app.appendChild(renderNode(h('div', { id: 'my-id' }, [
        h('h1', { class: 'title' }, 'Hello World')
    ])));
}
renderAppVDOM();
