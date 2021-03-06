import { Component, State, h, Event, EventEmitter } from "@stencil/core";
import { AV_API_KEY } from '../../global/global';

@Component({
    tag: 'z-stock-finder',
    styleUrls: ['./stock-finder.css'],
    shadow: true,
})
export class StockFinder {
    @State() stockName: HTMLInputElement;
    @State() searchResults: { name: string, symbol: string}[] = [];
    @State() isLoading: boolean = false;
    @Event({ bubbles: true, composed: true }) zSymbolSelected: EventEmitter<string>;

    onSelectSybol(symbol: string) {
        this.zSymbolSelected.emit(symbol);
    }

    onFindStocks(e: Event) {
        e.preventDefault();
        const keyWord = this.stockName.value;
        this.isLoading = true;
        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyWord}&apikey=${AV_API_KEY}`)
        .then(resp => resp.json())
        .then(resp => {
            this.searchResults = resp['bestMatches'].map(r => ({ symbol: r['1. symbol'], name: r['2. name']}));
        }).finally(() => {
            this.isLoading = false;
        })
    }

    render() {
        return (
            <div class="container">
                <form onSubmit={this.onFindStocks.bind(this)}>
                    <input type="text" name="symbol" id="symbol" ref={el => this.stockName = el}/>
                    <button class="btn">Find</button>
                </form>
                { 
                    !this.isLoading && 
                    <ul class="search-item">
                        { this.searchResults.map(r => (
                                <li onClick={this.onSelectSybol.bind(this, r.symbol)}>
                                    <strong>{r.symbol}</strong> - {r.name}
                                </li>
                            ))
                        }
                    </ul>
                }
                { this.isLoading && <z-loader></z-loader> }
                
            </div>
        )
        ;
    }
}