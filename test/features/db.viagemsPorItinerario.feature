#language: pt
Funcionalidade: Listar as viagems de um itinerário especifico pelo seu codigo

Endpoint que retorna viagems de um itinerário


Cenário: Viagems encontradas
Dado quero ver a lista de viagems de um itinerário específico
Quando eu pesquisar
Então recebo uma lista de viagems daquele itinerário


Cenário: Viagems não encontradas
Dado quero ver a lista de viagems de um itinerário específico
E Não há registros disponíveis
Quando eu pesquisar
Então recebo uma mensagem de erro
