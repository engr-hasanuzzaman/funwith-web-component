import { Component, h } from "@stencil/core";

@Component({
    tag: 'z-loader',
    shadow: true,
    styleUrl: './z-loader.css'
})

export class ZLoader {
    render() {
        return(
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        )
    }
}