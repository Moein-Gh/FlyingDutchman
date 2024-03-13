

//Sheng-Yu
export let creatTableOrderEntry = (item, index) => {
    //console.log('ItemName:', item.name);
    const entryNumber = index + 1;
    return `
        <tr>
            <td>#${entryNumber}</td>
            <td style="font-weight:bold;">${item.name}</td>
            <td>
                <div>
                    <button onclick="">+</button>
                    <h3>${item.quantity}</h3>
                    <button onclick="">-</button>
                </div>
            </td>
            <td>
                <div>
                    <h3>$</h3><input id="Yu-orderPrice" name="orderPrice" value="${item.price_per_unit}">
                </div>
            </td>
            <td><input id="Yu-orderComment" name="orderComment" value="No Comment"></td>
            <td><button onclick="">Del</button></td>
        </tr>
    `;
};



export let orderTable = (orderOfTableItems) => {
    let entries = orderOfTableItems.map(creatTableOrderEntry).join('')

    return `
    <div class="Yu-orderTableContainer">
    <table>
        <colgroup>
            <col style="width: 10%; ">
            <col style="width: 30%; ">
            <col style="width: 20%; ">
            <col style="width: 10%; ">
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