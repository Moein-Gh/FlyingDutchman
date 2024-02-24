export let orderContainer = (data) => {
	return `
		<div class="col order-container">
			<h2>items</h2>
			<h6>Order #${data.orders.order_id}</h6>
			<p>Table: ${data.orders.table_id}</p>
			<p>Price: ${data.orders.total}</p>
		</div>
	`;
};
