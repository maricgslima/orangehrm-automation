const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { EmployeePage } = require('../pages/EmployeePage');
const { PersonalDetailsPage } = require('../pages/PersonalDetailsPage');
const partialName = 'Marília';


test('Atualizar nacionalidade e data de nascimento via lista de funcionários', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const employeePage = new EmployeePage(page);
  const personalPage = new PersonalDetailsPage(page);

  const fullName = 'Marília Teste'; // ajuste se estiver usando ID no nome

  await loginPage.goto();
  await loginPage.login('Admin', 'admin123');

  await employeePage.navigateToEmployeeList();
  await employeePage.searchEmployeeByName('Marília');
  await employeePage.openEmployeeEditPageByPartialName(partialName);


  await personalPage.updateNationality('Brazilian');
  await personalPage.updateDateOfBirth('1990-20-03');
  await personalPage.saveChanges();
  await personalPage.verifyUpdatedFields('Brazilian', '1990-20-03');
});
