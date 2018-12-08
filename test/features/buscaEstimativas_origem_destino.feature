Feature: retornar_estimativas_por_origem_e_destino

    Este método é responsável por obter as estimativas de um determinado ponto de origem e destino


    Scenario: Existem estimativas para o ids dos pontos informados
        Given Eu quero saber as estimativas de veiculos entre um ponto e outro
        When eu pesquisar
        Then recebo uma lista de veiculos que passarão entre os pontos

    Scenario: Eu informei um ou mais pontos inválidos ou inexistentes
        Given Eu quero saber as estimativas de veiculos entre um ponto e outro
        And um ou todos os pontos que informei são inválidos ou não existem
        When eu pesquisar
        Then recebo uma mensagem informando que não foram encontradas estimativas
