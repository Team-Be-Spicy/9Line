describe('authenticated dispatcher flow', () => {
    before(() => {
        cy.visit('http://localhost:3000/')
        cy.get('.menu-btn').click()
        cy.contains('Login').click()
        cy.get("#username").type("dispatcher@nineline.com")
        cy.get("#password").type("nineline!2021")
        cy.contains("Continue").click()
    })

    it('create request, view dispatcher page, assign request, confirm assigned status', () => {
        cy.submitRequestForm()
        cy.get('.menu-btn').click()
        cy.contains('Dispatcher').click()
        cy.url().should('include', '/dispatcher')
        cy.wait(3000)
        cy.get('.MuiDataGrid-row:last-child > .MuiDataGrid-cell').first().next().should('have.text', '')
        cy.get('.MuiDataGrid-row:last-child > .MuiDataGrid-cell').first().next().next().should('have.text', 'Pending')
        cy.get('.MuiDataGrid-row:last-child > .MuiDataGrid-cellCheckbox').click()
        cy.getBySel('btnAction').click()
        cy.getBySel('btnAssign').click()
        cy.get('.MuiDataGrid-row:last-child > .MuiDataGrid-cell').first().next().should('have.text', 'responder1@nineline.com')
        cy.get('.MuiDataGrid-row:last-child > .MuiDataGrid-cell').first().next().next().should('have.text', 'Assigned')
    })

    afterEach(() => {
        cy.get('.menu-btn').click()
        cy.contains('Logout').click()
    })


})
