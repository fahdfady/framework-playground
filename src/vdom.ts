interface VNode {
    tag: string;
    props: Record<string, any>;
    children: VNode[] | string;
}

`<div id="my-id" class="my-class">
    <h1>Hello World</h1>
</div>`

// takes 1 node ==> converts it to HTML
function renderNode(vnode: VNode): HTMLElement {
    // create the HTML tag
    const el = document.createElement(vnode.tag);

    // iterate on each prop and add it as Key and Value into the HTML element
    for (const [key, value] of Object.entries(vnode.props)) {
        el.setAttribute(key, value);
    }

    // if the children is a single string add it as a text in the HTML tag
    if (typeof vnode.children === "string") {
        el.textContent = vnode.children;
    }

    // else (the children is an array of VNodes) ==> iterate on each VNode and recursivley render them until we finish them and their nested children
    else {
        for (const child of vnode.children) {
            el.appendChild(renderNode(child));
        }
    }

    return el;
}



const appNode: VNode = {
    tag: 'div',
    props: {
        id: "my-div",
        class: "start",
    },
    children: [
        {
            tag: 'h1',
            props: {
                class: "title"
            },
            children: "Hello World"
        }
    ]
}

function renderApp() {
    const app = document.getElementById('root');

    app?.appendChild(renderNode(appNode));
}

renderApp();