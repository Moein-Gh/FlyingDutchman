import Beer from '../models/beerModel.js';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import { renderMenu } from '../views/menuView.js';

import { userController } from './userController.js';

export async function MenuController(commandStack) {
	let beerModel = new Beer();
	await beerModel.initialize();

	let orderModel = new Order();
	await orderModel.initialize();

	let currentOrder = orderModel.getCurrentOrder();

	let MenuPageBeers = beerModel.getBeers({ limit: 20 });

	let language = sessionStorage.getItem('language');

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
					value: args,
					undoValue: args,
					orderModel: orderModel,
					execute: async function (args) {
						await this.orderModel.addItemToOrder(args);
						MenuController(commandStack);
					},
					undo: async function (args) {
						await this.orderModel.removeFromOrder(args);
						MenuController(commandStack);
					},
				};
				commandStack.execute(addItemCommand);
			});
		});

		let AddButtonsInOrder = document.querySelectorAll('.currentOrderAddButton');
		AddButtonsInOrder.forEach((button) => {
			button.addEventListener('click', async () => {
				let beerId = button.id.split('_')[1];
				let args = {
					order_id: currentOrder.id,
					product_id: beerId,
					quantity: 1,
				};
				const addItemCommand = {
					value: args,
					undoValue: args,
					orderModel: orderModel,
					execute: async function (args) {
						await this.orderModel.addItemToOrder(args);
						MenuController(commandStack);
					},
					undo: async function (args) {
						await this.orderModel.removeFromOrder(args);
						MenuController(commandStack);
					},
				};
				commandStack.execute(addItemCommand);
			});
		});

		let removeButtons = document.querySelectorAll('.currentOrderRemoveButton');
		removeButtons.forEach((button) => {
			button.addEventListener('click', async () => {
				let beerId = button.id.split('_')[1];
				let args = {
					order_id: currentOrder.id,
					product_id: beerId,
					quantity: 1,
				};
				const removeItemCommand = {
					value: args, // Defines the arguments for adding/removing an item
					undoValue: args, // Stores the same arguments for undo operation
					orderModel: orderModel, // Reference to the order model, assuming it's defined in your context
					execute: async function (args) {
						// Logic to remove an item from the order
						await this.orderModel.removeFromOrder(args);
						MenuController(commandStack); // Assuming this updates your UI accordingly
					},
					undo: async function (args) {
						// Logic to add an item back to the order (undo the remove action)
						await this.orderModel.addItemToOrder(args);
						MenuController(commandStack); // Assuming this updates your UI accordingly
					},
				};
				commandStack.execute(removeItemCommand);
			});
		});

		let ClearButton = document.querySelector('.clearButton');
		ClearButton.addEventListener('click', async () => {
			let args = {
				order_id: currentOrder.id,
			};
			const clearOrderCommand = {
				value: args, // Use args to keep the pattern consistent
				undoValue: args, // Even though it's the same for simplicity, it maintains the pattern
				orderModel: orderModel, // Assuming orderModel is accessible in this context
				execute: async function (args) {
					// Save the current state of the order before clearing it
					this.previousOrderState = {
						...this.orderModel.getOrder(args.order_id),
					};
					await this.orderModel.clearOrder(args.order_id);
					MenuController(commandStack);
				},
				undo: async function (args) {
					// Restore the order to its previous state
					// This assumes there's a method to replace the order's data entirely or you might need to adjust this logic based on your actual orderModel methods
					if (this.previousOrderState) {
						await this.orderModel.restoreOrder(this.previousOrderState);
						MenuController(commandStack);
					}
				},
			};
			commandStack.execute(clearOrderCommand);
		});

		let beerImages = document.querySelectorAll('.beer-card');
		beerImages.forEach((image) => {
			image.addEventListener('dragstart', (e) => {
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
			let dropArgs = {
				order_id: currentOrder.id,
				product_id: beerId,
				quantity: 1,
			};
			const addItemByDropCommand = {
				value: dropArgs,
				undoValue: dropArgs,
				orderModel: orderModel,
				execute: async function (dropArgs) {
					await this.orderModel.addItemToOrder(dropArgs);
					MenuController(commandStack);
				},
				undo: async function (dropArgs) {
					await this.orderModel.removeFromOrder(dropArgs);
					MenuController(commandStack);
				},
			};
			commandStack.execute(addItemByDropCommand);
			MenuController(commandStack);
		});

		let undoButton = document.querySelector('#undo');
		undoButton.addEventListener('click', async () => {
			commandStack.undo();
		});
		let redoButton = document.querySelector('#redo');
		redoButton.addEventListener('click', async () => {
			commandStack.redo();
		});

		let submitButton = document.querySelector('.submitButton');
		submitButton.addEventListener('click', async () => {
			orderModel.submitOrder(currentOrder.id);
			MenuController(commandStack);
		});

		let submitOrderBtn = document.querySelector('.submitButton');

		submitOrderBtn.addEventListener('click', function () {
			const currentOrder = orderModel.getCurrentOrder();
			let id = currentOrder.id;

			let result = orderModel.submitOrder(id);
			if (result) window.location.hash = '#/orderSummary';
		});
	}
}
