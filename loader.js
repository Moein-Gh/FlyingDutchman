import { loadJSON } from './utils.js';

let staticAddress = './Dutchman Files/DBFilesJSON/DBFilesJSON/';

export async function loadDB() {
	console.log('-------------------');
	console.log('Loading DB');
	console.log('-------------------');
	if (sessionStorage.getItem('beers') == null) {
		let beers = await loadJSON(staticAddress + 'dutchman_table_sbl_beer.json');
		let first100 = beers.slice(0, 100);
		sessionStorage.setItem('beers', JSON.stringify(first100));
	}

	if (sessionStorage.getItem('users') == null) {
		let users = await loadJSON(staticAddress + 'dutchman_table_users.json');
		sessionStorage.setItem('users', JSON.stringify(users));
	}
}
