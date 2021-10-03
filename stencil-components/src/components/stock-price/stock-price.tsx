import { Component, h } from "@stencil/core";

@Component({
    tag: 'z-stock-price',
    shadow: true
})
export class StockPrice {

    render() {
        return([
            <div>
                <input type="text" name="" id="price" />
                <button>Fetch</button>
            </div>,
            <div>
                <p>Price:</p>
            </div>
        ]);
    }
}