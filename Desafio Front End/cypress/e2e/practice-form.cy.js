describe('Desafio Frontend - Parte 2 - DemoQA Practice Form', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('findDOMNode')) {
        return false;
      }
      return true;
    });

    // Acessar o site e navegar até o formulário
    cy.visit('https://demoqa.com/');
    cy.contains('Forms').click();
    cy.contains('Practice Form').click();
    cy.url().should('include', '/automation-practice-form');
  });

  it('Preencher formulário com valores fixos, validar popup e fechar clicando fora', () => {
    // 1. Preencher Nome
    cy.get('#firstName').type('José');
    cy.get('#lastName').type('Braga');
    
    // 2. Preencher Email
    cy.get('#userEmail').type('jlcbraga@mail.com');
    
    // 3. Selecionar Gênero
    cy.get('input[value="Male"]').check({ force: true });
    
    // 4. Preencher Mobile Number
    cy.get('#userNumber').type('9999999999');
    
    // 5. Preencher Date of Birth
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__month-select').select('September');
    cy.get('.react-datepicker__year-select').select('2000');
    cy.get('.react-datepicker__day')
    .filter(':not(.react-datepicker__day--outside-month)')
    .contains('14')
    .click();
    
    // 6. Preencher Subjects
    cy.get('#subjectsInput').type('Computer Science{enter}');
    
    // 7. Selecionar Hobbies
    cy.get('input[value="1"]').check({ force: true }); // Sports
    cy.get('input[value="2"]').check({ force: true }); // Reading
    cy.get('input[value="3"]').check({ force: true }); // Music
    
    // 8. Upload da Picture
    cy.get('#uploadPicture').selectFile('cypress/fixtures/exemplo.txt', { force: true });
    
    // 9. Preencher Current Address
    cy.get('#currentAddress').type('Desafio Accenture');
    
    // 10. Selecionar State
    cy.get('#state').click();
    cy.get('#react-select-3-option-2').click();
    
    // 11. Selecionar City
    cy.get('#city').click();
    cy.get('#react-select-4-option-0').click();
    
    // 12. Submeter o formulário
    cy.get('#submit').click();
    
    // 13. Garantir que o popup foi aberto após o submit
    cy.get('.modal-content', { timeout: 10000 }).should('be.visible');
    cy.get('.modal-title').should('contain', 'Thanks for submitting the form');
    
    // 14. Fechar o popup clicando fora do modal (no backdrop)
    cy.get('.modal-backdrop').click({ force: true }); // o botão CLOSE está bugado, não sendo possível fechar pelo botão, abrir defeito :P
    
    // 15. Verificar se o popup foi fechado
    cy.wait(1000);
    cy.get('.modal-content').should('not.exist');
    
    cy.log('Teste finalizado com êxito!');
  });
});