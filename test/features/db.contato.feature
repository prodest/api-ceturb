#language: pt
Funcionalidade: getContatos

Endpoint que retorna contatos direto do banco de dados


Cenário: Contatos encontrados
Dado quero ver a lista de contatos
Quando eu pesquisar
Então recebo uma lista de contatos


Cenário: Contatos não encontrados
Dado quero ver a lista de contatos
E O banco de dados está vazio
Quando eu pesquisar
Então recebo uma mensagem de erro


Cenário: Erro na busca
Dado quero ver a lista de contatos
E algum problema lógico ou de infra ocorreu
Quando eu pesquisar
Então recebo uma mensagem de erro