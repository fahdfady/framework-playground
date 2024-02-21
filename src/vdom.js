"<div id=\"my-id\" class=\"my-class\">\n    <h1>Hello World</h1>\n</div>";
// takes 1 node ==> converts it to HTML
function renderNode(vnode) {
    // create the HTML tag
    var el = document.createElement(vnode.tag);
    // iterate on each prop and add it as Key and Value into the HTML element
    for (var _i = 0, _a = Object.entries(vnode.props); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        el.setAttribute(key, value);
    }
    // if the children is a single string add it as a text in the HTML tag
    if (typeof vnode.children === "string") {
        el.textContent = vnode.children;
    }
    // else (the children is an array of VNodes) ==> iterate on each VNode and recursivley render them until we finish them and their nested children
    else {
        for (var _c = 0, _d = vnode.children; _c < _d.length; _c++) {
            var child = _d[_c];
            el.appendChild(renderNode(child));
        }
    }
    return el;
}
// hypescript render pattern https://www.patterns.dev/vue/render-functions/#:~:text=h%20is%20short%20for%20hyperscript,subsequently%20render%20on%20the%20page.     takes the vnode and return a vnode
function h(tag, props, children) {
    return {
        tag: tag,
        props: props,
        children: children
    };
}
function renderApp() {
    var app = document.getElementById('root');
    app === null || app === void 0 ? void 0 : app.appendChild(renderNode(h('div', { id: 'my-id' }, [
        h('h1', { class: 'title' }, 'Hello World')
    ])));
}
renderApp();
