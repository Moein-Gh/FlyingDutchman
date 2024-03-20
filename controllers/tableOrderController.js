
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
                let orderQuantity = orderOfTable.items[button.id.split('_')[2]].quantity;
                let args = {
                    order_id: orderOfTable.id,
                    product_id: productId,
                    quantity: orderQuantity,
                };
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

        // Checkout
        let CheckoutBtn = document.querySelector('#Yu-orderTableCheckoutBtn');
        CheckoutBtn.addEventListener('click', async () => {
            const orderOfTableID = orderOfTable.id;
            let args = { orderOfTableID };
            const checkoutCommand = {
                execute: async (args) => {
                    await orderModel.markOrderAsPaid(args);
                    TableOrderController(commandStack);
                },
                value: args,
                undoValue: args,
            };
            commandStack.execute(checkoutCommand);
        });


        // Change Item Price
        let priceChangeBtn = document.querySelectorAll('.Yu-itemPriceBtn');
        priceChangeBtn.forEach((button) => {
            button.addEventListener('click', async () => {
                let productId = button.id.split('_')[1];
                let newPrice = document.getElementById('Yu-orderPrice_' + productId)
                console.log("NewPrice:", newPrice.value);
                let args = {
                    order_id: orderOfTable.id,
                    product_id: productId,
                    new_price: newPrice.value,
                };
                //console.log("Args:", args);
                const changePriceCommand = {
                    execute: async (args) => {
                        await orderModel.changedOrderItemPrice(args);
                        TableOrderController(commandStack);
                    },
                    undo: async (args) => {
                        await orderModel.changedOrderItemPrice(args);
                        TableOrderController(commandStack);
                    },
                    value: args,
                    undoValue: args,
                };
                commandStack.execute(changePriceCommand);
            });
        });



        // Add Comment
        let checkoutBtn = document.getElementById('Yu-orderTableSaveBtn');
        checkoutBtn.addEventListener('click', async () => {
            console.log('clicked');
            let inputComments = document.querySelectorAll('.orderItem_Comment');
            inputComments.forEach((input) => {
                let productId = input.id.split('_')[1];
                let comment = document.getElementById('Yu-orderItemComment_' + productId)
                console.log("Comment:", comment.value);
                let args = {
                    order_id: orderOfTable.id,
                    product_id: productId,
                    comment: comment.value,
                };
                //console.log("Args:", args);
                const addOrderItemCommentCommand = {
                    execute: async (args) => {
                        await orderModel.addOrderItemComment(args);
                        TableOrderController(commandStack);
                    },
                    undo: async (args) => {
                        await orderModel.addOrderItemComment(args);
                        TableOrderController(commandStack);
                    },
                    value: args,
                    undoValue: args,
                };
                commandStack.execute(addOrderItemCommentCommand);
            })
        });

    }




}

