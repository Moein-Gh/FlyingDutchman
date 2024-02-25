import Beer from '../models/beerModel.js';
import Order from '../models/orderModel.js';
import { renderHome } from '../views/homeView.js';

export async function HomeController() {
	let beerModel = new Beer();
	await beerModel.initialize();

	let MenuPageBeers = beerModel.getBeers({ limit: 20 });

	let orderModel = new Order();
	await orderModel.initialize();

	renderHome({ beers: MenuPageBeers });
}
