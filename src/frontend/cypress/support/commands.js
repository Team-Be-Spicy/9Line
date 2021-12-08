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
Cypress.Commands.add('login', () => {
    Cypress.log({
        name: 'loginViaAuth0',
    });

    const options = {
        method: 'POST',
        url: Cypress.env('auth_url'),
        body: {
            grant_type: 'password',
            username: Cypress.env('auth_username'),
            password: Cypress.env('auth_password'),
            audience: Cypress.env('auth_audience'),
            scope: 'openid profile email',
            client_id: Cypress.env('auth_client_id'),
            client_secret: Cypress.env('auth_client_secret'),
        },
    };
    cy.request(options);
})

Cypress.Commands.add('getBySel', (selector, ...args) => {
    return cy.get(`[data-cy=${selector}]`, ...args)
})

Cypress.Commands.add('submitRequestForm', () => {
    cy.getBySel("location").type("Miami, FL")
    cy.getBySel("radio").type("35.950 / Dustoff / ABC")
    cy.getBySel("urgentPatient").type("{backspace}4")
    cy.getBySel("urgentSurgPatient").type("{backspace}3")
    cy.getBySel("priorityPatient").type("{backspace}2")
    cy.getBySel("routinePatient").type("{backspace}1")
    cy.getBySel("eqNone").click()
    cy.getBySel("eqHoist").click()
    cy.getBySel("eqExtraction").click()
    cy.getBySel("eqVentilator").click()
    cy.getBySel("litterPatient").type("3")
    cy.getBySel("ambulatoryPatient").type("7")
    cy.getBySel("securitySelect").click()
    cy.getBySel("securityEscort").click()
    cy.getBySel("mkPanels").click()
    cy.getBySel("mkPyro").click()
    cy.getBySel("mkSmoke").click()
    cy.getBySel("mkNone").click()
    cy.getBySel("mkOther").click()
    cy.getBySel("mkSmoke").click()
    cy.getBySel("selNationality").click()
    cy.getBySel("natCivilian").click()
    cy.getBySel("selNBC").click()
    cy.getBySel("nbcBio").click()
    cy.getBySel("btnSubmit").click()


})


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

// Cypress.Commands.add('login', (email, password) => {});