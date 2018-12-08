#language: pt
Funcionalidade: Listar os shapes de um itinerario

Endpoint que retorna pontos geográficos no caminho de um itinerario


Cenário: Pontos geográficos encontrados
Dado quero ver a lista de pontos geográficos percorridos pelo itinerario
Quando eu pesquisar
Então recebo uma lista de pontos geográficos


Cenário: Pontos geográficos não encontrados
Dado quero ver a lista de pontos geográficos percorridos pelo itinerario
E não há registros
Quando eu pesquisar
Então recebo uma mensagem de erro