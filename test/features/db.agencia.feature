#language: pt
Funcionalidade: getAgencias

Endpoint que retorna agencias direto do banco de dados


Cenário: Agencias encontradas
Dado quero ver a lista de agencias
Quando eu pesquisar
Então recebo uma lista de agencias


Cenário: Agencias não encontradas
Dado quero ver a lista de agencias
E O banco de dados está vazio
Quando eu pesquisar
Então recebo uma mensagem de erro


Cenário: Erro na busca
Dado quero ver a lista de agencias
E algum problema lógico ou de infra ocorreu
Quando eu pesquisar
Então recebo uma mensagem de erro