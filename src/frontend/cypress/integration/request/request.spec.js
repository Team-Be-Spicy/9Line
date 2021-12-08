describe('nineline request page', () => {
    beforeEach( () => {
        cy.visit('http://localhost:3000/')
    })

    it('submits new request, confirms alert displays, clicks view details, confirms status is pending, and closes modal', () =>  {
        cy.submitRequestForm()
        cy.getBySel("alertSuccess").should("have.text","Request Submitted. A dispatcher will contact you soon.")
        cy.getBySel("btnViewDetails").click()
        cy.getBySel("detailStatus").should("have.text", "Pending")
        cy.getBySel("btnClose").click()
        cy.getBySel("detailStatus").should("not.exist")

    });
})