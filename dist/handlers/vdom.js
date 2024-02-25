"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderAppVDOM = exports.h = void 0;
const nest_1 = require("./nest");
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
            (0, nest_1.nest)(el, renderNode(child));
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
    app && (0, nest_1.nest)(app, renderNode(fn));
}
exports.renderAppVDOM = renderAppVDOM;
