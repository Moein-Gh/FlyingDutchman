
import { MenuController } from './controllers/menuController.js';
import { userController } from './controllers/userController.js';
import { StockController } from './controllers/stockController.js';
import { profileController } from './controllers/profileController.js';
import { CommandStack } from './CommandStack.js';
import { TableOrderController } from './controllers/tableOrderController.js';
import { orderController } from './controllers/orderController.js';
import { renderHeader } from './components/headerComponents.js';
import UserModel from './models/userModel.js';
import { productController } from './controllers/productController.js';
import { orderSummaryController } from './controllers/orderSummaryController.js';
import { staffLoginController } from './controllers/staffLoginController.js';
const commandStack = new CommandStack();

const routes = {
	'/menu': MenuController,
	'/login': userController,
	'/stock': StockController,
	'/profile': profileController,
	'/table/order': TableOrderController,
	'/orders': orderController,
	'/product': productController,
	'/orderSummary': orderSummaryController,
	'/staffLogin': staffLoginController,
};

export function handleRouteChange() {
	const fullPath = window.location.hash.substr(1) || '/';
	let path = fullPath;
	let params = {};

	// Check if the route contains parameters (indicated by ":")
	if (path.includes('/:')) {
		const [route, param] = path.split('/:');
		path = route;
		params = { id: param }; // Example: Assuming a single "id" parameter
	}

	const routeHandler = routes[path];
	if (routeHandler) {
		let loggedInCustomer = sessionStorage.getItem('loggedInCustomer');
		loggedInCustomer = JSON.parse(loggedInCustomer);

		renderHeader({
			loggedInCustomer,
			language: sessionStorage.getItem('language'),
		});
		headerELs();
		routeHandler(commandStack, params); // Pass params to the route handler
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
    // If there's no hash in the URL, redirect to the menu route 
    if (window.location.hash === '') {
        window.location.hash = '/menu'; 
		handleRouteChange();
    } else {
        handleRouteChange(); // Handle existing hash-based routes 
    }

    window.addEventListener('hashchange', handleRouteChange);
}

function headerELs() {
	let userModel = new UserModel();
	userModel.initialize();

	let flags = document.querySelectorAll('.flag');

	flags.forEach((flag) => {
		flag.addEventListener('click', (e) => {
			let language = e.target.id;
			sessionStorage.setItem('language', language);
			handleRouteChange();
		});
	});

	let loginButton = document.querySelector('.header-login-button');
	loginButton?.addEventListener('click', () => {
		window.location.hash = '/login';
		handleRouteChange();
	});
	let staffLoginButton = document.querySelector('.header-login-button-staff');
	staffLoginButton?.addEventListener('click', () => {
		window.location.hash = '/staffLogin';
		handleRouteChange();
	});

	let logoutButton = document.querySelector('.header-logout-button');
	logoutButton?.addEventListener('click', () => {
		userModel.logout();
		window.location.hash = '/menu';
		handleRouteChange();
	});

	let logo = document.querySelector('.logoSection');
	logo.addEventListener('click', () => {
		window.location.hash = '/menu';
		handleRouteChange();
	});
}
