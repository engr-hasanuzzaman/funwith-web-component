const modalTemplate = `
<style>
    #back-drop {
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,0.3);
        width: 100%;
        height: 100vh;
        z-index: 10px;
    }

    #modal {
        position: fixed;
        top: 20vh;
        left: 25%;
        width: 50%;
        background-color: #fff;
        border: 3px solid gray;
        border-radius: 6px;
        box-shadow: 0 2px 3px rgba(0,0,0,0.20);
        z-index: 11; 
        min-height: 20vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px;
    }

    #footer {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
    }

    #footer button {
        margin: 0 0.25rem;
        cursor: pointer;
    }
</style>
<div id="back-drop"></div>
<div id="modal">
    <header>
        <h3>Please confirm</h3>
    </header>

    <section id="main-body">
        <slot></slot>
    </section>

    <section id="footer">
        <button>Confirm</button>
        <button id="close-modal">Cancel</button>
    </section>
</div>
`;

class ZModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = modalTemplate;
        this.shadowRoot.querySelector('#close-modal').addEventListener('click', this._close.bind(this));
    }

    connectedCallback() {
        this._isOpen = this.hasAttribute('show');
        this._render();
    }

    _render() {
        if(this._isOpen) {
            this.style.display = 'block';
        } else {
            this.style.display = 'none';
        }
    }

    attributeChangedCallback(attr, newVal, oldVal) {
        if(attr === 'show') {
            this._isOpen = !this._isOpen;
        }

        this._render();
    }

    static get observedAttributes() {
        return ['show'];
    }

    _close() {
        this._isOpen = false;
        this._render();
    }

    // public method
    open() {
        this.setAttribute('show', '');
    }

    close() {
        this.removeAttribute('show');
    }

    toggle() {
        this._isOpen = !this._isOpen;
    }
}

customElements.define('z-modal', ZModal);