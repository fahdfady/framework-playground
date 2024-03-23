import { template } from "../handlers/ddom.js";
export default function AboutPage() {
    template('h1', {}, "About Page");
    template('hr');
    template('p', {}, "this is the about page");
}
