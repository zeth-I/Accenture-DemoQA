describe('Desafio Frontend - Parte 2 - Alerts, Frame & Windows', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('findDOMNode')) return false;
      return true;
    });

    cy.visit('https://demoqa.com/');
  });

  it('Abrir nova janela, validar mensagem e fechar', () => {
    // Clicar em Alerts, Frame & Windows
    cy.contains('Alerts, Frame & Windows').click();
    
    // Clicar em Browser Windows
    cy.contains('Browser Windows').click();
    
    // Visitar diretamente a página sample
    cy.visit('https://demoqa.com/sample');
    
    // Validar que a mensagem existe
    cy.get('h1').invoke('text').should('eq', 'This is a sample page');
    
    // Voltar para a página anterior
    cy.go('back');
    
    // Cypress não suporta múltiplas abas, então navegar direto e retornar, caso tivesse algo para ser feito, também seria
    cy.url().should('include', '/browser-windows');
    
    cy.log('Teste finalizado com sucesso!');
  });
});