import { dictionary } from '../dictionary.js';
export function renderOrderSummary(data) {
	const appContainer = document.getElementById('app');

	appContainer.innerHTML = `
	<div class="summary-container">
	<div class="summary-header">${
		dictionary.OrderSummary[sessionStorage.getItem('language') || 'en']
	}</div>
	<div class="summary-row"><strong>${
		dictionary.OrderNumber[sessionStorage.getItem('language') || 'en']
	}:</strong> ${data.orderNumber}</div>
	<div class="summary-row"><strong>${
		dictionary.CustomerName[sessionStorage.getItem('language') || 'en']
	}:</strong> ${data.customerName}</div>
	<div class="summary-row"><strong>${
		dictionary.ShippingAdress[sessionStorage.getItem('language') || 'en']
	}:</strong> ${data.shippingAddress}</div>
	${data.items
		.map(
			(item) => `
			<div class="summary-row">
					<div>${item.quantity} x ${item.name}</div>
					<div>${item.price}</div>
			</div>
	`
		)
		.join('')}
	<div class="summary-footer">
			<strong>${
				dictionary.Total[sessionStorage.getItem('language') || 'en']
			}:</strong>
			<strong>${data.total}</strong>
	</div>
</div>
	`;
}
