import NotFound from "../pages/notFound.js";
class Router {
    constructor() {
        this.routes = {};
        this.currentPath = window.location.pathname;
        this.previousPath = null;
        const handlePopstate = this.handlePopstate.bind(this);
        const handleClick = this.handleClick.bind(this);
        window.addEventListener('popstate', handlePopstate);
        window.addEventListener('click', handleClick);
    }
    on(path, callback) {
        this.routes[path] = callback;
    }
    navigateTo(path) {
        history.pushState({}, '', path);
        this.handleRoute();
    }
    handlePopstate() {
        this.handleRoute();
    }
    handleClick(e) {
        if (e.target instanceof HTMLAnchorElement && e.target.href) {
            e.preventDefault();
            this.navigateTo(e.target.href);
        }
    }
    handleRoute() {
        const currentPath = window.location.pathname;
        if (this.currentPath === currentPath) {
            return;
        }
        this.previousPath = this.currentPath;
        this.currentPath = currentPath;
        const callback = this.routes[currentPath];
        if (callback) {
            callback();
        }
        else {
            console.error("404: ", currentPath);
            if (NotFound) {
                NotFound();
            }
            else {
                return;
            }
        }
    }
}
const router = new Router();
export default router;
