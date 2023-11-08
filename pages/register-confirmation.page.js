const { expect } = require('@playwright/test');

exports.RegisterConfirmationPage = class RegisterConfirmationPage {
	constructor(page) {
		this.successFullyRegistratedDiv = page.locator('.result');
	}
	
	async assertSuccessfulRegistration(message) {
		await expect(this.successFullyRegistratedDiv).toHaveText(message);
	}
}