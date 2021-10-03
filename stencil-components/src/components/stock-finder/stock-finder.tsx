import { Component, State, h, Listen } from "@stencil/core";
import { AV_API_KEY } from '../../global/global';

@Component({
    tag: 'z-stock-finder',
    shadow: true,
    styleUrl: './stock-finder.css'
})
export class StockFinder {
    @State() stockName: HTMLInputElement;
    @State() searchResults: { name: string, symbol: string}[] = [];

    onFindStocks(e: Event) {
        e.preventDefault();
        const keyWord = this.stockName.value;
        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyWord}&apikey=${AV_API_KEY}`)
        .then(resp => resp.json())
        .then(resp => {
            this.searchResults = resp['bestMatches'].map(r => ({ Symbol: r['1. symbol'], name: r['2. name']}));
        })
    }

    render() {
        return [
            <form onSubmit={this.onFindStocks.bind(this)}>
                <input type="text" name="symbol" id="symbol" ref={el => this.stockName = el}/>
                <button>Find</button>
            </form>,
            <div>
                <ul>
                    { this.searchResults.map(r => (
                            <li>{r.name}</li>
                        ))
                    }
                </ul>
            </div>
        ];
    }
}