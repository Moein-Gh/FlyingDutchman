import { checkoutBox } from '../components/checkoutBoxComponent.js';
import { menuBook } from '../components/menubookComponent.js';
import Order from '../models/orderModel.js';

export function renderMenu(data) {
	const appContainer = document.getElementById('app');

	appContainer.innerHTML = `
	<div class=menu-page-container>
		
		<div class="menu-book">
			${menuBook(data)}
		</div>


		<div class="checkout-box">
			${checkoutBox(data?.currentOrder)}
		</div>

	</div>
	`;
}
