Feature: retornar_gtfs

    Responsável por retornar as informações dos arquivos GTFS criados em um ano e mês específico.


    Scenario: Existem arquivos GTFS registrados de um ano e mês
        Given Eu quero saber as informações dos arquivos GTFS criados de um ano e mês específico
        When eu pesquisar
        Then recebo as informações

    Scenario: Não existem arquivos GTFS registrados de um ano e mês
        Given Eu quero saber as informações dos arquivos GTFS criados de um ano e mês específico
        And Não há informações sobre esses arquivos
        When eu pesquisar
        Then recebo uma mensagem informando que não há arquivos
