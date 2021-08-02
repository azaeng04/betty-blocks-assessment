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
      firstName: chance.name(),
      lastName: chance.last(),
      emailAddress: chance.email(),
      password: "12345ABCDEabcde",
    });

    cy.createAccount(validAccountData);

    accountCreatedTxt().should("be.visible");
  });

  it("should navigate back to login page", () => {
    backToLoginLnkTxt().click();

    loginFormPageHeadingTxt().should("be.visible");
  });

  it("should not create an account with no data supplied", () => {
    createAccountBtn().click();

    fieldRequiredTxt().should("be.visible");
  });

  it("should not create an account with an already existing email address", () => {
    const validAccountData = accountData({
      firstName: chance.name(),
      lastName: chance.last(),
      emailAddress: chance.email(),
      password: "12345ABCDEabcde",
    });

    cy.createAccount(validAccountData);
    accountCreatedTxt().should("be.visible");

    cy.visit("/new-account");
    cy.createAccount(validAccountData);
    emailAlreadyUsedMsgTxt().should("be.visible");
  });

  it("should not create an account with an invalid email address supplied", () => {
    const invalidAccountData = accountData({
      firstName: chance.name(),
      lastName: chance.last(),
      emailAddress: "INVALID",
      password: "12345ABCDEabcde",
    });

    cy.createAccount(invalidAccountData);

    invalidEmailTxt().should("be.visible");
  });

  it("should not create an account with a password less than 8 character(s)", () => {
    const invalidPasswordData = accountData({
      firstName: chance.name(),
      lastName: chance.last(),
      emailAddress: chance.email(),
      password: "1Nv",
    });

    cy.createAccount(invalidPasswordData);

    invalidPasswordTxt().should("be.visible");
  });

  it("should not create an account with a password that has no lowercase character(s)", () => {
    const invalidPasswordData = accountData({
      firstName: chance.name(),
      lastName: chance.last(),
      emailAddress: chance.email(),
      password: "12345678INVALID",
    });

    cy.createAccount(invalidPasswordData);

    invalidPasswordTxt().should("be.visible");
  });
  it("should not create an account with a password that has no uppercase character(s)", () => {
    const invalidPasswordData = accountData({
      firstName: chance.name(),
      lastName: chance.last(),
      emailAddress: chance.email(),
      password: "12345678invalid",
    });

    cy.createAccount(invalidPasswordData);

    invalidPasswordTxt().should("be.visible");
  });

  it("should not create an account with a password that has no digit(s)", () => {
    const invalidPasswordData = accountData({
      firstName: chance.name(),
      lastName: chance.last(),
      emailAddress: chance.email(),
      password: "invalidINVALID",
    });

    cy.createAccount(invalidPasswordData);

    invalidPasswordTxt().should("be.visible");
  });
});
