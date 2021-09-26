class ZToolTip extends HTMLElement {
    constructor() {
        super();
        console.log('tooltip created');
        this.infoElement = null;
        this._tooltipText = 'Info will be show in here';
    }

    connectedCallback() {
        const icon = document.createElement('span');
        if(this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }
        this.infoElement = document.createElement('div');
        this.infoElement.textContent = this._tooltipText;
        icon.textContent = '(?)';
        icon.addEventListener('mouseenter', this._showInfo.bind(this));
        icon.addEventListener('mouseleave', this._hideInfo.bind(this));
        this.appendChild(icon);
    }

    _showInfo() {
        this.appendChild(this.infoElement);
    }

    _hideInfo() {
        this.removeChild(this.infoElement);
    }
}

customElements.define('z-tooltip', ZToolTip);