//Alan
// const createRow = (item) => {
// 	return `
//     <tr>
//         <td style="font-weight:bold;">${item.name}</td>
//         <td>
//             <div style="display: flex; flex:none">
//                 <button id="currentOrderAddButton_${item.product_id}" class="currentOrderAddButton"  style=" flex:none; width:30%; border-radius: 5px;">+</button>
//                 <h5 style=" flex:none; width:40%; text-align: center">${item.quantity}</h5>
//                 <button id="currentOrderRemoveButton_${item.product_id}" class="currentOrderRemoveButton" style=" flex:none; width:30%; border-radius: 5px;">-</button>
//             </div>
//         </td>
//         <td>${item.price_per_unit}</td>
//     </tr>
// `;
// };

import { orderUndoRedo } from './undoRedoComponents.js';
import { dictionary } from '../dictionary.js';
// export let checkoutBox = (currentOrder) => {
// 	let rows = currentOrder.items.map(createRow).join('');

// 	return `
//         <div class="checkout-box-title-container">
//             <h1>Order</h1>
//             <button class="clearAll">Clear all</button>
//         </div>
//         <div class="checkbox-table-container">
//             <div class="checkbox-table">
//                 <table>
//                     <colgroup style="width: 100%">
//                         <col style="width: 60% ">
//                         <col style="width: 25% ">
//                         <col style="width: 15% ">
//                     </colgroup>
//                     <tr>
//                         <th style="text-align: left">Item</th>
//                         <th>Qty</th>
//                         <th>$$</th>
//                     </tr>
//                     ${rows}
//                 </table>
//             </div>
//         </div>
//         <hr>
//         <div class="checkout-box-bottom">
//             <h1>Total Price: ${Math.ceil(currentOrder.total) || 0}</h1>
//             <h3>Discount: -</h3>
//             <div class="checkbox-submit">
//                 <button class="submitButton" >Submit Order</button>
//             </div>
//         </div>
//     `;
// };

const createRow = (item) => {
	return `
    <div class="orderItem">
        <div class="orderItemName">${item.name}</div>
        <div class="orderItemQuantity">
        
        <button id="currentOrderAddButton_${item.product_id}" class="orderQuantityButton currentOrderAddButton">
        <h2>+</h2>
        </button>
        ${item.quantity}
        <button id="currentOrderRemoveButton_${item.product_id}" class="orderQuantityButton currentOrderRemoveButton"><h2>-</h2></button>
        </div>
        <div class="orderItemPrice">${item.price_per_unit}  SEK</div>
    </div>
`;
};

export function checkoutBox(currentOrder) {
	let rows = currentOrder.items.length
		? currentOrder.items.map(createRow).join('')
		: `<div class="emptyOrder">${
				dictionary.NoItemsInOrder[sessionStorage.getItem('language') || 'en']
		  }</div>`;

	return `
		<div class="orderContainer">
			<h1 class="order-title">${
				dictionary.Order[sessionStorage.getItem('language') || 'en']
			}</h1>
			<br />
			<div class="orderItemsContainer">
				${orderUndoRedo(currentOrder)}
				<div class=${
					dictionary.OrderItems[sessionStorage.getItem('language') || 'en']
				}>${rows}</div>

				<div class="orderBottomContainer">
					<div class="orderBottomText">
						<h3>${dictionary.Total[sessionStorage.getItem('language') || 'en']} : ${
		Math.ceil(currentOrder.total) || 0
	} SEK</h3>
						<h4>${dictionary.Discount[sessionStorage.getItem('language') || 'en']} : -</h4>
					</div>
					<div class="orderSubmitContainer">
						<button class="orderButton submitButton">${
							dictionary.SubmitOrder[sessionStorage.getItem('language') || 'en']
						}</button>
					</div>
				</div>
			</div>
		</div>
	`;
}
