const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../pages/register.page');
const { RegisterConfirmationPage } = require('../pages/register-confirmation.page');

test.beforeEach(async ({ page }) => {
	await page.goto('https://demowebshop.tricentis.com/register')
});

test('Successful registration', async ({ page }) => {
	const registerPage = new RegisterPage(page);
	const registerConfirmationPage = new RegisterConfirmationPage(page);

	await registerPage.registrationProcess();
	await registerPage.clickRegisterButton();
	await registerConfirmationPage.assertSuccessfulRegistration('Your registration completed');
});

test('Registration with same email', async ({ page }) => {
	const registerPage = new RegisterPage(page);
	
	await registerPage.registrationProcess('qwerty@gmail.com');
	await registerPage.clickRegisterButton();
	await registerPage.assertSameEmailRegistered();
});

test('Registration with wrong confirm password', async ({ page }) => {
	const registerPage = new RegisterPage(page);

	await registerPage.registrationProcess();
	await registerPage.inputConfirmPassword('qwerty123');
	await registerPage.clickRegisterButton();

	await registerPage.assertInvalidConfirmPassword();
});