#language: pt
Funcionalidade: Pegar relação de pontos de parada.

Essa funcionalidade tem como objetivo informar todos os pontos ativos presentes na api GVBUS.

Cenário: Retornar todos os pontos ativos registrados.
Dado que existam pontos de parada registrados.
Quando o usuário solicitar as informações sobre os pontos.
Então o sistema retorna todos os pontos ativos.

Cenário: Não existem pontos ativos registrados.
Dado não existem pontos registrados
Quando o usuário solicitar as informações sobre os pontos.
Então o sistema retorna uma mensagem informando que não há registros
