class SubmitButton extends HTMLElement {
    constructor(props) {
        super(props);
        this.label = this.getAttribute('label') || 'Default';
    }

    connectedCallback() {
        this.innerHTML = `
            <button type='submit'>${this.label}</button>
        `;
    }
}

customElements.define('submit-button', SubmitButton);