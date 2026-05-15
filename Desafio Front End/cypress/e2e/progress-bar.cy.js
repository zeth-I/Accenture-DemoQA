describe('Desafio Frontend - Parte 2 - Progress Bar', () => {
  it('Deve parar aos 25%, ir até 100% e resetar', () => {
    cy.visit('https://demoqa.com/progress-bar')
    
    // 1. Clica em Start
    cy.get('#startStopButton').click()
    
    // 2. Espera 2.5 segundos e para
    cy.wait(2500)
    cy.get('#startStopButton').click()
    
    // 3. Verifica se está em 25%
    cy.get('#progressBar .progress-bar').should('have.attr', 'aria-valuenow', '25')
    
    // 4. Clica em Start novamente
    cy.get('#startStopButton').click()
    
    // 5. Espera chegar a 100%
    cy.wait(10000)
    
    // 6. Verifica se está em 100%
    cy.get('#progressBar .progress-bar').should('have.attr', 'aria-valuenow', '100')
    
    // 7. Clica no botão Reset
    cy.get('#resetButton').click()
    
    // 8. Verifica se resetou para 0%
    cy.get('#progressBar .progress-bar').should('have.attr', 'aria-valuenow', '0')
  })
})