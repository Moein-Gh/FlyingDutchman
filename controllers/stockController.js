import { renderStock } from '../views/stockView.js';
import Beer from '../models/beerModel.js';

export async function StockController() {
	let beerModel = new Beer();
	await beerModel.initialize();

	let StockPageBeers = beerModel.getBeers({ limit: 50 });

	let language = sessionStorage.getItem('language');

	renderStock({ beers: StockPageBeers });
}
