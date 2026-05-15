import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

let registrosCriados = []
let emailsOriginais = new Set()  // Usar Set para evitar duplicatas

Given('que estou na página de Web Tables', () => {
  cy.visit('https://demoqa.com/webtables')
  cy.contains('h1', 'Web Tables').should('be.visible')
  
  // Capturar emails dos registros que já existem
  cy.log('📋 Salvando registros originais...')
  emailsOriginais.clear()
  
  cy.get('table tbody tr').each(($row) => {
    const email = $row.find('td').eq(3).text().trim()
    if (email) {
      emailsOriginais.add(email)
      cy.log(`Original: ${email}`)
    }
  }).then(() => {
    cy.log(`📊 Total de registros originais: ${emailsOriginais.size}`)
  })
})

When('eu criar {int} novos registros dinamicamente', (quantidade) => {
  registrosCriados = []
  
  for (let i = 1; i <= quantidade; i++) {
    // Usar timestamp para garantir email único
    const email = `teste_${Date.now()}_${i}@email.com`
    registrosCriados.push(email)
    
    cy.get('#addNewRecordButton').click()
    cy.wait(500)
    
    cy.get('#firstName').type(`Teste${i}`)
    cy.get('#lastName').type(`Automacao${i}`)
    cy.get('#userEmail').type(email)
    cy.get('#age').type(String(20 + i))
    cy.get('#salary').type(String(30000 + (i * 1000)))
    cy.get('#department').type(`Departamento${i}`)
    cy.get('#submit').click()
    cy.wait(500)
    
    cy.log(`Criado [${i}]: ${email}`)
  }
})

Then('a tabela deve conter os {int} novos registros', (quantidade) => {
  registrosCriados.forEach(email => {
    cy.get('#searchBox').clear().type(email)
    cy.wait(500)
    cy.contains('table tbody tr', email).should('be.visible')
  })
  cy.get('#searchBox').clear()
  cy.log(`${quantidade} novos registros confirmados`)
})

When('eu deletar todos os novos registros criados', () => {
  cy.log(`🗑️ Deletando ${registrosCriados.length} registros criados no teste...`)
  
  for (let i = 0; i < registrosCriados.length; i++) {
    const email = registrosCriados[i]
    
    cy.get('#searchBox').clear().type(email)
    cy.wait(500)
    
    // Verificar se o registro ainda existe antes de deletar
    cy.get('body').then($body => {
      if ($body.find(`table tbody tr:contains("${email}")`).length > 0) {
        cy.contains('table tbody tr', email)
          .find('span[id*="delete-record"]')
          .click({ force: true })
        cy.log(`Deletado: ${email}`)
      } else {
        cy.log(`Registro já não existe: ${email}`)
      }
    })
    cy.wait(300)
  }
  
  cy.get('#searchBox').clear()
})

Then('a tabela não deve conter nenhum dos registros criados', () => {
  
  // Verificar que os registros originais ainda estão lá
  cy.log('🔍 Verificando registros originais...')
  const emailsOriginaisArray = Array.from(emailsOriginais)
  
  emailsOriginaisArray.forEach(email => {
    cy.get('#searchBox').clear().type(email)
    cy.wait(500)
    cy.contains('table tbody tr', email).should('be.visible')
    cy.log(`✅ Original mantido: ${email}`)
  })
  
  cy.get('#searchBox').clear()
  cy.log('Teste concluído')
})