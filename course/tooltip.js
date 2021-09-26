class HzToolTip extends HTMLElement {
    constructor() {
        super();
        console.log('tooltip created');
    }
}

customElements.define('hz-tooltip', HzToolTip);