describe('Desafio Frontend - Parte 2 - Sortable Simples', () => {
  it('Ordenar lista', () => {
    cy.visit('https://demoqa.com/sortable')
    cy.get('#demo-tab-list').click()
    
    // Mover One para primeira posição
    cy.contains('.list-group-item', 'One').trigger('mousedown', { which: 1 })
    cy.get('.list-group-item').eq(0).trigger('mousemove').trigger('mouseup', { force: true })
    cy.wait(300)
    
    // Mover Two para segunda posição
    cy.contains('.list-group-item', 'Two').trigger('mousedown', { which: 1 })
    cy.get('.list-group-item').eq(1).trigger('mousemove').trigger('mouseup', { force: true })
    cy.wait(300)
    
    // Mover Three para terceira posição
    cy.contains('.list-group-item', 'Three').trigger('mousedown', { which: 1 })
    cy.get('.list-group-item').eq(2).trigger('mousemove').trigger('mouseup', { force: true })
    cy.wait(300)
    
    // Mover Four para quarta posição
    cy.contains('.list-group-item', 'Four').trigger('mousedown', { which: 1 })
    cy.get('.list-group-item').eq(3).trigger('mousemove').trigger('mouseup', { force: true })
    cy.wait(300)
    
    // Mover Five para quinta posição
    cy.contains('.list-group-item', 'Five').trigger('mousedown', { which: 1 })
    cy.get('.list-group-item').eq(4).trigger('mousemove').trigger('mouseup', { force: true })
    cy.wait(300)
    
    // Mover Six para sexta posição
    cy.contains('.list-group-item', 'Six').trigger('mousedown', { which: 1 })
    cy.get('.list-group-item').eq(5).trigger('mousemove').trigger('mouseup', { force: true })
    
    // Validar
    cy.get('.list-group-item').eq(0).should('have.text', 'One')
    cy.get('.list-group-item').eq(1).should('have.text', 'Two')
    cy.get('.list-group-item').eq(2).should('have.text', 'Three')
    cy.get('.list-group-item').eq(3).should('have.text', 'Four')
    cy.get('.list-group-item').eq(4).should('have.text', 'Five')
    cy.get('.list-group-item').eq(5).should('have.text', 'Six')
  })
})