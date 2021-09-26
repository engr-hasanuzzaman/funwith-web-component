const template = (data) => `
    <style>
        .info-box {
            display: ${data.display};
        }
    </style>
    <button>${data.btnLabel}</button>
    <p class="info-box">
        <slot></slot>
    </p>
`;

class ShowHideInfo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.show = this.hasAttribute('show');
        let btnLabel;
        let display;
        if(this.show) {
            btnLabel = 'Hide';
            display = 'block';
        } else {
            btnLabel = 'Show'
            display = 'none';
        }
        this.shadowRoot.innerHTML = template({ btnLabel, display });
        const btn = this.shadowRoot.querySelector('button');
        const info = this.shadowRoot.querySelector('.info-box');
        btn.addEventListener('click', event => {
            if(this.show) {
                info.style.display = 'none';
                btn.innerText = 'Show';
            } else {
                info.style.display = 'block';
                btn.innerText = 'Hide';
            }

            this.show = !this.show;
        })
    }
} 

customElements.define('show-hide-info', ShowHideInfo);