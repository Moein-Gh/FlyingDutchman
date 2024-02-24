import { renderLogin } from '../views/loginView.js';

export async function loginController() {
	let loginModel = new login();
	await loginModel.initialize();

	let loginPage = loginModel.login();

	renderLogin({ login: loginPage });
}
