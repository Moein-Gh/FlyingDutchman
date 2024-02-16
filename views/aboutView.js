export function renderAbout(data) {
	const appContainer = document.getElementById('app');
	appContainer.innerHTML = `
      <div class="container">
          <h1>About Us</h1>
          <p><a href="#/">Go to Home page</a></p>
      </div>
  `;
}
