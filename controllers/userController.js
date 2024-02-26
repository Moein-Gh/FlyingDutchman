<<<<<<< HEAD
import UserModel from '../models/userModel.js';
=======
import LoginModel from '../models/userModel.js';
>>>>>>> ef5ec56f59d11c1bd887c0901588465f96c931bc
import { renderLogin } from '../views/loginView.js';

export async function userController() {
	// let userModel = new userModel();

	// function login() {
	// 	let loginPage = userModel.login();
	// }

	renderLogin();

<<<<<<< HEAD
	// const loginButton = document.getElementById('login-form');
	// loginButton.addEventListener('submit', (e) => {
	// 	e.preventDefault();
	// 	userModel.login();
	// });
=======
	const loginButton = document.getElementById('login-button');
	const checkouwithoutloginButton = document.getElementById('checkout-without-login-button');
	const checkoutbutton = document.getElementById('checkout-button');

	loginButton.addEventListener('submit', (e) => {
		e.preventDefault();
		if(loginModel.login(e.target.username.value, e.target.password.value)){
			location.href = '/menu';
		
		};
	});
//send to the menu page, no user is necessary for this button.	
	checkouwithoutloginButton.addEventListener('click', (e) => {
		location.href = '/menu';
	});
	checkoutbutton.addEventListener('click', (e) => {
		location.href = '/menu';
	});
>>>>>>> ef5ec56f59d11c1bd887c0901588465f96c931bc
}
