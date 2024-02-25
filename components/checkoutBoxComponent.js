




//Alan
export let checkoutBox = (orderedList) => {
    let row = '';
    orderedList.forEach(item => {
        row += '<tr>'
        row += '<td style="font-weight:bold;">' + item.namn + '</td>';
        row += '<td>' + '<div style="display: flex; flex:none"> <button style=" flex:none; width:30%; border-radius: 5px;">+</button><h5 style=" flex:none; width:40%; text-align: center">1</h5><button style=" flex:none; width:30%; border-radius: 5px;">-</button></div>' + '</td>';
        row += '<td>' + item.prisinklmoms + '</td>';
        row += '</tr>';
    });

    return `
        <div class="checkout-box-title-container">
            <h1>Order</h1>
            <button>Clear all</button>
        </div>
        <div class="checkbox-table-container">
        
            <div class="checkbox-table">
                <table>
                    <colgroup style="width: 100%">
                        <col style="width: 60% ">
                        <col style="width: 25% ">
                        <col style="width: 15% ">
                    </colgroup>
                    <tr>
                        <th style="text-align: left">Item</th>
                        <th>Qty</th>
                        <th>$$</th>
                    </tr>
                    ${row}				
                </table>
            </div>
        </div>

        <hr>
        <div class="checkout-box-bottom">
            <h1>Total Price: 30</h1>
            <h3>Discount: 10%</h3>
            <div class="checkbox-submit">
                <button>Submit Order</button>
            </div>
        </div>


        </div>



    
    
    `;
}