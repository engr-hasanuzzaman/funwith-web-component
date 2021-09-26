const template = (data) => `
    <style>
        .info-box {
            display: none;
        }
    </style>
    <button>${data.btnLabel}</button>
    <p class="info-box"><slot></slot></p>
`;

class ShowHideInfo extends HTMLElement {
    constructor() {
        super();
        this.show = false;
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        const btnLabel = this.getAttribute('btnLabel') || 'Show';
        this.shadowRoot.innerHTML = template({btnLabel});
        const btn = this.shadowRoot.querySelector('button');
        const info = this.shadowRoot.querySelector('.info-box');
        btn.addEventListener('click', event => {
            if(this.show) {
                info.style.display = 'none';
            } else {
                info.style.display = 'block';
            }

            this.show = !this.show;
        })
    }
} 

customElements.define('show-hide-info', ShowHideInfo);