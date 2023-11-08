const { expect } = require('@playwright/test');

exports.RegisterPage = class RegisterPage {
	constructor(page) {
		this.page = page;
		//basic elements
		this.maleGenderRadioButton = page.locator('#gender-male');
		this.femaleGenderRadioButton = page.locator('#gender-female');
		this.firstNameInput = page.locator('input[name="FirstName"]');
		this.secondNameInput = page.locator('input[name="LastName"]');
		this.emailInput = page.locator('input[name="Email"]');
		this.passwordInput = page.locator('input[name="Password"]');
		this.confirmPasswordInput = page.locator('input[name="ConfirmPassword"]');
		this.registerInput = page.locator('.register-next-step-button');

		//error elements
		this.messageEmailAlreadyExists = page.locator('.validation-summary-errors');
		this.messageWrongConfirmPassword = page.locator('span[for="ConfirmPassword"]');
	}

	async selectGender(isMale) {
		if(isMale)
			this.maleGenderRadioButton.click();
		else
			this.femaleGenderRadioButton.click();
	}

	async inputFirstName(name) {
		await this.firstNameInput.fill(name);
	} 

	async inputSecondName(name) {
		await this.secondNameInput.fill(name);
	}

	async inputEmail(email) {
		await this.emailInput.fill(email);
	}

	async inputPassword(password) {
		await this.passwordInput.fill(password);
	}

	async inputConfirmPassword(password) {
		await this.confirmPasswordInput.fill(password);
	}

	async clickRegisterButton() {
		await this.registerInput.click();
	}

	async registrationProcess(email = null, isMale = true, password = 'Test123!') {
		const currentDate = new Date().toISOString().replace(/[-T:]/g, '');
		if(email === null) {
			email = currentDate + '@gmail.com';
		} 
		await this.inputEmail(email);
		await this.inputFirstName('FirstName');
		await this.inputSecondName('SecondName');
		await this.selectGender(isMale);
		await this.inputPassword(password);
		await this.inputConfirmPassword(password);
	}

	async assertSameEmailRegistered(message = 'The specified email already exists') {
		await expect(this.messageEmailAlreadyExists).toHaveText(message);
	}

	async assertInvalidConfirmPassword(message = 'The password and confirmation password do not match.') {
		await expect(this.messageWrongConfirmPassword).toHaveText(message);
	} 
}