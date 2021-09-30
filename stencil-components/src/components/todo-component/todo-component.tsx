import { Component, Prop, h } from '@stencil/core';

@Component({
    tag: 'todo-component',
    shadow: true
})
export class TodoComponent {
    render() {
        return <p>Hello Stencil! you</p>
    }
}