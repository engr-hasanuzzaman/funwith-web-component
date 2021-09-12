const todoTemplate = document.createElement('template');
todoTemplate.innerHTML = `
    <style>
        .container {
            border: 1px solid blue;
            padding: 10px;
            display: flex;
            flex-direction: column;
        }
        .container p {
            display: block;
            width: 1005;
        }
    </style>
    <div class='container'></div>
    <button>Add New</button>
`;
class TodoWidget extends HTMLElement {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {
                    title: 'first todo',
                    status: false,
                },
                {
                    title: 'secnod todo',
                    status: false,
                }
            ]
        };
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(todoTemplate.content.cloneNode(true));
        this.shadowRoot.querySelector('.container').innerHTML = this.state.todos.map(todo => `<todo-item-widget title="${todo.title}" checked=${todo.status}></todo-item-widget>`).join('');
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
            <div>
                <p><strong>Title: </strong>${this.state.title}</p>
            </div>
        `;
    }

};

window.customElements.define('todo-item-widget', TodoItemWidget);
window.customElements.define('todo-widget', TodoWidget);