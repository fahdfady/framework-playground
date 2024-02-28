import { nest } from "./nest.js";
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
            nest(el, renderNode(child));
        }
    }
    return el;
}
export function h(tag, props, children) {
    return {
        tag,
        props,
        children
    };
}
export function renderAppVDOM(app, fn) {
    app && nest(app, renderNode(fn));
}
