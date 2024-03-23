/**
 * Handle the route for the anchor element
 *
 * @param e The event object that was triggered
 */
const Route = (e: any) => {
    // get the event object from the window if there isn't one
    e = e || window.event;

    // prevent the default behavior of the anchor element (navigation)
    e.preventDefault();

    // updates the URL on the browser
    // pushState: adds/updates a history entry, and navigates to it
    // the first param is the data object, which we don't really care about
    // the second param is the title
    // the third param is the URL
    window.history.pushState({}, '', e.target.href);

    handleLocation();
}


const routes: Record<string, string> = {
    '/404': '404.html',
    '/': 'index.html',
    '/about': 'about.html',
    '/contact': 'contact.html'
}

const root = document.getElementById('root');
/**
 * Handle the location event and fetch the appropriate HTML file based on
 * the URL path.
 */
const handleLocation = async () => {
    // get the current URL path from the window object
    const path = window.location?.pathname;

    // if there is no path, log an error and exit
    if (!path) {
        console.error("No path found");
        return;
    }

    // look up the route for the URL path in the routes object, if it's not found in the routes object, return the 404 page
    const route = `/pages/${routes[path]}` || routes['404'];
    // fetch the HTML file for the route
    let html;
    try {
        html = await fetch(route).then((data) => data.text());
    } catch (error) {
        // log an error if the fetch fails and exit
        console.error(`Error fetching route ${route}`, error);
        return;
    }

    // if there is no root element, log an error and exit
    if (!root) {
        console.error("No root element found");
        return;
    }

    // set the innerHTML of the root element to the HTML fetched from
    // the route
    root.innerHTML = html;
};

// handle if user clicks the back and forward buttons repeatly
window.onpopstate = handleLocation;

window.route = Route;

handleLocation();