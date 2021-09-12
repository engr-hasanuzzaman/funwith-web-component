// const TodoElementTemplate = 
export class TodoItemWidget extends HTMLElement {
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