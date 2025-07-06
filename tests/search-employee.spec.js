const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { EmployeePage } = require('../pages/EmployeePage');

test('Pesquisar funcionário pelo nome e validar na lista', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const employeePage = new EmployeePage(page);

  // Login
  await loginPage.goto();
  await loginPage.login('Admin', 'admin123');

  // Navegar para lista de funcionários
  await employeePage.navigateToEmployeeList();

  // Pesquisar pelo nome cadastrado anteriormente (ajuste se necessário)
  const employeeName = 'Marília'; // mesmo nome usado no teste anterior
  await employeePage.searchEmployeeByName(employeeName);

  // Verificar se o funcionário aparece na tabela
  await employeePage.assertEmployeeInResults(employeeName);
});
