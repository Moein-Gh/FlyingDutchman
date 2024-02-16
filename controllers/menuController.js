import Beer from '../models/bearModel.js';
import { renderMenu } from '../views/menuView.js';

// Controller for the Menu view
export async function MenuController() {
	let beerModel = new Beer();
	await beerModel.initialize();

	let MenuPageBeers = beerModel.getBeers({ limit: 20 });

	renderMenu({ beers: MenuPageBeers });
}
