Feature: retornar_itinerarios

    Função responsável por buscar os itinerários de uma linha na API da geoControl

    Scenario: Existem itinerários registrados de uma linha
        Given Eu quero saber as informações do itinerario de uma linha
        When Eu pesquisar uma linha
        Then retorna o itinerário cadastrado de uma linha


    Scenario: Não existem itinerários registrados para a linha
        Given Eu quero saber as informações do itinerario de uma linha
        And não há registro de itinerários para essa linha
        When Eu pesquisar uma linha
        Then retorna uma mensagem informando que não há registros