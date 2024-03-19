import beerModel from '../models/beerModel.js';
import { renderProduct } from '../views/productView.js';

export async function productController() {
	const id = sessionStorage.getItem('productId');
	let Beer = new beerModel();
	await Beer.initialize();

	let beer = Beer.getBeer(id);
	renderProduct(beer);
}
