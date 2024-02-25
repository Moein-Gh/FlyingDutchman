export function renderHome(data) {
	const appContainer = document.getElementById('app');
	console.log('-------------------');
	console.log(data.newOrder);
	console.log('-------------------');
	appContainer.innerHTML = `
		<div>
		</div>
	`;
}
