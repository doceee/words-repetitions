/// <reference types="cypress" />
export {}; // Ensure this file is treated as a module
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
// Cypress.Commands.add(
//     'login',
//     (
//         email = Cypress.env('adminEmail'),
//         password = Cypress.env('adminPassword')
//     ) => {
//         cy.visit('/login');

//         cy.get('input[name="email"]').type(email);

//         cy.get('input[name="password"]').type(password);

//         cy.get('button[type="submit"]').click();

//         cy.wait(500);
//     }
// );

// Cypress.Commands.add('logout', () => {
//     cy.get('[data-testid="logout"]').click();

//     cy.wait(500);
// });

// declare global {
//     namespace Cypress {
//         interface Chainable {
//             login(email: string, password: string): Chainable<void>;
//             logout(): Chainable<void>;
//             // Add other custom commands here
//         }
//     }
// }
