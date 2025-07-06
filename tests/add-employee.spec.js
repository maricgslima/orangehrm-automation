const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { EmployeePage } = require('../pages/EmployeePage');
const employeeId = Date.now().toString().slice(-6);

test('Adicionar novo funcionário com sucesso', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const employeePage = new EmployeePage(page);

  // Login
  await loginPage.goto();
  await loginPage.login('Admin', 'admin123');

  // Navegar até Add Employee
  await employeePage.navigateToAddEmployee();

  
  await employeePage.fillEmployeeForm('Marília', 'Teste', employeeId);
  await employeePage.save();

// Exporte o ID para usar depois
test.info().annotations.push({ type: 'employeeId', description: employeeId });


  // Preencher e salvar
  const randomId = Date.now().toString().slice(-6); // ID único com timestamp
  await employeePage.fillEmployeeForm('Marília', 'Teste', randomId);
  await employeePage.save();

  // Validação: redirecionamento
  await employeePage.assertRedirectionToPersonalDetails();
});
