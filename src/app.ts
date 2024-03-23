import router from "./handlers/routing.js";
import AboutPage from "./pages/about.js";
import HomePage from "./pages/index.js";


router.on('/',
    HomePage)

router.on('/about',
    ()=>{console.log("ABOUT")})