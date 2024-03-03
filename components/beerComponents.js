export let beerCard = (beer) => {
	return `
		<div class="beer-card">
			<img
				src="img/Heineken.jpg"
				style="width: 50%"
				alt="beverage pic"
				width="45%" />
			<div style="width: 50%">
				<i class="material-symbols-outlined"> sports_bar </i>
				<div class="beer-name">${beer.namn}</div>
				<div class="beer-price">${beer.prisinklmoms}</div>
				<button id=${beer.nr} class="AddButton">+Add</button>
			</div>
		</div>
	`;
};

export let beerList = (beers) => {
	let list = beers.map(beerCard).join('');

	return `
		<div class="beers">
			<h1 class=beers-title>Beers</h1>
      	<br>
			<div class="beers-list">${list}</div>
		</div>
	`;
};
