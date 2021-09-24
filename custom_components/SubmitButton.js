class SubmitButton extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.label = this.getAttribute('label');
        this.innerHTML = `
            <button type="submit">${this.label}</button>
        `;
    }
}

window.customElements.define('submit-button', SubmitButton);