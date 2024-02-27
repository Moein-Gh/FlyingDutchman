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
		return this.data.find((order) => order.id === order_id);
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

	async createOrder({ userId }) {
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
			paymentStatus: 'not_paid',
			status: 'not_submited',
			allowSplit: false,
			tableNumber: table?.id,
		};

		this.data.push(order);
		setDataInSessionStorage(this.key, this.data);
		return order;
	}

	async addItemToOrder({ order_id, product_id, quantity = 1 }) {
		// 1. Get order
		let order = this.getOrder(order_id);
		if (!order) {
			return 'Order not found';
		}
		// 2. Get beer
		let beers = getDataFromSessionStorage('beers');
		// 3. Check if beer exists
		let beer = beers.find((beer) => beer.id === product_id);
		if (!beer) {
			return 'Beer not found';
		}
		// 4. Check if quantity is available
		if (quantity > beer.stock) {
			return 'Not enough stock';
		}
		// 5. Add item to order
		let orderIndex = this.data.findIndex(
			(order) => order.order_id === order_id
		);
		this.data[orderIndex].items.push({
			product_id: product_id,
			quantity,
			price_per_unit: beer.price,
			paid: false,
		});

		// Calculate new total
		let newItemTotal = quantity * beer.price;
		this.data[orderIndex].total += newItemTotal;

		// 6. Update session storage
		setDataInSessionStorage(this.key, this.data);
		// Update stock
		let beerIndex = beers.findIndex((beer) => beer.id === product_id);
		beers[beerIndex].stock -= quantity;
		setDataInSessionStorage('beers', beers);

		return this.data[orderIndex];
	}

	async removeFromOrder({ order_id, product_id }) {
		// 1. Get order
		let order = this.getOrder(order_id);
		// 2. Check if order exists
		if (!order) {
			return 'Order not found';
		}
		// 3. Get item
		const orderIndex = this.data.findIndex(
			(order) => order.order_id === order_id
		);
		const itemIndex = order.items.findIndex(
			(item) => item.product_id === product_id
		);
		// 4. Check if item exists
		if (itemIndex === -1) {
			return 'Item not found in order';
		}
		let item = order.items[itemIndex];
		// 5. Remove item from order
		this.data[orderIndex].items.splice(itemIndex, 1);

		// Adjust total after removing item
		let removedItemTotal = item.quantity * item.price_per_unit;
		this.data[orderIndex].total -= removedItemTotal;

		// 6. Update session storage
		setDataInSessionStorage(this.key, this.data);

		// 7. Update stock
		let beers = getDataFromSessionStorage('beers');
		let beerIndex = beers.findIndex((beer) => beer.id === product_id);
		beers[beerIndex].stock += item.quantity;
		setDataInSessionStorage('beers', beers);

		return order;
	}

	async enableSplitBillForOrder(order_id) {
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

	async disableSplitBillForOrder(order_id) {
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

	async markOrderAsPaid(order_id) {
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

	async updateOrderStatus(order_id, newStatus) {
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

	async getItemOrderStock(item_id) {
		let items = getDataFromSessionStorage('items');

		let itemObject = items.find((item) => item.id === item_id);
		if (!itemObject) {
			return 'Item not found';
		}
		return itemObject.stock;
	}

	async submitOrder(order_id) {
		// 1. Find the order by its ID
		let order = this.data.find((order) => order.id === order_id);

		let orderItems = order.items;

		let notifications = getDataFromSessionStorage('notifications');
		for (item in orderItems) {
			let itemStock = this.getItemOrderStock(item.id);
			if (itemStock < 5) {
				notifications.push({
					id: notifications.length + 1,
					order_id: order_id,
					type: 'low_stock',
					userType: 'staff',
					message: 'Low stock alert for product',
					productId: item.id,
					notificationDate: Date.now(),
					status: 'unread',
				});
			}
		}

		let orderIndex = this.data.findIndex((order) => order.id === order_id);

		// 3. Update the order status
		this.data[orderIndex].status = 'submitted';

		// 4. Update session storage to reflect the change
		setDataInSessionStorage(this.key, this.data);

		return true;
	}
}
