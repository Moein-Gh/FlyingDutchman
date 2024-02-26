import { getDataFromSessionStorage } from '../utils.js';

export default class UserModel {
	constructor() {
		this.key = 'users';
	}

	async initialize() {
		this.data = await getDataFromSessionStorage(this.key);
	}

	getUser(nr) {
		if (!this.data) {
			return null;
		}
		return this.data.find((beer) => beer.nr === nr);
	}

	getUsers(config = {}) {
		if (!this.data) {
			return [];
		} else if (config?.limit) {
			return this.data.slice(0, config.limit);
		} else {
			return this.data;
		}
	}
}
