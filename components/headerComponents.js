import { dictionary } from '../dictionary.js';
export function renderHeader({ loggedInCustomer, language }) {
	let header = document.querySelector('header');
	header.innerHTML = `
		<div class="header-container">
			${loginSection(loggedInCustomer, language)}
			<div class="flexCenter logoSection">
			<a href="#/menu">
			<img src="logo.png" alt="Logo" />
			</a>
			</div>
			<div class="flexCenter languageSection">
				<img src="USA.png" id='en' class="flag ${
					language == 'en' ? 'selectedFlag' : ''
				}" alt="English" />
				<img src="sweden.png" id='se' class="flag ${
					language == 'se' ? 'selectedFlag' : ''
				}"  alt="Swedish" />

			</div>
		</div>
	`;
}

function loginSection(loggedInCustomer, language) {
	if (loggedInCustomer) {
		return `<div class="flexCenter loginSection">
		
		<h2>${dictionary.Hello[sessionStorage.getItem('language') || 'en']} ${
			loggedInCustomer?.firstName
		}</h2>
		
		<button class="header-logout-button">${
			dictionary.LogOut[sessionStorage.getItem('language') || 'en']
		}</button>

	</div>`;
	} else {
		return `<div class="flexCenter loginSection">
			<a>
				<button class="header-login-button">
					${dictionary.CustomerLogin[sessionStorage.getItem('language') || 'en']}
				</button>
			</a>
			<a>
				<button class="header-login-button-staff">
					${dictionary.StaffLogin[sessionStorage.getItem('language') || 'en']}
				</button>
			</a>
		</div>`;
	}
}
