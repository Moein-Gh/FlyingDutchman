import { beerList } from './beerComponents.js';

// Alan
export let menuBook = (data) => {
	return ` <div class="container">${beerList(data?.beers)}</div> `;
};

// export function Test() {

//     const menuContainer = document.getElementById('menuBookPages');
//     menuContainer.innerHTML = `<div>TTTTTTEST</div> `
// };

// export function switchToFood(data) {
//     const appContainer = document.getElementById('menuBookPages');

//     appContainer.innerHTML = `
//         <div class="container">
//             ${beerList(data?.beers)}
//         </div>
//     `
// };

// export function switchToBeverage(data) {
//     const appContainer = document.getElementById('menuBookPages');

//     appContainer.innerHTML`
//         <div class="container">
//             ${beerList(data?.beers)}
//         </div>
//     `
// };

// export let beverageMenu = (data) => {
//     return `
//         <div class="container">
//             ${beerList(data?.beers)}
//         </div>
// 	`;
// };
