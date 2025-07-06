# OrangeHRM UI Test Automation

This project contains a set of UI automated tests using [Playwright](https://playwright.dev/) for the OrangeHRM demo site:  
https://opensource-demo.orangehrmlive.com/

##What is covered

1. **Login**  
   Login with valid credentials (Admin / admin123).

2. **Add New Employee**  
   Navigate to PIM > Add Employee and create a new employee successfully.

3. **Search for Employee**  
   Search the recently created employee by ID.

4. **Update Personal Details**  
   Update nationality and date of birth via the employee list.

5. **Logout Flow**  
   Validate the logout functionality and redirection to the login screen.

##Technologies

- Node.js
- Playwright
- JavaScript
- Page Object Model (POM) structure

##How to run the tests

1. Install dependencies:
  
npm install

2. Run the tests:

npx playwright test

3. Show the report:

npx playwright show-report:

4. To run a specific test file:

npx playwright test tests/login.spec.js
npx playwright test tests/add-employee.spec.js
npx playwright test tests/search-employee.spec.js
npx playwright test tests/update-personal-details.spec.js
npx playwright test tests/logout-flow.spec.js