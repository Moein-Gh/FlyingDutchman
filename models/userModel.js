import { getDataFromSessionStorage } from '../utils.js';

export default class UserModel {
	constructor() {
		this.key = 'users';
	}

	async initialize() {
		this.data = await getDataFromSessionStorage(this.key);
	}
//Fix, should look for user id, not beer id.
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
	validate(username, password) {
		if (!this.data) {
			return false;
		}
		const user = this.data.find((user) => user.username === username);
		if (!user) {
			return false;
		}
		return user.password === password;
	}
	login(username, password) {
		if (!this.data) {//if there is no data
			return false;
		}
		const user = this.data.find((user) => user.username === username);
		if (!user) {//if user is not found
			return false;
		}

		if(this.data.find((user) => user.credentials === 0) && this.data.find((user) => user.password === password)){
			return 1;//admin
		}
		else{
			return 2;//user
		}
	}
}
