import { getDataFromSessionStorage, loadJSON } from '../utils.js';

export default class Beer {
	constructor() {
		this.key = 'beers';
	}

	async initialize() {
		this.data = await getDataFromSessionStorage(this.key);
	}

	getBeer(nr) {
		if (!this.data) {
			return null;
		}
		return this.data.find((beer) => beer.nr === nr);
	}

	getBeers(config = {}) {
		if (!this.data) {
			return [];
		} else if (config?.limit) {
			return this.data.slice(0, config.limit);
		} else {
			return this.data;
		}
	}
}
