Feature: retornar_horariosObs

    Função responsável por buscar as observações de horários de uma linha


    Scenario: Existem observações de horários de uma linha
        Given Eu quero saber as informações adicionais sobre horarios de uma linha
        When eu pesquisar as observações do horário da linha
        Then retornará as observações do horário cadastradas daquela linha

    Scenario: Não existem observações de horários de uma linha
        Given Eu quero saber as informações adicionais sobre horarios de uma linha
        When eu pesquisar as observações do horário da linha
        Then retornará uma mensagem informando que não há registros