const { GlobalConstants } = require('../helpers/global-constants');

exports.LoginPage = class LoginPage {
	constructor(page) {
		this.emailInput = page.locator('.email');
		this.passwordInput = page.locator('.password');
		this.rememberMeInput = page.locator('input[name="RememberMe"][type="checkbox"]');
		this.loginButton = page.locator('.login-button');
	}

	async inputEmail(email) {
		await this.emailInput.fill(email);
	}

	async inputPassword(password) {
		await this.passwordInput.fill(password);
	}

	async checkRememberMe() {
		await this.rememberMeInput.click();
	}

	async clickLoginButton() {
		await this.loginButton.click()
	}

	async authorization(email = GlobalConstants.DEFAULT_EMAIL, password = GlobalConstants.DEFAULT_PASSWORD) {
		await this.inputEmail(email);
		await this.inputPassword(password);
		await this.checkRememberMe();
	}
}