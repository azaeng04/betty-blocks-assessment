/// <reference types="cypress" />

import Chance from "chance";
const chance = new Chance();

import {
  loginFormPageHeadingTxt,
  backToLoginLnkTxt,
  createAccountBtn,
  emailAlreadyUsedMsgTxt,
  fieldRequiredTxt,
  invalidEmailTxt,
  invalidPasswordTxt,
  accountCreatedTxt,
} from "./registration.po";

import { accountData } from "./regsitration.data";

describe("Registration", () => {
  beforeEach(() => {
    cy.visit("/new-account");
  });

  it("should be served over HTTPS", () => {
    const expectedResult = "https";

    cy.url().then((url) => {
      expect(url).to.contain(expectedResult);
    });
  });

  it("should create a new account for the user", () => {
    const validAccountData = accountData({
      firstName: "Azariah",
      lastName: "Engelbrecht",
      emailAddress: chance.email(),
      password: "12345ABCDEabcde",
    });

    cy.createAccount(validAccountData);
    accountCreatedTxt().should("be.visible");
  });

  it('should redirect to /login after an account creation', () => {
    const expectedResult = "/login?account_created=true";
    cy.intercept({
      pathname: "/login",
    }).as("loginPage");

    const validAccountData = accountData({
      firstName: "Azariah",
      lastName: "Engelbrecht",
      emailAddress: chance.email(),
      password: "12345ABCDEabcde",
    });

    cy.createAccount(validAccountData);
    cy.wait("@loginPage", { timeout: 10000 });

    cy.url().then((url) => {
      expect(url).to.contain(expectedResult);
    });
    cy.percySnapshot("account creation success");
    
  });

  it("should navigate back to login page", () => {
    backToLoginLnkTxt().click();

    loginFormPageHeadingTxt().should("be.visible");
    cy.percySnapshot("login screen page navigation");
  });

  it("should not create an account with no data supplied", () => {
    createAccountBtn().click();

    fieldRequiredTxt().should("be.visible");
    cy.percySnapshot("field required text on account creation");
  });

  it("should not create an account with an already existing email address", () => {
    const validAccountData = accountData({
      firstName: "Azariah",
      lastName: "Engelbrecht",
      emailAddress: chance.email(),
      password: "12345ABCDEabcde",
    });

    cy.createAccount(validAccountData);
    accountCreatedTxt().should("be.visible");

    cy.visit("/new-account");
    cy.createAccount(validAccountData);

    emailAlreadyUsedMsgTxt().should("be.visible");
    cy.percySnapshot("email already used error message");
  });

  it("should not create an account with an invalid email address supplied", () => {
    const invalidAccountData = accountData({
      firstName: "Azariah",
      lastName: "Engelbrecht",
      emailAddress: "INVALID",
      password: "12345ABCDEabcde",
    });

    cy.createAccount(invalidAccountData);

    invalidEmailTxt().should("be.visible");
    cy.percySnapshot("invalid email address text");
  });

  it("should not create an account with a password less than 8 character(s)", () => {
    const invalidPasswordData = accountData({
      firstName: "Azariah",
      lastName: "Engelbrecht",
      emailAddress: "test@gmail.com",
      password: "1Nv",
    });

    cy.createAccount(invalidPasswordData);

    invalidPasswordTxt().should("be.visible");
    cy.percySnapshot("invalid password - less than 8 characters");
  });

  it("should not create an account with a password that has no lowercase character(s)", () => {
    const invalidPasswordData = accountData({
      firstName: "Azariah",
      lastName: "Engelbrecht",
      emailAddress: "test@gmail.com",
      password: "12345678INVALID",
    });

    cy.createAccount(invalidPasswordData);

    invalidPasswordTxt().should("be.visible");
    cy.percySnapshot("invalid password - no lowercase characters");
  });
  it("should not create an account with a password that has no uppercase character(s)", () => {
    const invalidPasswordData = accountData({
      firstName: "Azariah",
      lastName: "Engelbrecht",
      emailAddress: "test@gmail.com",
      password: "12345678invalid",
    });

    cy.createAccount(invalidPasswordData);

    invalidPasswordTxt().should("be.visible");
    cy.percySnapshot("invalid password - no uppercase characters");
  });

  it("should not create an account with a password that has no digit(s)", () => {
    const invalidPasswordData = accountData({
      firstName: "Azariah",
      lastName: "Engelbrecht",
      emailAddress: "test@gmail.com",
      password: "invalidINVALID",
    });

    cy.createAccount(invalidPasswordData);

    invalidPasswordTxt().should("be.visible");
    cy.percySnapshot("invalid password - no digits");
  });
});
