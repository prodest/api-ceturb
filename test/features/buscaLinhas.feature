Feature: retornar_linhas

    Função responsável por buscar as linhas na API da geocontrol


    Scenario: Existem linhas registradas
        Given Eu quero saber as informações das linhas registrados
        When eu pesquisar
        Then retorna as linhas cadastradas