import { menuContainer } from '../components/menuComponents.js';
import { orderContainer } from '../components/orderComponents.js';

export function renderHome(data) {
	const appContainer = document.getElementById('app');

	appContainer.innerHTML = `
		<div class="row">
	
			<div id="menu-container" class="col-9">${menuContainer(data)}</div>
			<div id="order-container" class="col-3">${orderContainer(data)}</div>
		</div>
	`;
}
