export async function loadJSON(src) {
	const response = await fetch(src);
	const json = await response.json();
	return json;
}
