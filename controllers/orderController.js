import orderModel from '../models/orderModel.js';
import { renderOrders } from '../views/ordersView.js';

export async function orderController() {
	let order = new orderModel();
	await order.initialize();

	let orders = order.getOrders();

	renderOrders({ number: orders.length });
}
