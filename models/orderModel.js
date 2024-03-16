import {
	getDataFromSessionStorage,
	setDataInSessionStorage,
} from '../utils.js';

export default class Order {
	constructor() {
		this.key = 'orders';
	}

	async initialize() {
		this.data = await getDataFromSessionStorage(this.key);
	}

	getOrder(order_id) {
		if (!this.data) {
			return null;
		}

		return this.data.find((order) => order.id == order_id);
	}

	getOrders(config = {}) {
		if (!this.data) {
			return [];
		} else if (config?.limit) {
			return this.data.slice(0, config.limit);
		} else {
			return this.data;
		}
	}

	getCurrentOrder() {
		let order =
			getDataFromSessionStorage('currentOrder') || this.createOrder({});
		return order;
	}
	createOrder({ userId }) {
		if (userId) {
			let users = sessionStorage.getItem('users');
			let user = JSON.parse(users).find((user) => user_id === userId);
			if (!user) {
				return 'User not found';
			}
		}

		let tables = getDataFromSessionStorage('tables');

		function getFirstEmptyTable(tables) {
			let table = tables.find((table) => table.status === 'available');
			if (table) {
				return table;
			}
			return null;
		}

		let table = getFirstEmptyTable(tables);

		if (!table) {
			return 'No empty table available';
		}

		const order = {
			id: this.data.length + 1,
			user_id: userId,
			items: [],
			date: Date.now(),
			number: this.data.length + 1,
			discount: 0,
			total: 0,
			paymentStatus: 'not_paid',
			status: 'not_submited',
			allowSplit: false,
			tableNumber: table?.id,
		};
		setDataInSessionStorage('currentOrder', order);

		this.data.push(order);
		setDataInSessionStorage(this.key, this.data);

		return order;
	}

	clearOrder(order_id) {
		// 1. Get order
		let order = this.getOrder(order_id);
		// 2. Check if order exists
		if (!order) {
			return 'Order not found';
		}
		// 3. Clear order
		let orderIndex = this.data.findIndex((order) => order.id === order_id);
		this.data[orderIndex].items = [];
		this.data[orderIndex].total = 0;
		// 4. Update session storage
		setDataInSessionStorage(this.key, this.data);
		setDataInSessionStorage('currentOrder', this.data[orderIndex]);

		return this.data[orderIndex];
	}

	restoreOrder(previousOrder) {
		// 1. Check if the previous order object is provided
		if (!previousOrder) {
			return 'Previous order data is missing';
		}

		// 2. Find the index of the order to be restored
		let orderIndex = this.data.findIndex(
			(order) => order.id === previousOrder.id
		);

		// 3. Check if order exists in the current data
		if (orderIndex === -1) {
			// If the order doesn't exist, it might have been removed or not yet added
			// Depending on your requirements, you could add the previousOrder back to this.data
			// For this example, we'll just add it back
			this.data.push(previousOrder);
		} else {
			// 4. Restore order items and total from the previousOrder
			this.data[orderIndex].items = previousOrder.items;
			this.data[orderIndex].total = previousOrder.total;
		}

		// 5. Update session storage
		setDataInSessionStorage(this.key, this.data);
		setDataInSessionStorage(
			'currentOrder',
			this.data[orderIndex] ?? previousOrder
		);

		return this.data[orderIndex] ?? previousOrder; // Return the restored order
	}

	submitOrder(order_id) {
		// 1. Find the order by its ID
		let orderIndex = this.data.findIndex(
			(order) => order.order_id === order_id
		);

		// 2. Check if the order exists
		if (orderIndex === -1) {
			return 'Order not found';
		}

		// 3. Update the order status
		this.data[orderIndex].status = 'submitted';

		// 4. Update session storage to reflect the change
		setDataInSessionStorage(this.key, this.data);

		sessionStorage.clear('currentOrder');

		return `Order ${order_id} submitted`;
	}

	addItemToOrder({ order_id, product_id, quantity = 1 }) {
		// 1. Get order

		let order = this.getOrder(order_id);
		if (!order) {
			return 'Order not found';
		}

		// 2. Get beer
		let beers = getDataFromSessionStorage('beers');
		// 3. Check if beer exists
		let beer = beers.find((beer) => beer.nr === product_id);
		if (!beer) {
			return 'Beer not found';
		}
		// 4. Check if quantity is available
		// if (quantity > beer.stock) {
		// 	return 'Not enough stock';
		// }

		// 5. Add item to order
		let orderIndex = this.data.findIndex((order) => {
			return order.id == order_id;
		});

		let itemIndex = this.data[orderIndex].items.findIndex((item) => {
			return item.product_id == product_id;
		});

		if (itemIndex !== -1) {
			this.data[orderIndex].items[itemIndex].quantity += quantity;
		} else {
			this.data[orderIndex].items.push({
				product_id: product_id,
				name: beer.namn,
				quantity,
				price_per_unit: beer.prisinklmoms,
				paid: false,
			});
		}

		// Calculate new total
		let newItemTotal = quantity * beer.prisinklmoms;
		this.data[orderIndex].total += newItemTotal;

		setDataInSessionStorage('currentOrder', this.data[orderIndex]);

		// 6. Update session storage
		setDataInSessionStorage(this.key, this.data);
		// Update stock

		return this.data[orderIndex];
	}

	removeFromOrder({ order_id, product_id, quantity = 1 }) {
		// Find the index of the order with the specified order_id
		const orderIndex = this.data.findIndex((order) => order.id === order_id);
		if (orderIndex === -1) {
			return 'Order not found'; // Return an error message if no matching order is found
		}
		let order = this.data[orderIndex];

		// Find the index of the item with the specified product_id within the found order
		const itemIndex = order.items.findIndex(
			(item) => item.product_id === product_id
		);
		if (itemIndex === -1) {
			return 'Item not found in order'; // Return an error message if no matching item is found
		}
		let item = order.items[itemIndex];

		// Validate that the requested quantity to remove does not exceed the item's current quantity
		if (quantity > item.quantity) {
			return 'Invalid quantity'; // Return an error message if the requested quantity is invalid
		}

		// Remove the item from the order or update its quantity based on the specified quantity
		if (quantity === item.quantity) {
			// If the specified quantity equals the item's quantity, remove the item entirely
			this.data[orderIndex].items.splice(itemIndex, 1);
		} else {
			// Otherwise, reduce the item's quantity by the specified amount
			this.data[orderIndex].items[itemIndex].quantity -= quantity;
		}

		// Calculate the total value of the removed items
		let removedItemTotal = item.price_per_unit * quantity;
		// Adjust the order's total price by subtracting the value of the removed items
		this.data[orderIndex].total -= removedItemTotal;

		// Update the individual order in session storage with the new total
		setDataInSessionStorage('currentOrder', this.data[orderIndex]);

		// Update the entire data array in session storage to reflect the changes
		setDataInSessionStorage(this.key, this.data);

		return order; // Return the updated order object
	}

	enableSplitBillForOrder(order_id) {
		// 1. Get order
		let orderIndex = this.data.findIndex(
			(order) => order.order_id === order_id
		);

		// 2. Check if order exists
		if (orderIndex === -1) {
			return 'Order not found';
		}

		// 3. Set split_bill to true
		this.data[orderIndex].split_bill = true;

		// 4. Update session storage
		setDataInSessionStorage(this.key, this.data);

		return `Split bill enabled for order ${order_id}`;
	}

	disableSplitBillForOrder(order_id) {
		// 1. Get order
		let orderIndex = this.data.findIndex(
			(order) => order.order_id === order_id
		);

		// 2. Check if order exists
		if (orderIndex === -1) {
			return 'Order not found';
		}

		// 3. Set split_bill to false
		this.data[orderIndex].split_bill = false;

		// 4. Update session storage
		setDataInSessionStorage(this.key, this.data);

		return `Split bill disabled for order ${order_id}`;
	}

	markOrderAsPaid(order_id) {
		// 1. Find the order by its ID
		let orderIndex = this.data.findIndex(
			(order) => order.order_id === order_id
		);

		// 2. Check if the order exists
		if (orderIndex === -1) {
			return 'Order not found';
		}

		// 3. Update the payment_status to 'paid'
		this.data[orderIndex].payment_status = 'paid';

		// 5. Update session storage to reflect the change
		setDataInSessionStorage(this.key, this.data);

		return `Payment status updated to 'paid' for order ${order_id}`;
	}

	updateOrderStatus(order_id, newStatus) {
		// 1. Find the order by its ID
		let orderIndex = this.data.findIndex(
			(order) => order.order_id === order_id
		);

		// 2. Check if the order exists
		if (orderIndex === -1) {
			return 'Order not found';
		}

		// 3. Update the order status
		this.data[orderIndex].status = newStatus;

		// 4. Update session storage to reflect the change
		setDataInSessionStorage(this.key, this.data);

		return `Order status updated to '${newStatus}' for order ${order_id}`;
	}

	getItemOrderStock(item_id) {
		let items = getDataFromSessionStorage('items');

		let itemObject = items.find((item) => item.id === item_id);
		if (!itemObject) {
			return 'Item not found';
		}
		return itemObject.stock;
	}

	removeOrder(order_id) {
		// 1. Find the order by its ID
		let orderIndex = this.data.findIndex(
			(order) => order.order_id === order_id
		);

		// 2. Check if the order exists
		if (orderIndex === -1) {
			return 'Order not found';
		}

		// 3. Remove the order
		this.data.splice(orderIndex, 1);

		// 4. Update session storage to reflect the change
		setDataInSessionStorage(this.key, this.data);

		return true;
	}

	payWithCredit(order_id, user_id) {
		let orderIndex = this.data.findIndex((order) => order.id === order_id);
		let order = this.getOrder(order_id);
		if (!order) {
			return 'Order not found';
		}
		let users = getDataFromSessionStorage('users');

		let userIndex = users.findIndex((user) => user.id === user_id);
		let user = users[userIndex];
		if (!user) {
			return 'User not found';
		}

		let total = order.items.reduce(a, b, a + b.price_per_unit * b.quantity, 0);
		if (user.credit < total) {
			return 'Not enough credit';
		}
		user.credit -= order.total;
		users[userIndex] = user;
		setDataInSessionStorage('users', users);
		order.paymentStatus = 'paid';
		this.data[orderIndex] = order;
		setDataInSessionStorage(this.key, this.data);
		return true;
	}
}
