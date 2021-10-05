import { Component, h } from "@stencil/core";

@Component({
    tag: 'z-loader',
    shadow: true,
    styleUrl: './z-loader.css'
})
export class ZLoader {
    render() {
        return(
            <div>
                <p>loading</p>
            </div>
        )
    }
}