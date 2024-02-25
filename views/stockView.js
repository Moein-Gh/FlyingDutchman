export function renderStock(data) {
    const appContainer = document.getElementById('app');

    let stockList = data?.beers;

    let row = '';
    stockList.forEach(item => {
        row += '<tr>'
        row += '<td>' + '#' + '</td>';
        row += '<td>' + item.namn + '</td>';
        row += '<td style="text-align: right;>' + '20' + '</td>';

        row += '</tr>';

    });

    appContainer.innerHTML = `
      <div class="container">
          <h1>Stock</h1>
          <div class="stockTable-container">
          
            <table>
                <colgroup >
                    <col style="width: 5% ">
                    <col style="width: 50% ">
                    <col style="width: 25% ">
                    <col style="width: 15%; text-align: right; ">
                </colgroup>
                <tr class="stockTable">
                    <th>No.#</th>
                    <th>Item</th>
                    <th style="text-align: right;">Remain Qty</th>
                </tr>
                ${row}         
            </table>
          </div>
      </div>
  `;
}
