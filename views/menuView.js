import { checkoutBox } from '../components/checkoutBoxComponent.js';
import { menuBook } from '../components/menubookComponent.js';
import { orderUndoRedo } from '../components/undoRedoComponents.js';

export function renderMenu(data) {
	const appContainer = document.getElementById('app');

	appContainer.innerHTML = `
	<div class=menu-page-container>
		
		<div class="menu-book">
			${menuBook(data)}
		</div>


		<div class="checkout-box">
			${orderUndoRedo(data?.currentOrder)}
			${checkoutBox(data?.currentOrder)}
		</div>

	</div>
	`;
}
