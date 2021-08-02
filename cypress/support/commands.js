// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import {
  createAccountBtn,
  emailAddressTxtField,
  firstNameTxtField,
  lastNameTxtField,
  passwordTxtField,
} from "../integration/registration.po";

Cypress.Commands.add(
  "createAccount",
  ({ firstName, lastName, emailAddress, password }) => {
    firstNameTxtField().type(firstName);
    lastNameTxtField().type(lastName);
    emailAddressTxtField().type(emailAddress);
    passwordTxtField().type(password);
    createAccountBtn().click();
  }
);
