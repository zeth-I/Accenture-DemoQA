describe('Desafio Frontend - Parte 2 - Web Tables', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables')
    cy.contains('h1', 'Web Tables').should('be.visible')
    
    // Fechar possíveis banners ou esconder sidebar
    cy.get('body').then(($body) => {
      // Esconder a sidebar direita que está cobrindo
      cy.get('.col-12.mt-4.col-md-3.col-xl-3').invoke('hide')
      // Esconder anúncios
      cy.get('[id*="Ad.Plus"]').invoke('hide')
    })
  })

  it('Deve criar, ler todos os registros e excluir o criado', () => {
    const timestamp = Date.now()
    const emailUnico = `teste${timestamp}@email.com`
    
    // ========== 1. CRIAR REGISTRO ==========
    cy.log('📝 Criando novo registro...')
    
    cy.get('#addNewRecordButton').click()
    
    cy.get('#firstName').type(`Teste${timestamp}`)
    cy.get('#lastName').type('Automacao')
    cy.get('#userEmail').type(emailUnico)
    cy.get('#age').type('30')
    cy.get('#salary').type('50000')
    cy.get('#department').type('QA')
    
    cy.get('#submit').click()
    cy.wait(1000)
    
    // ========== 2. LER TODOS OS REGISTROS DA TABELA ==========
    cy.log('📋 Lendo todos os registros da tabela...')
    
    cy.get('table tbody tr').each(($row, index) => {
      const primeiroNome = $row.find('td').eq(0).text()
      const ultimoNome = $row.find('td').eq(1).text()
      const idade = $row.find('td').eq(2).text()
      const email = $row.find('td').eq(3).text()
      const salario = $row.find('td').eq(4).text()
      const departamento = $row.find('td').eq(5).text()
      
      cy.log(`[${index + 1}] ${primeiroNome} ${ultimoNome} - ${email}`)
    })
    
    // ========== 3. VERIFICAR SE O REGISTRO FOI CRIADO ==========
    cy.log('🔍 Verificando se o registro foi criado...')
    cy.contains('table tbody tr', emailUnico).should('be.visible')
    cy.log('✅ Registro encontrado na tabela!')
    
    // ========== 4. EXCLUIR O REGISTRO CRIADO ==========
    cy.log('🗑️ Excluindo o registro criado...')
    
    // SOLUÇÃO 1: Rolar até o elemento e usar force
    cy.contains('table tbody tr', emailUnico)
      .find('#delete-record-4')
      .scrollIntoView()
      .click({ force: true })
    
    cy.wait(500)
    
    // ========== 5. VERIFICAR SE FOI EXCLUÍDO ==========
    cy.log('Verificando exclusão...')
    cy.contains('table tbody tr', emailUnico).should('not.exist')
    cy.log('Registro excluído com sucesso!')
    
    // ========== 6. MOSTRAR REGISTROS RESTANTES ==========
    cy.log('📋 Registros restantes na tabela:')
    cy.get('table tbody tr').each(($row, index) => {
      const nome = $row.find('td').eq(0).text()
      const email = $row.find('td').eq(3).text()
      cy.log(`[${index + 1}] ${nome} - ${email}`)
    })
  })
})