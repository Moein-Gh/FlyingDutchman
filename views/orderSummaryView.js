export function renderOrderSummary(data) {
	const appContainer = document.getElementById('app');

	appContainer.innerHTML = `
	<div class="summary-container">
	<div class="summary-header">Order Summary</div>
	<div class="summary-row"><strong>Order Number:</strong> ${
		data.orderNumber
	}</div>
	<div class="summary-row"><strong>Customer Name:</strong> ${
		data.customerName
	}</div>
	<div class="summary-row"><strong>Shipping Address:</strong> ${
		data.shippingAddress
	}</div>
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
			<strong>Total:</strong>
			<strong>${data.total}</strong>
	</div>
</div>
	`;
}
