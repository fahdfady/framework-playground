import router from "./handlers/routing.js";
import HomePage from "./pages/index.js";
router.on('/', HomePage);
router.on('/about', () => { console.log("ABOUT"); });
