## ADDED Requirements

### Requirement: Framework de testes unitários
A aplicação SHALL usar xUnit para testes unitários de todas as camadas (Domain, Application, Infrastructure).

#### Scenario: Projeto de testes criado
- **WHEN** a solução é compilada
- **THEN** o projeto `Bolao.Tests` existe e referencia o pacote xUnit

#### Scenario: Testes executados com sucesso
- **WHEN** `dotnet test` é executado
- **THEN** todos os testes passam e o relatório de cobertura é exibido

### Requirement: Fixtures e setup de testes
Os testes SHALL usar fixtures do xUnit para compartilhar state e realizar setup/teardown.

#### Scenario: Fixture de banco de dados
- **WHEN** um teste requer acesso a dados
- **THEN** uma fixture fornece um `DbContext` testável com dados iniciais

#### Scenario: Limpeza de dados entre testes
- **WHEN** cada teste é executado
- **THEN** o estado do banco é limpo entre execuções para garantir isolamento

### Requirement: Testes de repositório
Os repositórios SHALL ter testes que validam operações CRUD.

#### Scenario: Teste de criação de entidade
- **WHEN** um teste cria uma transação via repositório
- **THEN** a entidade é salva e pode ser recuperada com o mesmo ID

#### Scenario: Teste de recuperação não encontrada
- **WHEN** um teste busca uma transação inexistente
- **THEN** o repositório retorna null

### Requirement: Testes de serviços da aplicação
Os serviços de aplicação SHALL ter testes que validam lógica de negócio com mocks de dependências.

#### Scenario: Teste de serviço com mock de repositório
- **WHEN** um teste de serviço é executado
- **THEN** usa um mock do repositório em vez de banco real
