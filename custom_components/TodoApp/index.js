class TodoWidget extends HTMLElement {
    constructor(props) {
        super(props);
        this.innerHTML = `
            <todo-item-widget title="1st todo"></todo-item-widget>
            <todo-item-widget title="2nd todo"></todo-item-widget>
        `;
    }
}

// const TodoElementTemplate = 
class TodoItemWidget extends HTMLElement {
    constructor(props) {
        super(props);
        this.state = { 
            title: this.getAttribute('title'),
            status: this.getAttribute('status'),
        }
        this.innerHTML = `
            <p>${this.state.title}</p>
        `;
    }
    
};

window.customElements.define('todo-item-widget', TodoItemWidget);
window.customElements.define('todo-widget', TodoWidget);