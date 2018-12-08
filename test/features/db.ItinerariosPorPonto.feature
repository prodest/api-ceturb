#language: pt
Funcionalidade: buscar itienrarios que passam por um ponto

Endpoint que retorna itinerarios que passam em um ponto


Cenário: Itinerarios encontrados
Dado quero ver a lista de itinerarios que passam por um ponto
Quando eu pesquisar
Então recebo uma lista itinerarios


Cenário: Itinerarios não encontrados
Dado quero ver a lista de itinerarios que passam por um ponto
E não há registros
Quando eu pesquisar
Então recebo uma mensagem de não encontrado