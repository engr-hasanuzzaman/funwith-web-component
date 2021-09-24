class SubmitButton extends HTMLElement {
    constructor() {
        super();
    }

    // callback method
    connectedCallback() {
        this.label = this.getAttribute('label');
        this.innerHTML = `
            <button type="submit">${this.label}</button>
        `;
    }
}

// define the custom element
window.customElements.define('submit-button', SubmitButton);