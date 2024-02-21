"use strict";
function template(tag, props, text) {
    let element;
    function getElement() {
        if (!element) {
            element = document.createElement(tag);
            for (const propKey in props) {
                const propValue = props[propKey];
                if (propKey.startsWith("on") && typeof propValue === "function") {
                    element[propKey.toLowerCase()] = propValue;
                }
                else {
                    element.setAttribute(propKey, propValue);
                }
            }
        }
        if (text) {
            element.textContent = `${text}`;
        }
        return element;
    }
    return getElement();
}
const app = document.getElementById("root");
function nest(parent, children) {
    if (Array.isArray(children)) {
        for (const child of children) {
            parent === null || parent === void 0 ? void 0 : parent.appendChild(child);
        }
    }
    else {
        parent === null || parent === void 0 ? void 0 : parent.appendChild(children);
    }
}
function renderAppDDOM(containerElement) {
    app && nest(app, containerElement);
}
