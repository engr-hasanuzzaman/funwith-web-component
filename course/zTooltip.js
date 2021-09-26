const template = `
    <style>
        div {
            position: absolute;
            background-color: black;
            color: #ffffff;
        }
    </style>
    <slot></slot>
    <span class="info">(?)</span>
`;

class ZToolTip extends HTMLElement {
    constructor() {
        super();
        this.infoElement = null;
        this._tooltipText = 'Info will be show in here';
        this.attachShadow({ mode: 'open'});
        this.shadowRoot.innerHTML = template;
    }

    connectedCallback() {
        const icon = this.shadowRoot.querySelector('span');
        this.style.position = 'relative';
        if(this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }
        this.infoElement = document.createElement('div');
        this.infoElement.textContent = this._tooltipText;
        icon.addEventListener('mouseenter', this._showInfo.bind(this));
        icon.addEventListener('mouseleave', this._hideInfo.bind(this));
    }

    _showInfo() {
        this.shadowRoot.appendChild(this.infoElement);
    }

    _hideInfo() {
        this.shadowRoot.removeChild(this.infoElement);
    }
}

customElements.define('z-tooltip', ZToolTip);