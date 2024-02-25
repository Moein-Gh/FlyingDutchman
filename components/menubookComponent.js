import { beerList } from './beerComponents.js';

// Alan
export let menuBook = (data) => {
    return `
        <div class="container">
            ${beerList(data?.beers)}
        </div>
	`;
};

