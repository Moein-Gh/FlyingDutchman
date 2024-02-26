import LoginModel from '../models/userModel.js';
import { renderLogin } from '../views/loginView.js';

export async function loginController() {
	let loginModel = new LoginModel();
	function login() {
		let loginPage = loginModel.login();
	}

	renderLogin();

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
}
