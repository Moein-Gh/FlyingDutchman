import UserModel from '../models/userModel.js';

import LoginModel from '../models/userModel.js';
import { renderLogin } from '../views/loginView.js';

export async function userController() {
	// let userModel = new userModel();

	// function login() {
	// 	let loginPage = userModel.login();
	// }

	renderLogin();

	// const loginButton = document.getElementById('login-form');
	// loginButton.addEventListener('submit', (e) => {
	// 	e.preventDefault();
	// 	userModel.login();
	// });
}
