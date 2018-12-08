Feature: retornar_pontos_por_area_do_mapa

    Responsável por retornar a lista dos pontos em uma area do mapa


    Scenario: Existem pontos na area
        Given Eu quero saber quais são os pontos em uma area do mapa
        When eu pesquisar
        Then recebo uma lista de ids dos pontos

    Scenario: Não existem pontos na area
        Given Eu quero saber quais são os pontos em uma area do mapa
        And Não há pontos na area designada
        When eu pesquisar
        Then recebo uma mensagem informando que não há pontos dentro da area designada
