// components/HeaderComponent.js

class HeaderComponent {
  constructor(page) {
    this.page = page;
    this.userMenu = page.locator('.oxd-userdropdown-tab');
    this.logoutButton = page.getByRole('menuitem', { name: 'Logout' });
  }

  async logout() {
    await this.userMenu.click();
    await this.logoutButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.logoutButton.click();
  }
}

module.exports = { HeaderComponent };

