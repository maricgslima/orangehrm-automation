// tests/logout-flow.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { HeaderComponent } = require('../pages/HeaderComponent');



test('Deve fazer logout e voltar para a tela de login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const header = new HeaderComponent(page);

  await loginPage.goto();
  await loginPage.login('Admin', 'admin123');

  await header.logout();

  await expect(page).toHaveURL(/.*auth\/login/);
  await expect(page.getByPlaceholder('Username')).toBeVisible();
});
