class WebTablesPage {
  // Elementos
  get addButton() { return cy.get('#addNewRecordButton') }
  get firstName() { return cy.get('#firstName') }
  get lastName() { return cy.get('#lastName') }
  get email() { return cy.get('#userEmail') }
  get age() { return cy.get('#age') }
  get salary() { return cy.get('#salary') }
  get department() { return cy.get('#department') }
  get submitButton() { return cy.get('#submit') }
  get tableRows() { return cy.get('table tbody tr') }

  // Ações
  visit() {
    cy.visit('https://demoqa.com/webtables')
    cy.contains('h1', 'Web Tables').should('be.visible')
  }

  criarRegistro(registro) {
    this.addButton.click()
    this.firstName.type(registro.firstName)
    this.lastName.type(registro.lastName)
    this.email.type(registro.email)
    this.age.type(registro.age)
    this.salary.type(registro.salary)
    this.department.type(registro.department)
    this.submitButton.click()
    cy.wait(500)
  }

  criarMultiplosRegistros(quantidade) {
    const registros = []
    for (let i = 1; i <= quantidade; i++) {
      const registro = {
        id: i,
        firstName: `Teste${i}`,
        lastName: `Automacao${i}`,
        email: `teste${i}_${Date.now()}_${i}@email.com`,
        age: String(20 + i),
        salary: String(30000 + (i * 1000)),
        department: `Departamento${i}`
      }
      registros.push(registro)
      this.criarRegistro(registro)
      cy.log(`Registro ${i} criado: ${registro.firstName} ${registro.lastName}`)
    }
    return registros
  }

  lerTodosRegistros() {
    const registros = []
    return this.tableRows.each(($row, index) => {
      const nome = $row.find('td').eq(0).text()
      const email = $row.find('td').eq(3).text()
      registros.push({ nome, email, index: index + 1 })
      cy.log(`[${index + 1}] ${nome} - ${email}`)
    }).then(() => registros)
  }

  deletarRegistroPorEmail(email) {
    cy.contains('table tbody tr', email)
      .find('span[id*="delete-record"]')
      .click()
    cy.wait(500)
  }

  deletarMultiplosRegistros(emails) {
    emails.forEach(email => {
      this.deletarRegistroPorEmail(email)
      cy.log(`🗑️ Registro deletado: ${email}`)
    })
  }

  verificarRegistroExiste(email, deveExistir = true) {
    if (deveExistir) {
      cy.contains('table tbody tr', email).should('be.visible')
    } else {
      cy.contains('table tbody tr', email).should('not.exist')
    }
  }

  getTotalRegistros() {
    return this.tableRows.then($rows => $rows.length)
  }
}

export default new WebTablesPage()