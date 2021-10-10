class HelloWorld extends HTMLElement {
    constructor() {
        super();
        this.innerText = "Hello World";
    }
}

// Rules for naming:
// 1. name must have to contain atleast two words connected by -
// This prevents conflicts with existing and future HTML elements, since all HTML elements are a single word
window.customElements.define('hello-world', HelloWorld);