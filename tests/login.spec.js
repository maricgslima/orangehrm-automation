const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('Login com sucesso', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();                         // Vai até a página de login
  await loginPage.login('Admin', 'admin123');     // Realiza o login com as credenciais fornecidas

  // Validação: URL deve conter 'dashboard' após login bem-sucedido
  await expect(page).toHaveURL(/dashboard/);
});
