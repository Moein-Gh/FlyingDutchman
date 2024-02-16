import { beerList } from '../components/beerComponents.js';

export function renderMenu(data) {
	const appContainer = document.getElementById('app');

	appContainer.innerHTML = `
		<div class="container">
			${beerList(data?.beers)}
		</div>
	`;
}
