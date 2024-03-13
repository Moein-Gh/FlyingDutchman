import { renderTableOrder } from "../views/tableOrderView.js";
import Order from '../models/orderModel.js';
import { CommandStack } from '../CommandStack.js';// for redo/undo


// Sheng-Yu
export async function TableOrderController(CommandStack) {
    let orderModel = new Order();
    await orderModel.initialize();

    let orderOfTable = orderModel.getCurrentOrder();
    renderTableOrder({ orderOfTable: orderOfTable });

}


