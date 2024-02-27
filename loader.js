import { loadJSON } from './utils.js';

let staticAddress = './Dutchman Files/DBFilesJSON/DBFilesJSON/';

export async function loadDB() {
	if (sessionStorage.getItem('beers') == null) {
		let beers = await loadJSON(staticAddress + 'dutchman_table_sbl_beer.json');
		let first100 = beers.slice(0, 100);
		sessionStorage.setItem('beers', JSON.stringify(first100));
	}

	if (sessionStorage.getItem('users') == null) {
		let users = await loadJSON(staticAddress + 'dutchman_table_users.json');
		sessionStorage.setItem('users', JSON.stringify(users));
	}
	if (sessionStorage.getItem('orders') == null) {
		sessionStorage.setItem('orders', JSON.stringify([]));
	}
	if (sessionStorage.getItem('tables') == null) {
		let tables = await loadJSON(staticAddress + 'dutchman_table_tables.json');
		sessionStorage.setItem('tables', JSON.stringify(tables));
	}
	if (sessionStorage.getItem('notifications') == null) {
		let notifications = await loadJSON(
			staticAddress + 'dutchman_table_notifications.json'
		);
		sessionStorage.setItem('notifications', JSON.stringify(notifications));
	}
}
