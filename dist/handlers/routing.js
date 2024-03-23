"use strict";
const Route = (e) => {
    e = e || window.event;
    e.preventDefault();
    window.history.pushState({}, '', e.target.href);
    handleLocation();
};
const routes = {
    '/404': '404.html',
    '/': 'index.html',
    '/about': 'about.html',
    '/contact': 'contact.html'
};
const root = document.getElementById('root');
const handleLocation = async () => {
    var _a;
    const path = (_a = window.location) === null || _a === void 0 ? void 0 : _a.pathname;
    if (!path) {
        console.error("No path found");
        return;
    }
    const route = `/pages/${routes[path]}` || routes['404'];
    let html;
    try {
        html = await fetch(route).then((data) => data.text());
    }
    catch (error) {
        console.error(`Error fetching route ${route}`, error);
        return;
    }
    if (!root) {
        console.error("No root element found");
        return;
    }
    root.innerHTML = html;
};
window.onpopstate = handleLocation;
window.route = Route;
handleLocation();
