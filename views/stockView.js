import { dictionary } from '../dictionary.js';

export function renderStock(data) {
	const appContainer = document.getElementById('app');

	let stockList = data?.beers;

	let row = '';
	stockList.forEach((item) => {
		row += '<tr>';
		row += '<td>' + item.nr + '</td>';
		row += '<td>' + item.namn + '</td>';
		row += '<td>' + item.prisinklmoms + '</td>';
		row += '<td>' + item.stock + '</td>';
		row += `<td><button id="productPage_${
			item.nr
		}" class="product-page-button" data-product-id="' + item.nr + '">${
			dictionary.ProductPage[sessionStorage.getItem('language') || 'en']
		}</button></td>`;
		row += '</tr>';
	});

	appContainer.innerHTML = `
    <div class="container">
      <h1>${dictionary.Stock[sessionStorage.getItem('language') || 'en']}</h1>
      <div class="stockTable-container">
        <table class="stockTable"> <colgroup>
            <col> <col> 
            <col> 
            <col style="text-align: right;"> 
          </colgroup>
          <thead> <tr class="stockTable-header"> 
              <th>${
								dictionary.No[sessionStorage.getItem('language') || 'en']
							}</th>
              <th>${
								dictionary.Item[sessionStorage.getItem('language') || 'en']
							}</th>
              <th>${
								dictionary.Price[sessionStorage.getItem('language') || 'en']
							}</th> 
              <th>${
								dictionary.RemainingQty[
									sessionStorage.getItem('language') || 'en'
								]
							}</th>
            </tr>
          </thead>
          <tbody> ${row} </tbody> </table>
      </div>
    </div>
  `;
}
