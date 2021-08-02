export const firstNameTxtField = () => cy.get("[name='first_name']");
export const lastNameTxtField = () => cy.get("[name='last_name']");
export const emailAddressTxtField = () => cy.get("[name='email_address']");
export const passwordTxtField = () => cy.get("[name='password']");
export const createAccountBtn = () => cy.contains("span", "Create Account");
export const backToLoginLnkTxt = () => cy.contains("span", "Back to login");

export const accountCreatedTxt = () => cy.contains("div", "Account created");
export const loginFormPageHeadingTxt = () => cy.contains("h3", "Login flow");
export const accountCreationMsgTxt = () =>
  cy.contains("div", "Your account has been created, you can now login here");

export const emailAlreadyUsedMsgTxt = () =>
  cy.contains("div", "error: This email already exists");

export const fieldRequiredTxt = () =>
  cy.contains("p", "This field is required");

export const invalidEmailTxt = () =>
  cy.contains("p", "No valid value provided");

export const invalidPasswordTxt = () =>
  cy.contains(
    "p",
    "Password must contain 8 characters, 1 lowercase character, 1 upper case character, and 1 digit"
  );
