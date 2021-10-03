import { Component, h, State, Element } from "@stencil/core";
import { AV_API_KEY } from "../../global/global";
@Component({
    tag: 'z-stock-price',
    shadow: true,
    styleUrl: './stock-price.css'
})
export class StockPrice {
    // this will the elment after rendering
    @Element() el: HTMLElement;

    // will keep the reference
    inputElm: HTMLInputElement;

    // two way data binding
    @State() userInput: string;
    @State() isValidInput: boolean = false;

    onInput(e: Event) {
        this.userInput = (e.target as HTMLInputElement).value;
        if(this.userInput.trim().length > 0 ) {
            this.isValidInput = true;
        } else {
            this.isValidInput = false;
        }
    }
    @State() price: number;

    fetchPrice(e: Event) {
        e.preventDefault();
        if(!this.isValidInput) {
            console.log('Enter valid data ');
            return;
        } 
        // use query selector to access elemnt
        // const symbol = (this.el.shadowRoot.querySelector('#symbol') as HTMLInputElement).value;

        // use direct ref to access element value
        const symbol = this.userInput;
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
                <input type="text" name="symbol" id="symbol" value={this.userInput} onInput={this.onInput.bind(this)}/>
                <button disabled={!this.isValidInput}>Fetch</button>
            </form>,
            <div>
                <p>Price: {this.price}</p>
            </div>
        ]);
    }
}