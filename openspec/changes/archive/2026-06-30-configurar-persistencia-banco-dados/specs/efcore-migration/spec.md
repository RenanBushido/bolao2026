## ADDED Requirements

### Requirement: Entity Framework Core configurado

O Entity Framework Core SHALL ser configurado no projeto Bolao.Infrastructure com DbContext conectado ao PostgreSQL.

#### Scenario: Classe ApplicationDbContext criada

- **WHEN** o projeto Infrastructure é compilado
- **THEN** existe classe `ApplicationDbContext` que herda de `DbContext`

#### Scenario: DbContext registrado no DI

- **WHEN** a aplicação inicia
- **THEN** `ApplicationDbContext` é registrado no container de injeção de dependência via `Program.cs`

#### Scenario: String de conexão do PostgreSQL

- **WHEN** o DbContext é inicializado
- **THEN** conecta ao PostgreSQL usando string de conexão lida de variáveis de ambiente

### Requirement: Migrations automáticas no startup

O Entity Framework Core SHALL aplicar migrations pendentes automaticamente ao iniciar a aplicação.

#### Scenario: Primeira migration criada

- **WHEN** a solução é compilada
- **WHEN** o comando `dotnet ef migrations add InitialCreate` é executado
- **THEN** uma migration é criada em `Infrastructure/Migrations/`

#### Scenario: Migration aplicada no startup

- **WHEN** a API inicia
- **THEN** todas as migrations pendentes são aplicadas automaticamente ao banco de dados

#### Scenario: Tabelas criadas no banco

- **WHEN** a primeira migration é aplicada
- **THEN** o esquema do banco é criado (tabelas do sistema, constraints, índices)

### Requirement: Packages NuGet instalados

Packages necessários para EF Core e PostgreSQL SHALL estar instalados no projeto Infrastructure.

#### Scenario: Microsoft.EntityFrameworkCore instalado

- **WHEN** o projeto Infrastructure é compilado
- **THEN** package Microsoft.EntityFrameworkCore está referenciado

#### Scenario: Npgsql provider instalado

- **WHEN** o projeto Infrastructure é compilado
- **THEN** package Npgsql.EntityFrameworkCore.PostgreSQL está referenciado

#### Scenario: Compilação sem erros

- **WHEN** `dotnet build` é executado
- **THEN** todos os projetos compilam sem erros de pacotes faltantes
