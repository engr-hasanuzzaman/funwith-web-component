import { Component, h, Prop, Method } from '@stencil/core';

@Component({
    tag: 'side-drawer',
    styleUrl: './side-drawer.css',
    shadow: true
})
export class SideDrawer {
    @Prop({reflect: true}) title: string;
    // this property will be synch with attribute and mutalbe
    // in defautl, propery are controllable from the outside of the component
    // we can manupulate mutable prop from the inside of the component
    @Prop({reflect: true, mutable: true}) opened: boolean;

    onClose() {
        this.opened = false;
    }

    @Method()
    close() {
        this.opened = false;
    }

    @Method()
    open() {
        this.opened = true;
    }

    render() {
        return (
            <aside>
                <header>
                    <h1>{this.title}</h1>
                    <button onClick={this.onClose.bind(this)}>X</button>
                </header>

                <main>
                    <slot />
                </main>
            </aside>
        );
    }
}