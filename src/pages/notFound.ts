import { renderAppDDOM, template } from "../handlers/ddom.js";

export default function NotFound (){
    renderAppDDOM(root, [
        template('h1', {}, "Not Found Page"),
        template('hr'),
        template('h2', {}, "Error 404"),
        template('p', {}, "this is the not found page"),
    ]);
}