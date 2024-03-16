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
		
		<h2>Hello ${loggedInCustomer?.firstName}</h2>
		
		<button class="header-logout-button">logout</button>

	</div>`;
	} else {
		return `<div class="flexCenter loginSection">
			<a href="#/login">
				<button class="header-login-button">Login</button>
			</a>
		</div>`;
	}
}
