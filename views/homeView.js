//Sheng-Yu Wu
export function renderHome(data) {
	const appContainer = document.getElementById('app');
	console.log('-------------------');
	console.log(data.newOrder);
	console.log('-------------------');
	appContainer.innerHTML = `
		<section class="Alan-homePageImg">
			<h1> Welcome come to Flying Dutchman!</h1>
		</section>

		<section class="Alan-homePageButtonSection">
			<button>General Customers</button>
			<button>VIP</button>
			<button>Bartender</button>
			<button>Waiter/ Waitress</button>
		</section>
	`;
}
