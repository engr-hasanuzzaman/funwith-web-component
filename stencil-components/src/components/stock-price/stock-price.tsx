import { Component, h, State } from "@stencil/core";

@Component({
    tag: 'z-stock-price',
    shadow: true
})
export class StockPrice {
    @State() price: string;

    fetchPrice(e: Event) {
        e.preventDefault();

        fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=YV1ATWSX9DJBMBD1')
        .then(resp => {
            return resp.json();
        })
        .then(parsedResp =>  {
            console.log("the price is ", parsedResp["Global Quote"]["05. price"]);
            this.price = parsedResp["Global Quote"]["05. price"];
        })
    }
    render() {
        return([
            <form onSubmit={this.fetchPrice.bind(this)}>
                <input type="text" name="" id="price" />
                <button>Fetch</button>
            </form>,
            <div>
                <p>Price: {this.price}</p>
            </div>
        ]);
    }
}