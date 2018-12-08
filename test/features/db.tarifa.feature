#language: pt
Funcionalidade: getTarifas

Endpoint que retorna tarifas direto do banco de dados


Cenário: Tarifas encontradas
Dado quero ver a lista de tarifas
Quando eu pesquisar
Então recebo uma lista de tarifas


Cenário: Tarifas não encontradas
Dado quero ver a lista de tarifas
E O banco de dados está vazio
Quando eu pesquisar
Então recebo uma mensagem de erro


Cenário: Erro na busca
Dado quero ver a lista de tarifas
E algum problema lógico ou de infra ocorreu
Quando eu pesquisar
Então recebo uma mensagem de erro