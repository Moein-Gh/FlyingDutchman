import { renderStock } from '../views/stockView.js';
import Beer from '../models/beerModel.js';

export async function StockController() {
	let beerModel = new Beer();
	await beerModel.initialize();

	let StockPageBeers = beerModel.getBeers({ limit: 50 });
	// document.addEventListener('DOMContentLoaded', () => {});

	let language = sessionStorage.getItem('language');

	renderStock({ beers: StockPageBeers });

	const productButtons = document.querySelectorAll('.product-page-button');

	productButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const productId = button.id.split('_')[1];
			sessionStorage.setItem('productId', productId);
			window.location.hash = `/product`;
		});
	});
}
