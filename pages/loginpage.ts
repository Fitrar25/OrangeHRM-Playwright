import {Page, Locator, expect} from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly fieldError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.getByText('Invalid credentials');
        this.fieldError = page.getByText('Required');
    }

    async goto() {
        await this.page.goto('/web/index.php/auth/login');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async expectDashboard() {
        await expect(this.page).toHaveURL(/dashboard/);
    }

    async expectInvalidCredentials() {
        await expect(this.errorMessage).toBeVisible();
    }

    async expectFieldError() {
        await expect(this.fieldError).toBeVisible();
    }
}