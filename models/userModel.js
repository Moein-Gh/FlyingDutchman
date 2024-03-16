import {
	getDataFromSessionStorage,
	setDataInSessionStorage,
} from '../utils.js';

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
	login(username, password, roleCode) {
		if (!this.data) {
			//if there is no data
			return false;
		}
		const user = this.data.find((user) => {
			return user.username == username;
		});
		if (!user) {
			//if user is not found
			return false;
		}

		if (
			this.data.find((user) => user.credentials == roleCode) &&
			this.data.find((user) => user.password === password)
		) {
			let userObj = {
				id: user.user_id,
				firstName: user.first_name,
			};

			setDataInSessionStorage('loggedInCustomer', userObj);

			return true;
		}
		return false;
	}

	getLoggedInCustomer() {
		return getDataFromSessionStorage('loggedInCustomer');
	}
	changeRole(username, role) {
		const user = this.data.find((user) => user.username === username);
		if (!user) {
			return false;
		}
		user.credentials = role;
		return true;
	}

	logout() {
		sessionStorage.removeItem('loggedInCustomer');
	}
}
