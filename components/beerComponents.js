import { dictionary } from '../dictionary.js';

export let beerCard = (beer) => {
	return `
		<div id="beerCard_${beer.nr}" class="beer-card" draggable=true>
			<div class="card-content">
				<div>
					<h3 class="beer-name">${beer.namn}</h3>

					<h4 class="beer-price">${beer.prisinklmoms} SEK</h4>
				</div>
			</div>
			<button id="${beer.nr}" class="AddButton"><h2>+</h2></button>
		</div>
	`;
};

export let beerList = (beers) => {
	let list = beers.map(beerCard).join('');

	return `
		<div class="beers">
			<h1 class=beers-title>${
				dictionary.Beer[sessionStorage.getItem('language') || 'en']
			}</h1>
      	<br>
			<div class="beers-list">${list}</div>
		</div>
	`;
};
