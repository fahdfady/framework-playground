import { renderAppDDOM, template } from "../handlers/ddom.js";
import { nest } from "../handlers/nest.js";

export default function AboutPage() {

    renderAppDDOM(root, [
        template('h1', {}, "About Page"),
        template('hr'),
        template('p', {}, "this is the about page"),
    ]);

}