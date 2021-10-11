const template = (data) =>`
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
            <button type="submit" class="btn">${data.label}</button>
        `;

class ReactiveSubmitButtonShadow extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }
    
    connectedCallback() {
        this._render();
    }

    _render() {
        this.shadowRoot.innerHTML = template({ label: this.label });
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        if(attr === 'label') {
           if(newVal !== oldVal) {
            this.label = newVal;
            this._render();
           }
        }
    }

    static get observedAttributes() {
        return ['label'];
    }
}

// define the custom element
window.customElements.define('r-submit-button-shadow', ReactiveSubmitButtonShadow);