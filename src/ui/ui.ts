import { html, render } from "lit-html";

const myTemplate = (name: string) => html`<p>Hello ${name}</p>`;

// Render the template to the document
render(myTemplate("World"), document.body);
