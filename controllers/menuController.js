import Beer from '../models/beerModel.js';
import { renderMenu } from '../views/menuView.js';

export async function MenuController() {
	let beerModel = new Beer();
	await beerModel.initialize();

	let MenuPageBeers = beerModel.getBeers({ limit: 20 });

	renderMenu({ beers: MenuPageBeers });
}
