class TodoWidget extends HTMLElement {
    constructor(props) {
        super(props);
        this.innerHTML ="Todo web component";
    }
}

window.customElements.define('todo-widget', TodoWidget);