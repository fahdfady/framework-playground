export function template(tag, props, text) {
    let element;
    function getElement() {
        if (!element) {
            element = document.createElement(tag);
            for (const propKey in props) {
                const propValue = props[propKey];
                if (propKey.startsWith("on") && typeof propValue === "function") {
                    console.log("somoeone help me", propKey, propValue);
                    element.addEventListener(propKey.substring(2), propValue);
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
export function renderAppDDOM(root, containerElement) {
    let elements;
    if (Array.isArray(containerElement)) {
        elements = containerElement;
    }
    else {
        elements = [containerElement];
    }
    const eventListenersMap = new Map();
    elements.forEach(element => {
        const eventListeners = new Map();
        element.getAttributeNames().forEach(attr => {
            if (attr.startsWith('on')) {
                const eventName = attr.slice(2);
                const eventListener = element.getAttribute(attr);
                if (eventName && eventListener) {
                    eventListeners.set(eventName, new Function(eventListener));
                    element.removeAttribute(attr);
                }
            }
        });
        eventListenersMap.set(element, eventListeners);
    });
    root.innerHTML = '';
    elements.forEach(element => {
        root.appendChild(element);
    });
    eventListenersMap.forEach((eventListeners, element) => {
        eventListeners.forEach((listener, eventName) => {
            element.addEventListener(eventName, listener);
        });
    });
}
