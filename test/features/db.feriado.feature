#language: pt
Funcionalidade: getFeriados

Endpoint que retorna feriados direto do banco de dados


Cenário: Feriados encontradas
Dado quero ver a lista de feriados
Quando eu pesquisar
Então recebo uma lista de feriados


Cenário: Feriados não encontradas
Dado quero ver a lista de feriados
E O banco de dados está vazio
Quando eu pesquisar
Então recebo uma mensagem de erro


Cenário: Erro na busca
Dado quero ver a lista de feriados
E algum problema lógico ou de infra ocorreu
Quando eu pesquisar
Então recebo uma mensagem de erro