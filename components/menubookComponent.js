import { beerList } from './beerComponents.js';

// Alan
export let menuBook = (data) => {
    return `
        <div class="menu-category-container">
            <ul>
                <li class="all">All</li>
                <li class="Food">Food</li>
                <li class="Beverage">Beverage</li>
            </ul>
        </div>

        <div class="menu-content-container">
            <div id="menuBookPages">
                    <div class="container">
                        ${beerList(data?.beers)}
                    </div>
            </div>
        </div>     
	`;
};

// export function Test() {

//     const menuContainer = document.getElementById('menuBookPages');
//     console.log('Test1')
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
