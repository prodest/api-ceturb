Feature: retornar_estimativas_por_origem_e_linha

    Este método é responsável por obter as estimativas de um determinado ponto de origem e linha


    Scenario: Existem estimativas para o ponto e a linha informada
        Given Eu quero saber as estimativas de uma linha em um ponto
        When eu pesquisar
        Then recebo uma lista de veiculos da linha que passarão no ponto

    Scenario: Eu informei um ponto ou uma linha inválida
        Given Eu quero saber as estimativas de uma linha em um ponto
        And o ponto ou a linha que informei são inválidos ou não existem
        When eu pesquisar
        Then recebo uma mensagem informando que não foram encontradas estimativas
