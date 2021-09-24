class SubmitButtonShadow extends HTMLElement {
    constructor() {
        super();
    }

    // callback method, vue => mounted, reactjs => componentDidMount
    connectedCallback() {
        this.label = this.getAttribute('label');
        const template = `
            <style>
                .btn {
                    height: 44px;
                    padding: 0 16px;
                    border: 1px solid #ced4da;
                    border-radius: 6px;
                    color: #fff;
                    background-color: #007bff;
                    border-color: #007bff;
                    cursor: pointer;
                }
                .btn:hover {
                    background-color: #0069d9;
                    border-color: #0062cc;
                }
            </style>
            <button type="submit" class="btn">${this.label}</button>
        `;
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = template;
    }
}

// define the custom element
window.customElements.define('submit-button-shadow', SubmitButtonShadow);