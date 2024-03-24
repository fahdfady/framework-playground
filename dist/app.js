import router from "./handlers/routing.js";
import HomePage from "./pages/index.js";
import AboutPage from "./pages/about.js";
router.on('/', HomePage);
router.on('/about', AboutPage);
router.on('*', () => {
    console.log('404 Page');
});
