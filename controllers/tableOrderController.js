import { renderTableOrder } from "../views/tableOrderView.js";
import Order from '../models/orderModel.js';
import { CommandStack } from '../CommandStack.js';// for redo/undo


// Sheng-Yu
export async function TableOrderController(commandStack) {
    let orderModel = new Order();
    await orderModel.initialize();



    let orderOfTable = orderModel.getCurrentOrder();
    renderTableOrder({ orderOfTable: orderOfTable });

    console.log("orderOfTable:", orderOfTable);
    //console.log("orderOfTableID:", orderOfTable.id);

    qtyButtonELs({ orderModel, commandStack });
    function qtyButtonELs({ orderModel, commandStack }) {
        // Qty Add Btn
        let AddQtyButton = document.querySelectorAll('.AddQtyButton');
        AddQtyButton.forEach((button) => {
            button.addEventListener('click', async () => {
                let productId = button.id.split('_')[1];
                //console.log("TestGetPIDfromBtnID:", productId);
                let args = {
                    order_id: orderOfTable.id,
                    product_id: productId,
                    quantity: 1,
                };
                const addItemCommand = {
                    execute: async (args) => {
                        await orderModel.addItemToOrder(args);

                        TableOrderController(commandStack);
                    },
                    undo: async (args) => {
                        await orderModel.removeItemFromOrder(args);
                        TableOrderController(commandStack);
                    },
                    value: args,
                    undoValue: args,
                };
                commandStack.execute(addItemCommand);
            });
        });


        // Qty Sub Btn
        let SubQtyButton = document.querySelectorAll('.SubQtyButton');
        SubQtyButton.forEach((button) => {
            button.addEventListener('click', async () => {
                let productId = button.id.split('_')[1];
                //console.log("TestGetPIDfromBtnID:", productId);
                let args = {
                    order_id: orderOfTable.id,
                    product_id: productId,
                    quantity: -1,
                };
                const addItemCommand = {
                    execute: async (args) => {
                        await orderModel.addItemToOrder(args);
                        TableOrderController(commandStack);
                    },
                    undo: async (args) => {
                        await orderModel.removeItemFromOrder(args);
                        TableOrderController(commandStack);
                    },
                    value: args,
                    undoValue: args,
                };
                commandStack.execute(addItemCommand);
            });
        });

        // Entry Del Btn
        let EntryDelButton = document.querySelectorAll('.delOrderEntryBtn');
        EntryDelButton.forEach((button) => {
            button.addEventListener('click', async () => {
                let productId = button.id.split('_')[1];
                let orderQuantity = orderOfTable.items[productId].quantity;
                let args = {
                    order_id: orderOfTable.id,
                    product_id: productId,
                    quantity: orderQuantity,
                };
                //tmp
                const removeFromOrderCommand = {
                    execute: async (args) => {
                        await orderModel.removeFromOrder(args);
                        TableOrderController(commandStack);
                    },
                    undo: async (args) => {
                        await orderModel.removeFromOrder(args);
                        TableOrderController(commandStack);
                    },
                    value: args,
                    undoValue: args,
                };
                commandStack.execute(removeFromOrderCommand);
            });
        });


    }

}


