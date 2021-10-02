import { Component, h, Prop } from '@stencil/core';

@Component({
    tag: 'side-drawer',
    styleUrl: './side-drawer.css',
    shadow: true
})
export class SideDrawer {
    @Prop({reflect: true}) title: string;
    @Prop({reflect: true, mutable: true}) open: boolean;

    onClose() {
        this.open = false;
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