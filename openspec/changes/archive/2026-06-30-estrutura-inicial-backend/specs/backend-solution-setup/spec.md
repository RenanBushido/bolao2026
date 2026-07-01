## ADDED Requirements

### Requirement: Estrutura de Solução .NET
A solução backend SHALL ser organizada em uma estrutura de projetos seguindo Clean Architecture com separação clara entre Domain, Application, Infrastructure e API.

#### Scenario: Arquivo de solução criado
- **WHEN** a solução é inicializada
- **THEN** um arquivo `Bolao.slnx` é criado na pasta `src/backend/`

#### Scenario: Projetos base configurados
- **WHEN** a solução é construída
- **THEN** os seguintes projetos existem e compilam sem erros:
  - Bolao.Domain (biblioteca)
  - Bolao.Application (biblioteca)
  - Bolao.Infrastructure (biblioteca)
  - Bolao.Api (aplicação web)

### Requirement: Versionamento de API
A API SHALL usar versionamento por URL com padrão `/api/v1/`.

#### Scenario: Rotas versionadas
- **WHEN** uma requisição é feita para um endpoint
- **THEN** a rota contém o padrão `/api/v{versão}/`

### Requirement: Async/Await em todo código assíncrono
Todo código que executar operações I/O (banco de dados, HTTP) SHALL usar async/await.

#### Scenario: Métodos de acesso a dados são assíncronos
- **WHEN** um repositório acessa o banco de dados
- **THEN** o método retorna `Task<T>` ou `ValueTask<T>`
