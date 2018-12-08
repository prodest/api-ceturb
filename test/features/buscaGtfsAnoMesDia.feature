Feature: retornar_gtfs

    Responsável por retornar as informações dos arquivos GTFS criados em um ano, mês e dia específico.


    Scenario: Existem arquivos GTFS registrados de um ano, mês e dia
        Given Eu quero saber as informações dos arquivos GTFS criados de um ano, mês e dia específico
        When eu pesquisar
        Then recebo as informações

    Scenario: Não existem arquivos GTFS registrados de um ano, mês e dia
        Given Eu quero saber as informações dos arquivos GTFS criados de um ano, mês e dia específico
        And Não há informações sobre esses arquivos
        When eu pesquisar
        Then recebo uma mensagem informando que não há arquivos
