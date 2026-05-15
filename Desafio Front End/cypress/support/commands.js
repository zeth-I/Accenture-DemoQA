// Comando para gerar dados aleatórios
Cypress.Commands.add('generateRandomData', () => {
  const data = {
    firstName: `Nome${Math.floor(Math.random() * 1000)}`,
    lastName: `Sobrenome${Math.floor(Math.random() * 1000)}`,
    email: `teste${Date.now()}@exemplo.com`,
    mobileNumber: `9${Math.floor(Math.random() * 90000000) + 10000000}`,
    currentAddress: `Endereço ${Math.floor(Math.random() * 1000)}`,
    hobbies: ['Sports', 'Reading', 'Music'],
    subjects: ['Math', 'Physics', 'Chemistry', 'English', 'Computer Science']
  };
  return data;
});

// Comando para preencher data de nascimento
Cypress.Commands.add('fillDateOfBirth', (day, month, year) => {
  cy.get('#dateOfBirthInput').click();
  cy.get('.react-datepicker__month-select').select(month);
  cy.get('.react-datepicker__year-select').select(year);
  cy.get(`.react-datepicker__day--0${day}:not(.react-datepicker__day--outside-month)`).click();
});