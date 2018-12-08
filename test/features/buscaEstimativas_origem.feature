Feature: retornar_estimativas_por_origem

    Responsável por retornar estimativas por origem


    Scenario: Existem estimativas para o id do ponto informado
        Given Eu quero saber as estimativas de veiculos em um ponto
        When eu pesquisar
        Then recebo uma lista de veiculos que passarão no ponto

    Scenario: Eu informei um ponto inválido ou inexistente
        Given Eu quero saber as estimativas de veiculos em um ponto
        And O ponto que informei não existe ou é inválido
        When eu pesquisar
        Then recebo uma mensagem informando que não foram encontradas estimativas
