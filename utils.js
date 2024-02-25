export async function loadJSON(src) {
	const response = await fetch(src);
	const json = await response.json();
	return json;
}

export function getDataFromSessionStorage(key) {
	const data = sessionStorage.getItem(key);
	return JSON.parse(data);
}

export function setDataInSessionStorage(key, data) {
	sessionStorage.setItem(key, JSON.stringify(data));
}
