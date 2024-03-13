export function renderOrders(data) {
	const appContainer = document.getElementById('app');

	appContainer.innerHTML = `
	<h1>${data.number}</h1>
	`;
}
