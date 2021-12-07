describe('nineline application', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.get('.menu-btn').click()
        cy.contains('Login').click()
        cy.get("#username").type("dispatcher@nineline.com")
        cy.get("#password").type("nineline!2021")
        cy.contains("Continue").click()
    })

    it('view dispatcher page', () => {
        cy.get('.menu-btn').click()
        cy.contains('Dispatcher').click()
        cy.url().should('include', '/dispatcher')
    })

    afterEach(() => {
        cy.get('.menu-btn').click()
        cy.contains('Logout').click()
    })


})
