export let beerCard = (beer) => {
	return `
		<div class="beer-card">
			<i class="material-symbols-outlined"> sports_bar </i>
			<h3 class="beer-name">${beer.namn}</h3>
			<p>${beer.prisinklmoms}</p>
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
