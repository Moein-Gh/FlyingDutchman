import { loadJSON } from '../utils.js';

export default class Order {
	constructor() {
		this.src =
			'../Dutchman Files/DBFilesJSON/DBFilesJSON/dutchman_table_orders.json';
		this.data = null;

		this.initialize();
	}

	async initialize() {
		this.data = await loadJSON(this.src);
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
}
