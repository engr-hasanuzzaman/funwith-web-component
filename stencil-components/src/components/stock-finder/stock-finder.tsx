import { Component, State, h } from "@stencil/core";
import { AV_API_KEY } from '../../global/global';

@Component({
    tag: 'z-stock-finder',
    styleUrls: ['./stock-finder.css'],
    shadow: true,
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
            this.searchResults = resp['bestMatches'].map(r => ({ symbol: r['1. symbol'], name: r['2. name']}));
        })
    }

    render() {
        return (
            <div class="container">
                <form onSubmit={this.onFindStocks.bind(this)}>
                    <input type="text" name="symbol" id="symbol" ref={el => this.stockName = el}/>
                    <button class="btn">Find</button>
                </form>
                <ul class="search-item">
                    { this.searchResults.map(r => (
                            <li>
                                <strong>{r.symbol}</strong> - {r.name}
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
        ;
    }
}