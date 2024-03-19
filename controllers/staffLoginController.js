import UserModel from '../models/userModel.js';

import LoginModel from '../models/userModel.js';
import { handleRouteChange } from '../router.js';
import { renderLogin } from '../views/loginView.js';
import { renderStaffLogin } from '../views/staffLoginView.js';
import { MenuController } from './menuController.js';

export async function staffLoginController(commandStack) {
	let userModel = new UserModel();
	await userModel.initialize();
	// let userModel = new userModel();

	// function login() {
	// 	let loginPage = userModel.login();
	// }

	renderStaffLogin();
	addELs({ userModel });

	// const loginButton = document.getElementById('login-form');
	// loginButton.addEventListener('submit', (e) => {
	// 	e.preventDefault();
	// 	userModel.login();
	// });

	function addELs({ userModel }) {
		const loginForm = document.querySelector('.staff-login-form');
		loginForm.addEventListener('submit', async (e) => {
			e.preventDefault();
			const username = document.getElementById('staff-username').value;
			const password = document.getElementById('staff-password').value;
			const user = await userModel.login(username, password, '0');
			if (user) {
				window.location.hash = 'orders';
				handleRouteChange();
			} else {
				alert('Invalid username or password');
			}
		});
	}
}
