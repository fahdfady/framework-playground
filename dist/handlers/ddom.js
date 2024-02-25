"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderAppDDOM = exports.template = void 0;
const nest_1 = require("./nest");
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
exports.template = template;
function renderAppDDOM(app, containerElement) {
    app && (0, nest_1.nest)(app, containerElement);
}
exports.renderAppDDOM = renderAppDDOM;
