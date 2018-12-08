#language: pt
Funcionalidade: getViagems

Endpoint que retorna viagems direto do banco de dados


Cenário: Viagems encontradas
Dado quero ver a lista de viagems
Quando eu pesquisar
Então recebo uma lista de viagems


Cenário: Viagems não encontradas
Dado quero ver a lista de viagems
E O banco de dados está vazio
Quando eu pesquisar
Então recebo uma mensagem de erro


Cenário: Erro na busca
Dado quero ver a lista de viagems
E algum problema lógico ou de infra ocorreu
Quando eu pesquisar
Então recebo uma mensagem de erro