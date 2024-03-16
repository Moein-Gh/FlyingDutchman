import orderModel from '../models/orderModel.js';
import { renderOrders } from '../views/ordersView.js';

export async function orderController() {
	let order = new orderModel();
	await order.initialize();

	let orders = order.getOrders();
	console.log(orders)
	renderOrders(orders);
}
