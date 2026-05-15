# language: pt

Funcionalidade: Web Tables - Gerenciamento de Registros

  Cenário: Criar 12 registros e deletar todos
    Dado que estou na página de Web Tables
    Quando eu criar 12 novos registros dinamicamente
    Então a tabela deve conter os 12 novos registros
    Quando eu deletar todos os novos registros criados
    Então a tabela não deve conter nenhum dos registros criados