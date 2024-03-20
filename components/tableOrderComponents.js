

//Sheng-Yu
export let creatTableOrderEntry = (item, index) => {
    //console.log('ItemName:', item);
    const entryNumber = index + 1;
    return `
        <tr>
            <td>#${entryNumber}</td>
            <td style="font-weight:bold;">${item.name}</td>
            <td>
                <div class="Yu-itemQtyColumn">
                    <button id="qtyAddBtn_${item.product_id}" class="AddQtyButton">+</button>
                    <h3 id="qtyNumber_${item.product_id}">${item.quantity}</h3>
                    <button id="qtySubBtn_${item.product_id}" class="SubQtyButton">-</button>
                </div>
            </td>
            <label for="Yu-orderPrice">
                <td>
                    <div>
                        <h3>$</h3>
                        <input  id="Yu-orderPrice_${item.product_id}" class="Yu-itemPrice" name="price_per_unit" value="${item.price_per_unit}">
                        <button id="Yu-orderPriceBtn_${item.product_id}" class="Yu-itemPriceBtn">Save</button>
                    </div>
                </td>
                <td><textarea  id="Yu-orderItemComment_${item.product_id}" class="orderItem_Comment">${item.comment}</textarea ></td>
            </label>
            <td><button id="delOrderEntryBtn_${item.product_id}_${index}" class="delOrderEntryBtn">Del</button></td>

        </tr>
    `;
};



export let orderTable = (orderOfTableItems) => {
    let entries = orderOfTableItems.map(creatTableOrderEntry).join('')

    return `
    <div class="Yu-orderTableContainer">
    <table>
        <colgroup>
            <col style="width: 5%; ">
            <col style="width: 25%; ">
            <col style="width: 20%; ">
            <col style="width: 20%; ">
            <col style="width: 20%; ">
            <col style="width: 10%; ">
        </colgroup>
        <thead>
            <tr>
                <th>#</th>
                <th>ITEM</th>
                <th>Oty</th>
                <th>Price</th>
                <th>Comment</th>
                <th>Del</th>
            </tr>
        </thead>
        <tbody>
            ${entries}
        </tbody>
        </table>
    </div>
    `;
}