Feature: retornar_itinerarios

    Função responsável por buscar os itinerários na API da geoControl

    Scenario: Existem itinerários registrados
        Given Eu quero saber as informações dos itinerários registrados
        When Eu pesquisar os itinerários
        Then retorna os itinerários cadastrados

    Scenario: Não existem itinerários registrados
        Given Eu quero saber as informações dos itinerários registrados
        When Eu pesquisar os itinerários
        Then retorna uma mensagem informando que não há informações disponíveis