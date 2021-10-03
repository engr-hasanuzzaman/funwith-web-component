import { Component, h, State, Element } from "@stencil/core";
import { AV_API_KEY } from "../../global/global";
@Component({
    tag: 'z-stock-price',
    shadow: true
})
export class StockPrice {
    // this will the elment after rendering
    @Element() el: HTMLElement;

    inputElm: HTMLInputElement;

    @State() price: number;

    fetchPrice(e: Event) {
        e.preventDefault();
        // use query selector to access elemnt
        // const symbol = (this.el.shadowRoot.querySelector('#symbol') as HTMLInputElement).value;

        // use direct ref to access element value
        const symbol = this.inputElm.value;
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${AV_API_KEY}`)
        .then(resp => {
            return resp.json();
        })
        .then(parsedResp =>  {
            this.price = +parsedResp["Global Quote"]["05. price"];
        })
    }
    render() {
        return([
            <form onSubmit={this.fetchPrice.bind(this)}>
                <input type="text" name="symbol" id="symbol" ref={el => this.inputElm = el}/>
                <button>Fetch</button>
            </form>,
            <div>
                <p>Price: {this.price}</p>
            </div>
        ]);
    }
}