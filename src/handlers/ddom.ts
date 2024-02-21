function template(tag: string, props?: Record<string, string | Function>, text?: string): HTMLElement {
    let element: HTMLElement;

    function getElement() {
        if (!element) {
            element = document.createElement(tag);

            for (const propKey in props) {
                const propValue = props[propKey];

                if (propKey.startsWith("on") && typeof propValue === "function") {
                    //@ts-ignore
                    element[propKey.toLowerCase()] = propValue;
                }

                else {
                    //@ts-ignore
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

// nest takes 2 argument => parent and children. if children are more than 1 it loops on them and renders each one
function nest(parent: HTMLElement, children: HTMLElement[] | HTMLElement) {
    if (Array.isArray(children)) {
        for (const child of children) {
            parent?.appendChild(child);
        }
    }
    else {
        parent?.appendChild(children);
    }
}

function renderAppDDOM(containerElement: HTMLElement): void {
    app && nest(app, containerElement)
}
