import Beer from '../models/beerModel.js';
import Order from '../models/orderModel.js';
import { renderMenu } from '../views/menuView.js';

export async function MenuController() {
	let beerModel = new Beer();
	await beerModel.initialize();

	let orderModel = new Order();
	await orderModel.initialize();

	let currentOrder = orderModel.getCurrentOrder();

	let MenuPageBeers = beerModel.getBeers({ limit: 20 });

	renderMenu({ beers: MenuPageBeers, currentOrder: currentOrder });
	addButtonELs({ beerModel, orderModel });

	function addButtonELs({ beerModel, orderModel }) {
		let AddButton = document.querySelectorAll('.AddButton');

		AddButton.forEach((button) => {
			button.addEventListener('click', async () => {
				let beerId = button.id;
				await orderModel.addItemToOrder({
					order_id: currentOrder.id,
					product_id: beerId,
					quantity: 1,
				});
				MenuController();
			});
		});

		let ClearButton = document.querySelector('.clearAll');
		ClearButton.addEventListener('click', async () => {
			await orderModel.clearOrder(currentOrder.id);
			MenuController();
		});

		let beerImages = document.querySelectorAll('.beer-pic');
		beerImages.forEach((image) => {
			image.addEventListener('dragstart', (e) => {
				console.log('dragging');
				e.dataTransfer.setData('id', e.target.id);
			});
		});

		let checkOutBox = document.querySelector('.checkout-box');
		checkOutBox.addEventListener('dragover', (e) => {
			e.preventDefault();
		});

		checkOutBox.addEventListener('drop', function (e) {
			e.preventDefault();
			let data = e.dataTransfer.getData('id');
			let beerId = data.split('_')[1];
			orderModel.addItemToOrder({
				order_id: currentOrder.id,
				product_id: beerId,
				quantity: 1,
			});
			MenuController();
		});
	}
}
