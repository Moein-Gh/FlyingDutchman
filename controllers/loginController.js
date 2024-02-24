import LoginModel from '../models/loginModel.js';
import { renderLogin } from '../views/loginView.js';

export async function loginController() {
	let loginModel = new LoginModel();
	function login() {
		let loginPage = loginModel.login();
	}

	renderLogin();

	const loginButton = document.getElementById('login-form');
	loginButton.addEventListener('submit', (e) => {
		e.preventDefault();
		loginModel.login();
	});
}
