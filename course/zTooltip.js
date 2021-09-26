const template = (data) => `
    <style>
        .tooltip-text {
            position: absolute;
            background-color: black;
            color: #ffffff;
            display: none;
        }
        .info-container {
            border-bottom: 1px dotted red;
            cursor: help;
        }
        .info-icon {
            background-color: var(--info-bg-color, rgba(0,0,1,0.3));
            padding: 3px;
            border-radius: 50%;
        }
    </style>
    <span class="info-container">
        <slot></slot>
        <span class="info-icon">?</span>
    </span>
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

    attributeChangedCallback(attr, oldVal, newVal) {
        if(this.shadowRoot.querySelector('.tooltip-text')) {
            this.shadowRoot.querySelector('.tooltip-text').innerText = newVal;
        }
    }

    _showInfo() {
        this.shadowRoot.querySelector('.tooltip-text').style.display = 'block';
    }

    _hideInfo() {
        this.shadowRoot.querySelector('.tooltip-text').style.display = 'none';
    }

    // register attributes want to ovserve
    static get observedAttributes() {
        return ['text'];
    }
}

customElements.define('z-tooltip', ZToolTip);