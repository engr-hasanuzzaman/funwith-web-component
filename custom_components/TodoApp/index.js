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
        const formContent = `
            <todo-item-form></todo-item-form>
        `
        this.shadowRoot.querySelector('.container').innerHTML = this.state.todos.map(todo => `<todo-item-widget title="${todo.title}" checked=${todo.status}></todo-item-widget>`).join('').concat(formContent);
        // bind custom event
        this.shadowRoot.querySelector('.container').addEventListener('onNew', (e) => {
            console.log('--------- on the parent: the value is ' + e.detail);
        })
    }
}

// todo form component
const formTemplate = document.createElement('template');
formTemplate.innerHTML = `
    <div>
        <input type='text' placeholder='todo title'>
        <button class='new-todo'>Add New</button>
    </div>
`
class TodoItemForm extends HTMLElement {
    constructor(props) {
        super(props);
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(formTemplate.content.cloneNode(true));
        this.shadowRoot.querySelector('.new-todo').addEventListener('click', () => {
            const text = this.shadowRoot.querySelector('input').value;
            console.log('---------the value is ' + text);
            this.dispatchEvent(new Event('onNew', { detail: text }));
        });
    }
    
}

// totoItem component
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

window.customElements.define('todo-item-form', TodoItemForm);
window.customElements.define('todo-item-widget', TodoItemWidget);
window.customElements.define('todo-widget', TodoWidget);