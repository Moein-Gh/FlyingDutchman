export function renderStaffLogin(data) {
	const appContainer = document.getElementById('app');

	appContainer.innerHTML = `
	<div class="loginPage">
	<div class="loginContainer">
		<div class="login">
			<div class="login-titleContainer">
				<h1 class="login-title">Flying Dutchman Pub Staff Login</h1>
			</div>
			<div class="staff-login-form">
				<form action="/login" method="post">
					<div class="inp">
						<input type="text" id="staff-username" name="username" placeholder="&nbsp;" required />
						<span class="label">Username</span>
						<span class="focus-bg"></span>
					</div>
					<div class="inp">
						<input type="password" id="staff-password" name="password" placeholder="&nbsp;" required />
						<span class="label">Password</span>
						<span class="focus-bg"></span>
					</div>
					<button type=submit class="staff-loginButton" role="button">Login</button>
				</form>
			</div>
		</div>
	</div>
</div>
	`;
}
