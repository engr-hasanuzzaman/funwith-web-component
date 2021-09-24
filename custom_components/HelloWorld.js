class HelloWorld extends HTMLElement {
    constructor() {
        super();
        this.innerText = "Hello World";
    }
}

window.customElements.define('hello-world', HelloWorld);