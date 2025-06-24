/// <reference types="cypress" />

describe('login', () => {
    it('login and logout correctly', () => {
        const email = Cypress.env('userEmail');
        const password = Cypress.env('userPassword');

        cy.visit('/login');

        cy.get('input[id="email"]').type(email);

        cy.get('input[id="password"]').type(password);

        cy.get('button[type="submit"]').click();

        cy.wait(500);

        cy.get('h1[data-testid="user-email"]').should('be.visible');
        cy.get('h1[data-testid="user-email"]')
            .first()
            .should('have.text', email);

        cy.location('pathname').should('not.include', 'login');
        cy.location('pathname').should('include', '/');

        cy.get('button[data-testid="toggle-sidebar"]').should('be.visible');
        cy.get('button[data-testid="toggle-sidebar"]').click();
        cy.get('button[data-testid="logout"]').should('be.visible');
        cy.get('button[data-testid="logout"]').click();

        cy.wait(500);

        cy.location('pathname').should('include', 'login');
    });
});
