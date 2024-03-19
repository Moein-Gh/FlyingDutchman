import { dictionary } from '../dictionary.js';
export let orderContainer = (data) => {
	return `
		<div class="col order-container">
			<h2>${dictionary.Item[sessionStorage.getItem('language') || 'en']}</h2>
			<h6>${dictionary.Order[sessionStorage.getItem('language') || 'en']} #2</h6>
			<p>${dictionary.Table[sessionStorage.getItem('language') || 'en']}: 2</p>
			<p>${dictionary.Price[sessionStorage.getItem('language') || 'en']}: 200</p>
		</div>
	`;
};
