import Beer from '../models/beerModel.js';
import { renderHome } from '../views/homeView.js';

export async function HomeController() {
	let beerModel = new Beer();
	await beerModel.initialize();

	let MenuPageBeers = beerModel.getBeers({ limit: 20 });

	renderHome({ beers: MenuPageBeers });
}
