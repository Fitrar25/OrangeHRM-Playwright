import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';

test.describe('TS-ORM-01 OrangeHRM Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
  });

  test('login with valid credentials', async ({ page }) => {
    await loginPage.goto();
    await loginPage.login('Admin', 'admin123');
    await loginPage.expectDashboard();
  });

  test('login with invalid password', async ({ page }) => {
    await loginPage.goto();
    await loginPage.login('Admin', 'InvalidPW');
    await loginPage.expectInvalidCredentials();
  });

  test('login with empty fields', async ({ page }) => {
    await loginPage.goto();
    await loginPage.login('', 'testpassword');
    await loginPage.expectFieldError();

  })

});