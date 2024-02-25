




//Alan
export let checkoutBox = (orderedList) => {
    let row = '';
    let counter = 1;

    orderedList.forEach(item => {
        row += '<tr>'
        row += '<td>' + counter + '</td>';
        row += '<td>' + item.namn + '</td>';
        row += '<td>' + 'Qty' + '</td>';
        row += '<td>' + item.prisinklmoms + '</td>';
        row += '</tr>';
        counter++;
    });

    return `
        <div class="checkout-box-title">
            <div class="left"><h1>Order</h1></div>
            <button>Clear all</button>
        </div>
        <div class="checkbox-table-container">
        
            <div class="checkbox-table">
                <table>
                    <colgroup style="width: 100%">
                        <col style=" width: 15% ">
                        <col style="width: 55% ">
                        <col style="width: 15% ">
                        <col style="width: 15% ">
                    </colgroup>
                    <tr>
                        <th>No.</th>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>$$</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>dummy</td>
                        <td>1</td>
                        <td>10</td>
                    </tr>
                    ${row}				
                </table>
            </div>
        </div>

        <h1 class="checkbox-submit">Total Price: 30</h1>

        <div class="checkbox-submit">
            <button >Submit Order</button>
        </div>

        </div>



    
    
    `;
}