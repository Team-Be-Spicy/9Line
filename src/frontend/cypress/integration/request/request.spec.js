describe('nineline request page', () => {
    beforeEach( () => {
        cy.visit('http://localhost:3000/')
    })

    it('nineline complete form', () =>  {
        cy.get('[data-cy=location]').type("Miami, FL")
        cy.get('[data-cy=radio]').type("35.950 / Dustoff / ABC")
        cy.get('[data-cy=totalPatient]').type("{backspace}3")

    });

})