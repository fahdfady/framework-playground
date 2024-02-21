"use strict";
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
function h(tag, props, children) {
    return {
        tag,
        props,
        children
    };
}
function renderAppVDOM(fn) {
    app === null || app === void 0 ? void 0 : app.appendChild(renderNode(fn));
}
