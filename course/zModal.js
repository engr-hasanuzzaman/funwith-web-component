class ZModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                #back-drop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    background-color: rgba(0,0,0,0.3);
                    width: 100%;
                    height: 100vh;
                }
            </style>
            <div id="back-drop"></div>
            <div id="modal"></div>
        `;
    }
}

customElements.define('z-modal', ZModal);