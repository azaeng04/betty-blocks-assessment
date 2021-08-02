/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Create account
     */
    createAccount({
      firstName,
      lastName,
      emailAddress,
      password,
    }): Chainable<void>;
  }
}
