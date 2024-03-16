import UserModel from '../models/userModel.js';

import LoginModel from '../models/userModel.js';
import { handleRouteChange } from '../router.js';
import { renderLogin } from '../views/loginView.js';
import { MenuController } from './menuController.js';

export async function userController(commandStack) {
	let userModel = new UserModel();
	await userModel.initialize();
	// let userModel = new userModel();

	// function login() {
	// 	let loginPage = userModel.login();
	// }
	let language = sessionStorage.getItem('language');

	renderLogin();
	addELs({ userModel });

	// const loginButton = document.getElementById('login-form');
	// loginButton.addEventListener('submit', (e) => {
	// 	e.preventDefault();
	// 	userModel.login();
	// });

	function addELs({ userModel }) {
		const loginForm = document.querySelector('.login-form');
		loginForm.addEventListener('submit', async (e) => {
			e.preventDefault();
			const username = document.getElementById('username').value;
			const password = document.getElementById('password').value;
			const user = await userModel.login(username, password, '3');
			if (user) {
				window.location.hash = '/menu';
				handleRouteChange();
			} else {
				alert('Invalid username or password');
			}
		});
	}
}
