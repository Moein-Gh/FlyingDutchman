import { HomeController } from './controllers/homeController.js';
import { AboutController } from './controllers/aboutController.js';
import { MenuController } from './controllers/menuController.js';

// Define routes and their corresponding controller functions
const routes = {
	'/': HomeController,
	'/about': AboutController,
	'/menu': MenuController,
};

// Router logic
export function handleRouteChange() {
	const path = window.location.hash.substr(1) || '/';
	const routeHandler = routes[path];
	if (routeHandler) {
		routeHandler();
	} else {
		console.error('Route not found:', path);
	}
}

// Intercept anchor link clicks
document.addEventListener('click', function (event) {
	if (
		event.target.tagName === 'A' &&
		event.target.href.startsWith(window.location.origin)
	) {
		event.preventDefault(); // Prevent default anchor link behavior
		const path = new URL(event.target.href).hash.substr(1);
		window.location.hash = path; // Update hash without reloading the page
		handleRouteChange(); // Handle route change
	}
});

// Initialize the router
export function initRouter() {
	handleRouteChange();
	window.addEventListener('hashchange', handleRouteChange); // Listen for hash changes
}
