export function renderProduct(product) {
	const appContainer = document.getElementById('app');

	const content = `
			<div class="productContainer">
					<div class="product-name">
							Name: <span id="itemName">${product.namn}</span>
					</div>
					<div class="product-price">
							Price: <span id="itemPrice">${product.prisinklmoms}</span>
					</div>
					<div class="product-type">
							Type: <span id="itemType">Beer</span>
					</div>
					<div class="product-stock">
							Stock: 
							<span id="itemStock" class="${
								product.stock > 0 ? 'stock-available' : 'stock-out'
							}">
									${product.stock > 0 ? product.stock : 'Out of Stock'}
							</span>
					</div>
			</div>
	`;

	// Inject styles and content into the app container
	appContainer.innerHTML = content;
}
