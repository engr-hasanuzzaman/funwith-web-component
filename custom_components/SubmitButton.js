class SubmitButton extends HTMLElement {
    constructor() {
        super();
    }

    // callback method
    connectedCallback() {
        this.label = this.getAttribute('label');
        this.innerHTML = `
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
    }
}

// define the custom element
window.customElements.define('submit-button', SubmitButton);