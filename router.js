import { HomeController } from './controllers/homeController.js';
import { AboutController } from './controllers/aboutController.js';
import { MenuController } from './controllers/menuController.js';

const routes = {
	'/': HomeController,
	'/about': AboutController,
	'/menu': MenuController,
};

export function handleRouteChange() {
	const path = window.location.hash.substr(1) || '/';
	const routeHandler = routes[path];
	if (routeHandler) {
		routeHandler();
	} else {
		console.error('Route not found:', path);
	}
}

document.addEventListener('click', function (event) {
	if (
		event.target.tagName === 'A' &&
		event.target.href.startsWith(window.location.origin)
	) {
		event.preventDefault();
		const path = new URL(event.target.href).hash.substr(1);
		window.location.hash = path;
		handleRouteChange();
	}
});

export function initRouter() {
	handleRouteChange();
	window.addEventListener('hashchange', handleRouteChange);
}
