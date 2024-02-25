export function renderLogin(data) {
	const appContainer = document.getElementById('app');

	appContainer.innerHTML = `
		<h1>Flying Dutchman Pub</h1>
		<h2>Please sign in to your existing account</h2>
		<form action="/login" method="post">
			<label for="username">Username:</label>
			<input type="text" id="username" name="username" required />
			<br />
			<label for="password">Password:</label>
			<input type="password" id="password" name="password" required />
			<br />
			<a href="/forgot-password">Forgot password?</a>
			<br />
			<button type="submit">Login</button>
		</form>
		<p>OR</p>
		<button
			class="checkout-button"
			onclick="location.href='/checkout-without-login'">
			Checkout without login
		</button>
	`;
}
