import Beer from '../models/beerModel.js';
import Order from '../models/orderModel.js';
import { renderMenu } from '../views/menuView.js';
import { CommandStack } from '../CommandStack.js';

export async function MenuController(commandStack) {
	let beerModel = new Beer();
	await beerModel.initialize();

	let orderModel = new Order();
	await orderModel.initialize();

	let currentOrder = orderModel.getCurrentOrder();

	let MenuPageBeers = beerModel.getBeers({ limit: 20 });

	renderMenu({ beers: MenuPageBeers, currentOrder: currentOrder });
	addButtonELs({ beerModel, orderModel, commandStack });

	function addButtonELs({ beerModel, orderModel, commandStack }) {
		let AddButton = document.querySelectorAll('.AddButton');

		AddButton.forEach((button) => {
			button.addEventListener('click', async () => {
				let beerId = button.id;
				let args = {
					order_id: currentOrder.id,
					product_id: beerId,
					quantity: 1,
				};
				const addItemCommand = {
					execute: async (args) => {
						await orderModel.addItemToOrder(args);
						MenuController(commandStack);
					},
					undo: async (args) => {
						await orderModel.removeItemFromOrder(args);
						MenuController(commandStack);
					},
					value: args,
					undoValue: args,
				};
				commandStack.execute(addItemCommand);
			});
		});

		let removeButton = document.querySelectorAll('.currentOrderRemoveButton');
		removeButton.forEach((button) => {
			button.addEventListener('click', async () => {
				let beerId = button.id.split('_')[1];
				const removeItemCommand = {
					execute: async (item) => {
						await orderModel.removeFromOrder(item);
						MenuController(commandStack);
					},
					redo: async (item) => {
						await orderModel.removeFromOrder(item);
						MenuController(commandStack);
					},
					undo: async (item) => {
						await orderModel.addItemToOrder(item);
						MenuController(commandStack);
					},
					value: {
						order_id: currentOrder.id,
						product_id: beerId,
						quantity: 1,
					},
				};
				const commandStack = new CommandStack();
				commandStack.execute(removeItemCommand);
			});
		});

		let ClearButton = document.querySelector('.clearAll');
		ClearButton.addEventListener('click', async () => {
			const clearOrderCommand = {
				execute: async (order_id) => {
					// Save the current state of the order before clearing it
					this.previousOrder = { ...orderModel.getOrder(order_id) };
					await orderModel.clearOrder(order_id);
					MenuController(commandStack);
				},
				undo: async (order_id) => {
					// Restore the order to its previous state
					orderModel.data.push(this.previousOrder);
					MenuController(commandStack);
				},
				value: currentOrder.id,
			};
			const commandStack = new CommandStack();
			commandStack.execute(clearOrderCommand);
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
			MenuController(commandStack);
		});

		let undoButton = document.querySelector('.order-undo');
		undoButton.addEventListener('click', async () => {
			const commandStack = new CommandStack();
			commandStack.undo();
		});
		let redoButton = document.querySelector('.order-redo');
		redoButton.addEventListener('click', async () => {
			const commandStack = new CommandStack();
			commandStack.redo();
		});
	}
}
