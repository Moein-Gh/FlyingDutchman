import { creatTableOrderEntry } from '../components/tableOrderComponents.js';
import { orderTable } from '../components/tableOrderComponents.js';

// Sheng-Yu
export function renderTableOrder(orderOfTable) {
    const appContainer = document.getElementById('app');
    //console.log('OrderOfTable:', orderOfTable);
    //console.log('OrderOfTable-TableNumber:', orderOfTable.orderOfTable.tableNumber);
    //console.log('OrderOfTable-PaymentStatus:', orderOfTable.orderOfTable.paymentStatus);

    appContainer.innerHTML = `
    <div class="Yu-orderPageTitle">
        <button>← Back To Table</button>
        <h1>Order ID: ${orderOfTable.orderOfTable.id} / Table ${orderOfTable.orderOfTable.tableNumber}</h1>
        <div>
        <h6>Payment Status: </h6>
        <h2>${orderOfTable.orderOfTable.paymentStatus}</h2>
        </div>
    </div>
    <!-- <h1 class="Yu-orderPageTitle">{Order}/ {Table}</h1> -->

    <section class="Yu-orderSectionContainer">
        <!-- Order List Table -->
        ${orderTable(orderOfTable.orderOfTable.items)}

                    


        <!-- Total Price/ Split Bill/Submit/ Checkout -->
        <div class="Yu-orderSectionBottomContainer">
            <div class="Yu-orderSectionBottomRow_1">
                <h1>Total: &nbsp;</h1>
                <h1>Total Price: ${Math.ceil(orderOfTable.orderOfTable.total) || 0}</h1>
            </div>
            <div class="Yu-orderSectionBottomRow_2">
                <h1>Split Bill</h1>
                <input name="splitBillPpl" value="0">
                <h1>ppl.</h1>
            </div>
            <div class="Yu-orderSectionBottomRow_3">
                <button id = "Yu-orderTableSaveBtn">Save & Submit</button>
                <button id = "Yu-orderTableCheckoutBtn">Checkout</button>
            </div>

        </div>



    </section>
  `;
}
