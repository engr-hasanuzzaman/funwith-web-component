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
        <slot name="header">
            <h3>Please confirm</h3>
        </slot>
    </header>

    <section id="main-body">
        <slot></slot>
    </section>

    <section id="footer">
        <button id="confirm-modal">Confirm</button>
        <button id="close-modal">Cancel</button>
    </section>
</div>
`;

class ZModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = modalTemplate;
        // control the modal state 
        this.shadowRoot.querySelector('#close-modal').addEventListener('click', this._cancel.bind(this));
        this.shadowRoot.querySelector('#confirm-modal').addEventListener('click', this._confirm.bind(this));
        this.shadowRoot.querySelector('#back-drop').addEventListener('click', this._cancel.bind(this));
        
        // acessing slot data for leaning purpose
        const slots = this.shadowRoot.querySelectorAll('slot');
        console.dir(slots);
        slots[1].addEventListener('slotchange', () => {
            // on slot data, space is considered as the string, if we move data on a single line
            // it will show one assignedNodes
            console.dir(slots[1].assignedNodes());
        });
    }

    connectedCallback() {
        this._isOpen = this.hasAttribute('show');
        this._render();
    }

    _render() {
        if(this._isOpen) {
            this._open();
        } else {
            this._hide();
        }
    }

    attributeChangedCallback(attr, newVal, oldVal) {
        if(attr === 'show') {
           this._open()
        }
    }

    static get observedAttributes() {
        return ['show'];
    }

    _open() {
        this._isOpen = true;
        this.style.display = 'block';
    }

    _hide() {
        this._isOpen = false;
        this.style.display = 'none';
    }

    _cancel(event) {
        this._hide();
        const cancelEvent = new Event('cancel', { bubbles: true, composed: true });
        event.target.dispatchEvent(cancelEvent);
    }

    _confirm(event) {
        this._hide();
        const confirmEvent = new Event('confirm', { bubbles: true, composed: true });
        event.target.dispatchEvent(confirmEvent);
    }
    
    // public method
    open() {
        this._open();
    }

    close() {
        this._cancel();
    }

    toggle() {
        if(this._isOpen) {
            this._cancel();
        } else {
            this._open();
        }
    }
}

customElements.define('z-modal', ZModal);