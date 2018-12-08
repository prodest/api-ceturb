Feature: retornar_horarios

    Responsável por buscar os horários de uma linha


    Scenario: Existem horários de linhas registradas
        Given Eu quero saber as informações dos horarios de uma linha
        When eu pesquisar uma linha
        Then retornará os horários cadastrados daquela linha

    Scenario: Não existem horários de linhas registradas
        Given Eu quero saber as informações dos horarios de uma linha
        And Não há informações cadastradas
        When eu pesquisar uma linha
        Then recebo uma mensagem informando que não há informações disponíveis
