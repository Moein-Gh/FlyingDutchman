import { loadJSON } from '../utils.js';

export default class LoginModel {
	constructor() {
		this.src =
			'../Dutchman Files/DBFilesJSON/DBFilesJSON/dutchman_table_user.json';
		this.username = '';
		this.password = '';
	}

	validate() {
		// Validate the input
		if (this.username === 'abc' && this.password === 'abc') {
			return true;
		} else {
			return false;
		}
	}

	login() {
		// Login operation
		if (this.validate()) {
			// Perform login operation
			console.log('Login successful');
		} else {
			console.log('Invalid username or password');
		}
	}
}
