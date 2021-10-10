class ZConfirmLink extends HTMLAnchorElement {
    constructor() {
        super();
        this.addEventListener('click', event => {
            if(!confirm('Do you want to proceed?')) {
                event.preventDefault();
            }
        })
    }
}

customElements.define('z-a', ZConfirmLink, { extends: 'a'});