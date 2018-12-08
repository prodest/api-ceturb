Feature: Buscar o arquivo swagger.json

    Responsável por retornar o json do swagger para auxiliar a comunidade DEV


    Scenario: Arquivo encontrado
        Given Eu quero acessar o swagger.json
        When eu buscar
        Then recebo o swagger.json

