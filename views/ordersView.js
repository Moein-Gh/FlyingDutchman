// export function renderOrders(orders) {
// const appContainer = document.getElementById('app');
// let order = orders[0]
// const orderNumber = `
//     <div class="order-number">
//       Order #${order.id}
//     </div>
//   `;

//   const orderDetails = `
//     <div class="inner-box">
//       <div class="order-detail">Items: ${order.items.length}</div>
//       <div class="order-detail">Total: 100</div>
//       <div class="order-detail">Table: ${order.table_id ? order.table_id : 'N/A'}</div>
//     </div>
//   `;

//   const buttons = `
//     <div class="buttons">
//       <button>Edit</button>
//       <button>Delete</button>
//     </div>
//   `;
// 	appContainer.innerHTML = `
// 	<div class="order-box">
// 	${orderNumber}
// 	${orderDetails}
// 	${buttons}
//     </div>
// 	`;
// }

// function createOrderBox(order) {


//   const orderBox = `
//     <div class="order-box">
//       ${orderNumber}
//       ${orderDetails}
//       ${buttons}
//     </div>
//   `;

//   return orderBox;
// }

export function renderOrders(orders) {
	const appContainer = document.getElementById('app');
	console.log(orders);
	appContainer.innerHTML = ''; // Clear previous content

	let orderBoxes = '';
	for (const order of orders) { // Loop iterates through each order in the 'orders' array
		orderBoxes += createOrderBox(order);
	}

	appContainer.innerHTML = orderBoxes;
}

function createOrderBox(order) {
	const orderNumber = `
	  <div class="order-number">
		Order #${order.id}
	  </div>
	`;

	let orderPrice = 0;
	for (const item of order.items) {
		orderPrice += item.quantity * Number.parseFloat(item.price_per_unit);
	}


	const orderDetails = `
	  <div class="inner-box">
		<div class="order-detail">Items: ${order.items.length}</div>
		<div class="order-detail">Table: ${order.table_id ? order.table_id : 'N/A'}</div>
		<div class="order-detail">Price: ${orderPrice} SEk</div>
		</div>
	`;

	const buttons = `
	  <div class="buttons">
		<button><a href="#/table/order/${order.id}">Edit</a></button>
		<button>Delete</button>
	  </div>
	`;

	const orderBox = `
	  <div class="order-box">
		${orderNumber}
		${orderDetails}
		${buttons}
	  </div>
	`;

	return orderBox;
}
