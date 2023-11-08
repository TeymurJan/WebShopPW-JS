const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');
const { HomePage } = require('../pages/home.page');
const { GlobalConstants } = require('../helpers/global-constants');

test.beforeEach(async ({ page }) => {
	await page.goto('https://demowebshop.tricentis.com/login')
});

test('Check successful authorization', async ({ page }) => {
	const loginPage = new LoginPage(page);
	const homePage = new HomePage(page);

	await loginPage.authorization();
	await loginPage.clickLoginButton();
	await homePage.assertLoggedInEmail(GlobalConstants.DEFAULT_EMAIL);
});