import { beerList } from '../components/beerComponents.js';

export function renderHome(data) {
	const appContainer = document.getElementById('app');

	appContainer.innerHTML = `
		<div class="container">
			<h1>Welcome to flying dutchman</h1>
		</div>
	`;
}
