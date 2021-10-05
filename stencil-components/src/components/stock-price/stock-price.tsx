import { Component, h, State, Element, Prop, Watch, Listen } from "@stencil/core";
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

    @State()  errorMsg: string;
    @State() isLoading: boolean = false;

    // two way data binding
    @State() userInput: string;
    @State() isValidInput: boolean = false;
    @Prop({mutable: true, reflect: true}) stockSymbol: string;

    onInput(e: Event) {
        this.userInput = (e.target as HTMLInputElement).value;
        if(this.userInput.trim().length > 0 ) {
            this.isValidInput = true;
        } else {
            this.isValidInput = false;
        }
    }
    @State() price: number;

    onFechPrice(e: Event) {
        e.preventDefault();
        if(!this.isValidInput) {
            console.log('Enter valid data ');
            return;
        } 
        // use query selector to access elemnt
        // const symbol = (this.el.shadowRoot.querySelector('#symbol') as HTMLInputElement).value;

        // use direct ref to access element value
        // this will trigger the watcher where we will handle the api call
        this.stockSymbol = this.userInput;
    }

    // api call to fetch the price 
    fetchPrice(symbol: String) {
        this.isLoading = true;
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${AV_API_KEY}`)
        .then(resp => {
            return resp.json();
        })
        .then(parsedResp =>  {
            if(!parsedResp["Global Quote"]["05. price"]) {
                throw new Error('Invalid symbol');
            }
            this.price = +parsedResp["Global Quote"]["05. price"];
            this.errorMsg = null;
        }).catch((err: Error) => {
            this.errorMsg = err.message;
        }).finally(() => this.isLoading = false);
    }

    @Watch('stockSymbol')
    onStockSymbolChange(newVal: string, oldVal: string) {
        if(newVal !== oldVal) {
            this.userInput = newVal;
            this.fetchPrice(this.userInput);
        }
    }
    // life cycle hook
    componentDidLoad() {
        if(this.stockSymbol) {
            this.fetchPrice(this.stockSymbol);
            this.userInput = this.stockSymbol;
            this.isValidInput = true;
        }
    }

    // listen zSymbolSelected event on the body to fetch the data using passing symbol
    @Listen('zSymbolSelected', { target: 'body' })
    onZSymbolSelected(e: CustomEvent) {
        this.stockSymbol = e.detail;
        this.userInput = e.detail;
        this.isValidInput = true;
    }

    // hostDate provide meta data about the host/custom component
    hostData() {
        return { class: this.errorMsg ? 'error' : '' };
    }
    render() {
        return(
            <div class="container">
                <form onSubmit={this.onFechPrice.bind(this)}>
                    <input type="text" name="symbol" id="symbol" value={this.userInput} onInput={this.onInput.bind(this)}/>
                    <button disabled={!this.isValidInput} class="btn">Fetch</button>
                </form> 
                { 
                    !this.isLoading && 
                    <div>
                        { this.errorMsg && <p>{this.errorMsg}</p> }
                        { !this.errorMsg && <p>Price: {this.price}</p> }
                    </div>
                }
                { this.isLoading && <z-loader></z-loader> }
            </div>
        );
    }
}