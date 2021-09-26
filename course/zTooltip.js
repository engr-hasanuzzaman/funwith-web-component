class ZToolTip extends HTMLElement {
    constructor() {
        super();
        console.log('tooltip created');
        this.infoElement = null;
    }

    connectedCallback() {
        const icon = document.createElement('span');
        icon.textContent = '(?)';
        icon.addEventListener('mouseenter', this._showInfo.bind(this));
        icon.addEventListener('mouseleave', this._hideInfo.bind(this));
        this.appendChild(icon);
    }

    _showInfo() {
        this.infoElement = document.createElement('div');    
        this.infoElement.textContent = 'Tooltip info';
        this.appendChild(this.infoElement);
    }

    _hideInfo() {
        this.removeChild(this.infoElement);
    }
}

customElements.define('z-tooltip', ZToolTip);