const template = (data) => `
    <style>
        .tooltip-text {
            position: absolute;
            background-color: black;
            color: #ffffff;
            display: none;
        }
        ::slotted(*) {
            border-bottom: 1px solid red;
        }
    </style>
    <slot></slot>
    <span class="info">(?)</span>
    <div class="tooltip-text">${data.text}</div>
`;

class ZToolTip extends HTMLElement {
    constructor() {
        super();
        this.infoElement = null;
        this._tooltipText = 'Info will be show in here';
        this.attachShadow({ mode: 'open'});
    }

    connectedCallback() {
        if(this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }
        this.shadowRoot.innerHTML = template({ text: this._tooltipText});
        const icon = this.shadowRoot.querySelector('span');
        this.shadowRoot.position = 'relative';
        icon.addEventListener('mouseenter', this._showInfo.bind(this));
        icon.addEventListener('mouseleave', this._hideInfo.bind(this));
    }

    _showInfo() {
        this.shadowRoot.querySelector('.tooltip-text').style.display = 'block';
    }

    _hideInfo() {
        this.shadowRoot.querySelector('.tooltip-text').style.display = 'none';
    }
}

customElements.define('z-tooltip', ZToolTip);