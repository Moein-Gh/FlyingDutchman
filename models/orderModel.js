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

	getOrder(nr) {
		if (!this.data) {
			return null;
		}
		return this.data.find((order) => order.nr === nr);
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
}
