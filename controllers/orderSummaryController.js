import orderModel from '../models/orderModel.js';
import { renderOrderSummary } from '../views/orderSummaryView.js';

export async function orderSummaryController() {
	const currentOrderId = sessionStorage.getItem('submittedOrderId');

	let Order = new orderModel();
	await Order.initialize();

	let order = Order.getOrder(currentOrderId);
	renderOrderSummary(order);
}
