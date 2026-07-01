## ADDED Requirements

### Requirement: Container de DI nativo do ASP.NET
A injeção de dependência SHALL usar o container nativo do ASP.NET Core sem bibliotecas externas.

#### Scenario: Serviços registrados no container
- **WHEN** a aplicação inicia
- **THEN** os serviços estão registrados no `IServiceCollection` via `Program.cs`

#### Scenario: Injeção de dependência em constructores
- **WHEN** um controller ou serviço requer uma dependência
- **THEN** a dependência é injetada via construtor sem necessidade de factories manuais

### Requirement: Ciclos de vida de serviços
Serviços SHALL ser registrados com ciclos de vida apropriados: Singleton, Scoped ou Transient.

#### Scenario: Serviços com ciclo Scoped por padrão
- **WHEN** um repositório ou serviço é registrado
- **THEN** o ciclo de vida é Scoped (uma instância por request)

#### Scenario: DbContext com ciclo Scoped
- **WHEN** um request é processado
- **THEN** um novo `DbContext` é criado e descartado ao fim do request

### Requirement: Configuração centralizada
A configuração de DI SHALL estar centralizada em `Program.cs` com extensões para organização.

#### Scenario: Extensões para registro de serviços
- **WHEN** novos serviços são adicionados
- **THEN** podem ser registrados via método de extensão (ex: `AddApplicationServices()`)
