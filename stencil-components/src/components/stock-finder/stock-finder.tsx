import { Component, State, h } from "@stencil/core";
import { AV_API_KEY } from '../../global/global';

@Component({
    tag: 'z-stock-finder',
    shadow: true,
    styleUrl: './stock-finder.css'
})
export class StockFinder {
    @State() stockName: HTMLInputElement;

    onFindStocks(e: Event) {
        e.preventDefault();
        const keyWord = this.stockName.value;
        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyWord}&apikey=${AV_API_KEY}`)
    }

    render() {
        return [
            <form onSubmit={this.onFindStocks.bind(this)}>
                <input type="text" name="symbol" id="symbol" ref={el => this.stockName = el}/>
                <button>Find</button>
            </form>,
            <div>
                <ul>
                    <li>Result will be shown in here</li>
                </ul>
            </div>
        ];
    }
}