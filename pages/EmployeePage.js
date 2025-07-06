const { expect } = require('@playwright/test');


class EmployeePage {
  constructor(page) {
    this.page = page;
    this.pimMenu = page.getByRole('link', { name: 'PIM' });
    this.addEmployeeOption = page.getByRole('link', { name: 'Add Employee' });
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.employeeIdInput = page.locator('input.oxd-input').nth(2);
    this.saveButton = page.locator('button:has-text("Save")');
    this.header = page.getByRole('heading', { name: 'Personal Details' });

  }

  async navigateToAddEmployee() {
  await this.pimMenu.click();
  await this.addEmployeeOption.waitFor();
  await this.addEmployeeOption.click();
}


  async fillEmployeeForm(firstName, lastName, employeeId) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.employeeIdInput.fill(employeeId);
  }

  async save() {
    await this.saveButton.click();
  }

  async assertRedirectionToPersonalDetails() {
    await this.header.waitFor({ state: 'visible' });
    const title = await this.header.textContent();
    if (!title.includes('Personal Details')) {
      throw new Error('Employee was not redirected to Personal Details page.');
    }
  }

  async navigateToEmployeeList() {
  await this.pimMenu.click();
  await this.page.waitForURL('**/pim/viewEmployeeList');
}

async searchEmployeeByName(name) {
  const searchInput = this.page.locator('input[placeholder="Type for hints..."]').first();
  const searchButton = this.page.getByRole('button', { name: 'Search' });

  await searchInput.fill(name);
  await searchButton.click();
}


async assertEmployeeInResults(expectedFullText) {
  const resultCell = this.page.locator('div').filter({ hasText: expectedFullText });
  await expect(resultCell.first()).toBeVisible();
}

async openEmployeeEditPageByPartialName(partialName) {
  // Espera pela linha da tabela que contenha o nome parcial
  const row = this.page.locator('div.oxd-table-row').filter({ hasText: partialName });

  await row.first().waitFor({ state: 'visible', timeout: 5000 });

  // Clica no botão de editar (ícone de lápis)
  const editButton = row.locator('button.oxd-icon-button.oxd-table-cell-action-space').first();
  await editButton.scrollIntoViewIfNeeded();
  await editButton.click();
}







}

module.exports = { EmployeePage };