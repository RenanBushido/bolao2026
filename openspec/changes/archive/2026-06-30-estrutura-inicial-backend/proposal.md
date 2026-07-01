## Why

O projeto Bolão 2026 necessita de uma estrutura de backend robusta e bem organizada para suportar funcionalidades de autenticação, gerenciamento de palpites e participação em bolões. Estabelecer essa estrutura inicialmente garante uma base sólida seguindo Clean Architecture e princípios SOLID, facilitando a adição de funcionalidades futuras.

## What Changes

- Criação da solução .NET 10 com extensão `.slnx`
- Estabelecimento da arquitetura em camadas (Clean Architecture)
- Configuração inicial do Docker e banco de dados PostgreSQL
- Definição dos projetos base: Core, Application, Infrastructure e API
- Setup de injeção de dependência nativa do ASP.NET
- Estrutura de testes unitários com xUnit

## Capabilities

### New Capabilities
- `backend-solution-setup`: Configuração da solução .NET 10 com a estrutura de projetos base
- `database-infrastructure`: Configuração do PostgreSQL em Docker e Entity Framework Core
- `api-foundation`: Estrutura base para endpoints REST com versionamento
- `dependency-injection`: Sistema de injeção de dependência nativo do ASP.NET configurado
- `transaction-persistence`: Capacidade de armazenar transações de compra no banco de dados
- `testing-framework`: Framework de testes unitários com xUnit e fixtures

### Modified Capabilities
<!-- Nenhuma capacidade existente será modificada nesta fase inicial -->

## Impact

- **Código**: Criação da estrutura `src/backend/` com projetos organizados em camadas
- **Banco de Dados**: Setup do PostgreSQL com volume persistente em `database/`
- **Testes**: Framework de testes em `tests/` para o backend
- **Docker**: Configuração de `docker-compose.yml` para orquestração de serviços
- **Dependências**: .NET 10, EF Core, Polly, Refit, xUnit
