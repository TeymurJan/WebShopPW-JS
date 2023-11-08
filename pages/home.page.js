const { expect } = require('@playwright/test');

exports.HomePage = class HomePage {
	constructor(page) {
		this.myAccountEmail = page.locator('//div[@class="header-links"]//a[@class="account"]');
		this.shoppingCartCount = page.locator('.cart-qty');
		this.categoriesListPages = page.locator('//li[@class="inactive"]//a');
	}

	async assertLoggedInEmail(email) {
		//To do - implement default waiters to stop repeating code
		await this.myAccountEmail.waitFor({visible: true});
		expect(this.myAccountEmail).toHaveText(email);
	}
}