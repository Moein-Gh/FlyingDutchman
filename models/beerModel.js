import { loadJSON } from '../utils.js';

export default class Beer {
	constructor() {
		this.src =
			'../Dutchman Files/DBFilesJSON/DBFilesJSON/dutchman_table_sbl_beer.json';
		this.data = null;

		this.initialize();
	}

	async initialize() {
		this.data = await loadJSON(this.src);
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
