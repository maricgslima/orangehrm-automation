const { expect } = require('@playwright/test');

class PersonalDetailsPage {
  constructor(page) {
    this.page = page;
    this.editButton = page.getByRole('button', { name: 'Edit' });
    this.nationalityDropdown = page.locator('div:has(label:text("Nationality")) div.oxd-select-text-input').first();
    this.dobInput = page.locator('label:has-text("Date of Birth")')
  .locator('..') // sobe para o div pai do label
  .locator('..') // sobe para o div que contém o input
  .locator('input[placeholder="yyyy-dd-mm"]');
    this.saveButton = page.locator('button[type="submit"]:has-text("Save")').first();

  }


async updateNationality(nationality) {
  // Localiza o dropdown diretamente pelo texto "Nationality" e sobe para o elemento clicável
  const dropdown = this.page.locator('div:has(label:text("Nationality")) div.oxd-select-text-input').first();


  // Garante que está visível e clica
  await dropdown.scrollIntoViewIfNeeded().catch(() => {});
  await dropdown.waitFor({ state: 'visible', timeout: 5000 });
  await dropdown.click();

  // Espera o dropdown abrir e clica na opção
  const option = this.page.locator(`.oxd-select-dropdown div:has-text("${nationality}")`);
  await option.scrollIntoViewIfNeeded().catch(() => {});
  await option.waitFor({ state: 'visible', timeout: 5000 });
  await option.click({ force: true });
}


 async updateDateOfBirth(date) {
  
 const dobInput = this.page.locator('label:has-text("Date of Birth")')
    .locator('..')
    .locator('..')
    .locator('input[placeholder="yyyy-dd-mm"]');
  // Aguarda e rola até o campo de data de nascimento estar visível
  await this.dobInput.scrollIntoViewIfNeeded();
  await this.dobInput.waitFor({ state: 'visible', timeout: 5000 });

  // Clica para ativar o campo
  await this.dobInput.click();

  // Limpa qualquer valor anterior
  await this.dobInput.press('Control+A');
  await this.dobInput.press('Delete');

  // Preenche a nova data no formato correto
  await this.dobInput.type(date); // exemplo: '1990-06-21'
}


  async saveChanges() {
    await this.saveButton.scrollIntoViewIfNeeded();
    await this.saveButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.saveButton.click();
  }

  async verifyUpdatedFields(nationality, dateOfBirth) {
    const selectedNationality = await this.nationalityDropdown.textContent();
    const currentDob = await this.dobInput.inputValue();

    if (!selectedNationality.includes(nationality)) {
      throw new Error(`Expected nationality to be ${nationality}, but got ${selectedNationality}`);
    }

    if (currentDob !== dateOfBirth) {
      throw new Error(`Expected date of birth to be ${dateOfBirth}, but got ${currentDob}`);
    }
  }
}

module.exports = { PersonalDetailsPage };
