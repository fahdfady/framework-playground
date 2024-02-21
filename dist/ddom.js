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
            element.textContent = text;
        }
        return element;
    }
    return getElement();
}
const div = template('div', {});
const h1 = template('h1', { class: 'title ddom', id: "title2" }, "Hello World from Direct DOM");
const app = document.getElementById("root");
div.appendChild(h1);
function renderAppDDOM() {
    app === null || app === void 0 ? void 0 : app.appendChild(div);
}
renderAppDDOM();
