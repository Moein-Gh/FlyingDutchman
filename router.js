import { HomeController } from './controllers/homeController.js';
import { MenuController } from './controllers/menuController.js';
import { userController } from './controllers/userController.js';
import { StockController } from './controllers/stockController.js';
import { profileController } from './controllers/profileController.js';
import { CommandStack } from './CommandStack.js';
import { orderController } from './controllers/orderController.js';
const commandStack = new CommandStack();

const routes = {
	'/': HomeController,
	'/menu': MenuController,
	'/login': userController,
	'/stock': StockController,
	'/profile': profileController,
	'/orders': orderController,
};

export function handleRouteChange() {
	const path = window.location.hash.substr(1) || '/';
	const routeHandler = routes[path];
	if (routeHandler) {
		routeHandler(commandStack);
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
