import { loginForm } from '../components/loginComponent.js';

export function renderLogin(data) {
	const appContainer = document.getElementById('app');

	appContainer.innerHTML = `
		<div class="container">
			${loginForm(data.login)}
		</div>
	`;
}
